# ---------------------------------------------------------------------------
# S3 Bucket — Lambda deployment packages
# ---------------------------------------------------------------------------

resource "aws_s3_bucket" "lambda_code" {
  provider = aws.us_east_1
  bucket   = "${var.project_name}-${var.environment}-lambda-code"

  tags = {
    Name = "${var.project_name}-${var.environment}-lambda-code"
  }
}

resource "aws_s3_bucket_versioning" "lambda_code" {
  provider = aws.us_east_1
  bucket   = aws_s3_bucket.lambda_code.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "lambda_code" {
  provider = aws.us_east_1
  bucket   = aws_s3_bucket.lambda_code.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

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

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-graphql-lambda"
  }
}

resource "aws_lambda_function" "graphql" {
  provider = aws.us_east_1

  function_name = "${var.project_name}-${var.environment}-graphql"
  role          = aws_iam_role.graphql_lambda.arn
  runtime       = "nodejs22.x"
  handler       = "index.handler"
  timeout       = 30
  memory_size   = 256

  s3_bucket = aws_s3_bucket.lambda_code.id
  s3_key    = var.graphql_lambda_s3_key

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.graphql_lambda.id]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-graphql"
  }
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
  function_name = aws_lambda_function.graphql.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.main.execution_arn}/*/*"
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

  s3_bucket = aws_s3_bucket.lambda_code.id
  s3_key    = var.authorizer_lambda_s3_key

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
