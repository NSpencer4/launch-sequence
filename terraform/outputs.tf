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
