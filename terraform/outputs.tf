output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidation"
  value       = aws_cloudfront_distribution.spa.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.spa.domain_name
}

output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.spa.domain_name}"
}

output "s3_bucket_name" {
  description = "S3 bucket name for deployment sync"
  value       = aws_s3_bucket.spa.id
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.spa.arn
}

output "nameservers" {
  description = "Nameservers to configure at your domain registrar"
  value       = aws_route53_zone.main.name_servers
}

output "domain_url" {
  description = "Primary URL for the SPA"
  value       = "https://${var.domain_name}"
}

output "waf_web_acl_arn" {
  description = "WAF WebACL ARN attached to CloudFront"
  value       = aws_wafv2_web_acl.cloudfront.arn
}

# VPC outputs

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

# API Gateway outputs

output "api_gateway_url" {
  description = "API Gateway invoke URL"
  value       = aws_api_gateway_stage.main.invoke_url
}

output "api_gateway_id" {
  description = "API Gateway REST API ID"
  value       = aws_api_gateway_rest_api.main.id
}

output "waf_api_web_acl_arn" {
  description = "WAF WebACL ARN attached to API Gateway"
  value       = aws_wafv2_web_acl.api.arn
}

# Lambda outputs

output "lambda_function_name" {
  description = "GraphQL Lambda function name"
  value       = aws_lambda_function.graphql.function_name
}

output "lambda_function_arn" {
  description = "GraphQL Lambda function ARN"
  value       = aws_lambda_function.graphql.arn
}

output "authorizer_lambda_function_name" {
  description = "Authorizer Lambda function name"
  value       = aws_lambda_function.authorizer.function_name
}

output "lambda_code_s3_bucket" {
  description = "S3 bucket name for Lambda deployment packages"
  value       = aws_s3_bucket.lambda_code.id
}

output "api_custom_domain_url" {
  description = "Custom domain URL for the API"
  value       = "https://api.${var.domain_name}"
}
