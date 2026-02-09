# ---------------------------------------------------------------------------
# GraphQL Lambda — VPC-attached, behind API Gateway /graphql
# ---------------------------------------------------------------------------

resource "aws_iam_role" "graphql_lambda" {
  provider = aws.us_east_1
  name     = "${var.project_name}-${var.environment}-graphql-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = { Service = "lambda.amazonaws.com" }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-${var.environment}-graphql-lambda"
  }
}

resource "aws_iam_role_policy_attachment" "graphql_lambda_basic" {
  provider   = aws.us_east_1
  role       = aws_iam_role.graphql_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "graphql_lambda_vpc" {
  provider   = aws.us_east_1
  role       = aws_iam_role.graphql_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_security_group" "graphql_lambda" {
  provider = aws.us_east_1

  name        = "${var.project_name}-${var.environment}-graphql-lambda"
  description = "Security group for GraphQL Lambda function"
  vpc_id      = aws_vpc.main.id

  dynamic "egress" {
    for_each = var.restrict_lambda_egress ? [] : [1]
    content {
      description = "All outbound traffic"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-graphql-lambda"
  }
}

resource "aws_security_group_rule" "graphql_lambda_to_vpc_endpoints_https" {
  provider = aws.us_east_1
  count    = var.restrict_lambda_egress ? 1 : 0

  type                     = "egress"
  security_group_id        = aws_security_group.graphql_lambda.id
  from_port                = 443
  to_port                  = 443
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.vpc_endpoints.id
  description              = "HTTPS to VPC interface endpoints"
}

resource "aws_security_group_rule" "graphql_lambda_to_internal_alb_https" {
  provider = aws.us_east_1
  count    = var.restrict_lambda_egress && var.internal_alb_sg_id != null ? 1 : 0

  type                     = "egress"
  security_group_id        = aws_security_group.graphql_lambda.id
  from_port                = 443
  to_port                  = 443
  protocol                 = "tcp"
  source_security_group_id = var.internal_alb_sg_id
  description              = "HTTPS to internal ALB"
}

resource "aws_lambda_function" "graphql" {
  provider = aws.us_east_1

  function_name = "${var.project_name}-${var.environment}-graphql"
  role          = aws_iam_role.graphql_lambda.arn
  runtime       = "nodejs22.x"
  handler       = "index.handler"
  timeout       = 30
  memory_size   = 256
  publish = true

  filename = "${path.module}/../packages/lambdas/graphql/dist/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../packages/lambdas/graphql/dist/lambda.zip")

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.graphql_lambda.id]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-graphql"
  }
}

resource "aws_lambda_alias" "graphql_live" {
  provider = aws.us_east_1

  name             = "live"
  description      = "Stable alias for GraphQL Lambda"
  function_name    = aws_lambda_function.graphql.function_name
  function_version = aws_lambda_function.graphql.version
}

resource "aws_cloudwatch_log_group" "graphql_lambda" {
  provider = aws.us_east_1

  name              = "/aws/lambda/${aws_lambda_function.graphql.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${var.project_name}-${var.environment}-graphql-lambda-logs"
  }
}

resource "aws_lambda_permission" "graphql_apigw" {
  provider = aws.us_east_1

  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_alias.graphql_live.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.main.execution_arn}/${aws_api_gateway_stage.main.stage_name}/${aws_api_gateway_method.graphql_post.http_method}${aws_api_gateway_resource.graphql.path}"
}

# ---------------------------------------------------------------------------
# Authorizer Lambda — outside VPC for fast cold starts (JWT validation only)
# ---------------------------------------------------------------------------

resource "aws_iam_role" "authorizer_lambda" {
  provider = aws.us_east_1
  name     = "${var.project_name}-${var.environment}-authorizer-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = { Service = "lambda.amazonaws.com" }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-${var.environment}-authorizer-lambda"
  }
}

resource "aws_iam_role_policy_attachment" "authorizer_lambda_basic" {
  provider   = aws.us_east_1
  role       = aws_iam_role.authorizer_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "authorizer" {
  provider = aws.us_east_1

  function_name = "${var.project_name}-${var.environment}-authorizer"
  role          = aws_iam_role.authorizer_lambda.arn
  runtime       = "nodejs22.x"
  handler       = "index.handler"
  timeout       = 10
  memory_size   = 128

  filename = "${path.module}/../packages/lambdas/authorizer/dist/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../packages/lambdas/authorizer/dist/lambda.zip")

  tags = {
    Name = "${var.project_name}-${var.environment}-authorizer"
  }
}

resource "aws_cloudwatch_log_group" "authorizer_lambda" {
  provider = aws.us_east_1

  name              = "/aws/lambda/${aws_lambda_function.authorizer.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${var.project_name}-${var.environment}-authorizer-lambda-logs"
  }
}
