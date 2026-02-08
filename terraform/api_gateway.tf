# ---------------------------------------------------------------------------
# API Gateway (REST API v1) — shell for future backend services
# ---------------------------------------------------------------------------

resource "aws_api_gateway_rest_api" "main" {
  provider = aws.us_east_1
  name     = "${var.project_name}-${var.environment}-api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# ---------------------------------------------------------------------------
# Account-level CloudWatch role for API Gateway logging
# ---------------------------------------------------------------------------

resource "aws_iam_role" "apigw_cloudwatch" {
  provider = aws.us_east_1
  name     = "${var.project_name}-${var.environment}-apigw-cloudwatch"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "apigateway.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name = "${var.project_name}-${var.environment}-apigw-cloudwatch"
  }
}

resource "aws_iam_role_policy_attachment" "apigw_cloudwatch" {
  provider   = aws.us_east_1
  role       = aws_iam_role.apigw_cloudwatch.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_api_gateway_account" "main" {
  provider            = aws.us_east_1
  cloudwatch_role_arn = aws_iam_role.apigw_cloudwatch.arn

  depends_on = [aws_iam_role_policy_attachment.apigw_cloudwatch]
}

# ---------------------------------------------------------------------------
# Deployment + Stage
# ---------------------------------------------------------------------------

resource "aws_api_gateway_deployment" "main" {
  provider    = aws.us_east_1
  rest_api_id = aws_api_gateway_rest_api.main.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.graphql.id,
      aws_api_gateway_method.graphql_post.id,
      aws_api_gateway_integration.graphql_post.id,
      aws_api_gateway_method.graphql_options.id,
      aws_api_gateway_integration.graphql_options.id,
    ]))
  }

  depends_on = [
    aws_api_gateway_method.graphql_post,
    aws_api_gateway_integration.graphql_post,
    aws_api_gateway_method.graphql_options,
    aws_api_gateway_integration.graphql_options,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "main" {
  provider = aws.us_east_1

  deployment_id = aws_api_gateway_deployment.main.id
  rest_api_id   = aws_api_gateway_rest_api.main.id
  stage_name    = var.environment

  depends_on = [aws_api_gateway_account.main]

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format = jsonencode({
      requestId      = "$context.requestId"
      ip             = "$context.identity.sourceIp"
      caller         = "$context.identity.caller"
      user           = "$context.identity.user"
      requestTime    = "$context.requestTime"
      httpMethod     = "$context.httpMethod"
      resourcePath   = "$context.resourcePath"
      status         = "$context.status"
      protocol       = "$context.protocol"
      responseLength = "$context.responseLength"
    })
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-api-stage"
  }
}

resource "aws_api_gateway_method_settings" "main" {
  provider = aws.us_east_1

  rest_api_id = aws_api_gateway_rest_api.main.id
  stage_name  = aws_api_gateway_stage.main.stage_name
  method_path = "*/*"

  settings {
    logging_level      = "INFO"
    data_trace_enabled = false
    metrics_enabled    = true
  }
}

# ---------------------------------------------------------------------------
# CloudWatch Log Group for API Gateway access logs
# ---------------------------------------------------------------------------

resource "aws_cloudwatch_log_group" "api_gateway" {
  provider = aws.us_east_1

  name              = "/aws/apigateway/${var.project_name}-${var.environment}-api"
  retention_in_days = 14

  tags = {
    Name = "${var.project_name}-${var.environment}-api-logs"
  }
}

# ---------------------------------------------------------------------------
# /graphql Resource + Lambda Authorizer
# ---------------------------------------------------------------------------

resource "aws_api_gateway_resource" "graphql" {
  provider = aws.us_east_1

  rest_api_id = aws_api_gateway_rest_api.main.id
  parent_id   = aws_api_gateway_rest_api.main.root_resource_id
  path_part   = "graphql"
}

resource "aws_api_gateway_authorizer" "lambda" {
  provider = aws.us_east_1

  rest_api_id                      = aws_api_gateway_rest_api.main.id
  name                             = "${var.project_name}-${var.environment}-authorizer"
  type                             = "TOKEN"
  authorizer_uri                   = aws_lambda_function.authorizer.invoke_arn
  authorizer_result_ttl_in_seconds = 300
}

resource "aws_lambda_permission" "authorizer_apigw" {
  provider = aws.us_east_1

  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.authorizer.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.main.execution_arn}/authorizers/${aws_api_gateway_authorizer.lambda.id}"
}

# POST /graphql — Lambda proxy with custom authorizer
resource "aws_api_gateway_method" "graphql_post" {
  provider = aws.us_east_1

  rest_api_id   = aws_api_gateway_rest_api.main.id
  resource_id   = aws_api_gateway_resource.graphql.id
  http_method   = "POST"
  authorization = "CUSTOM"
  authorizer_id = aws_api_gateway_authorizer.lambda.id
}

resource "aws_api_gateway_integration" "graphql_post" {
  provider = aws.us_east_1

  rest_api_id             = aws_api_gateway_rest_api.main.id
  resource_id             = aws_api_gateway_resource.graphql.id
  http_method             = aws_api_gateway_method.graphql_post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri = aws_lambda_alias.graphql_live.invoke_arn
}

# ---------------------------------------------------------------------------
# CORS — OPTIONS preflight for /graphql
# ---------------------------------------------------------------------------

resource "aws_api_gateway_method" "graphql_options" {
  provider = aws.us_east_1

  rest_api_id   = aws_api_gateway_rest_api.main.id
  resource_id   = aws_api_gateway_resource.graphql.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "graphql_options" {
  provider = aws.us_east_1

  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql_options.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "graphql_options" {
  provider = aws.us_east_1

  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "graphql_options" {
  provider = aws.us_east_1

  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql_options.http_method
  status_code = aws_api_gateway_method_response.graphql_options.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,Authorization'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "method.response.header.Access-Control-Allow-Origin"  = "'${var.cors_allowed_origin}'"
  }
}

# CORS headers on gateway error responses (4XX / 5XX)
resource "aws_api_gateway_gateway_response" "default_4xx" {
  provider = aws.us_east_1

  rest_api_id   = aws_api_gateway_rest_api.main.id
  response_type = "DEFAULT_4XX"

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Headers" = "'Content-Type,Authorization'"
    "gatewayresponse.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "gatewayresponse.header.Access-Control-Allow-Origin"  = "'${var.cors_allowed_origin}'"
  }
}

resource "aws_api_gateway_gateway_response" "default_5xx" {
  provider = aws.us_east_1

  rest_api_id   = aws_api_gateway_rest_api.main.id
  response_type = "DEFAULT_5XX"

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Headers" = "'Content-Type,Authorization'"
    "gatewayresponse.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "gatewayresponse.header.Access-Control-Allow-Origin"  = "'${var.cors_allowed_origin}'"
  }
}

# ---------------------------------------------------------------------------
# Custom Domain — api.<domain_name>
# ---------------------------------------------------------------------------

resource "aws_api_gateway_domain_name" "api" {
  provider = aws.us_east_1

  domain_name              = "api.${var.domain_name}"
  regional_certificate_arn = aws_acm_certificate_validation.api.certificate_arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "api.${var.domain_name}"
  }
}

resource "aws_api_gateway_base_path_mapping" "api" {
  provider = aws.us_east_1

  api_id      = aws_api_gateway_rest_api.main.id
  stage_name  = aws_api_gateway_stage.main.stage_name
  domain_name = aws_api_gateway_domain_name.api.domain_name
}

# ---------------------------------------------------------------------------
# Regional WAF for API Gateway
# ---------------------------------------------------------------------------

resource "aws_wafv2_web_acl" "api" {
  provider = aws.us_east_1
  name     = "${var.project_name}-${var.environment}-api"
  scope    = "REGIONAL"

  default_action {
    allow {}
  }

  # AWS Managed Rules — Common Rule Set (COUNT mode: observe before enforcing)
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 10

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "ApiAWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  # AWS Managed Rules — Known Bad Inputs (COUNT mode: observe before enforcing)
  rule {
    name     = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 20

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "ApiAWSManagedRulesKnownBadInputsRuleSet"
      sampled_requests_enabled   = true
    }
  }

  # AWS Managed Rules — Amazon IP Reputation List (COUNT mode: observe before enforcing)
  rule {
    name     = "AWSManagedRulesAmazonIpReputationList"
    priority = 30

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "ApiAWSManagedRulesAmazonIpReputationList"
      sampled_requests_enabled   = true
    }
  }

  # AWS Managed Rules — Anonymous IP List (COUNT mode: observe before enforcing)
  rule {
    name     = "AWSManagedRulesAnonymousIpList"
    priority = 35

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAnonymousIpList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "ApiAWSManagedRulesAnonymousIpList"
      sampled_requests_enabled   = true
    }
  }

  # Rate limiting — 10,000 requests per 5-minute window, scoped to /graphql
  rule {
    name     = "RateLimitRule"
    priority = 50

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 10000
        aggregate_key_type = "IP"

        scope_down_statement {
          byte_match_statement {
            search_string         = "/graphql"
            positional_constraint = "STARTS_WITH"
            field_to_match {
              uri_path {}
            }
            text_transformation {
              priority = 0
              type     = "LOWERCASE"
            }
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "ApiRateLimitRule"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.project_name}-${var.environment}-api"
    sampled_requests_enabled   = true
  }
}

resource "aws_wafv2_web_acl_association" "api" {
  provider = aws.us_east_1

  resource_arn = aws_api_gateway_stage.main.arn
  web_acl_arn  = aws_wafv2_web_acl.api.arn
}
