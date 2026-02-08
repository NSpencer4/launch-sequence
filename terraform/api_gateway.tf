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

  # When routes are added, force redeployment by hashing their IDs:
  #
  # triggers = {
  #   redeployment = sha1(jsonencode([
  #     aws_api_gateway_resource.graphql.id,
  #     aws_api_gateway_method.graphql_post.id,
  #     aws_api_gateway_integration.graphql_post.id,
  #   ]))
  # }
  #
  # depends_on = [
  #   aws_api_gateway_method.graphql_post,
  #   aws_api_gateway_integration.graphql_post,
  # ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "main" {
  provider = aws.us_east_1

  deployment_id = aws_api_gateway_deployment.main.id
  rest_api_id   = aws_api_gateway_rest_api.main.id
  stage_name    = var.environment

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
# VPC Link — deferred until backend services with an NLB are deployed
# ---------------------------------------------------------------------------

# REST API VPC Links require a Network Load Balancer target.
# Uncomment and configure when backend services are added:
#
# resource "aws_api_gateway_vpc_link" "main" {
#   provider    = aws.us_east_1
#   name        = "${var.project_name}-${var.environment}-vpc-link"
#   target_arns = [aws_lb.backend.arn]
#
#   tags = {
#     Name = "${var.project_name}-${var.environment}-vpc-link"
#   }
# }

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

  # AWS Managed Rules — Common Rule Set
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 10

    override_action {
      none {}
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

  # AWS Managed Rules — Known Bad Inputs
  rule {
    name     = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 20

    override_action {
      none {}
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

  # AWS Managed Rules — Amazon IP Reputation List
  rule {
    name     = "AWSManagedRulesAmazonIpReputationList"
    priority = 30

    override_action {
      none {}
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

  # AWS Managed Rules — Anonymous IP List
  rule {
    name     = "AWSManagedRulesAnonymousIpList"
    priority = 35

    override_action {
      none {}
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

  # Rate limiting — 10,000 requests per 5-minute window
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
