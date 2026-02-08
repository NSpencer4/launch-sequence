variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "launch-sequence"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary domain name for the SPA"
  type        = string
  default     = "launchsequence.dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "az_count" {
  description = "Number of AZs to use (must be <= number of available AZs in the region)"
  type        = number
  default     = 2
  validation {
    condition     = var.az_count >= 1
    error_message = "az_count must be at least 1."
  }
}

variable "nat_per_az" {
  description = "Create one NAT Gateway per AZ (requires az_count EIPs). If false, a single NAT is used."
  type        = bool
  default     = false
  validation {
    condition     = !var.nat_per_az || var.az_count >= 2
    error_message = "nat_per_az requires az_count to be at least 2."
  }
}

variable "graphql_lambda_s3_key" {
  description = "S3 key for the GraphQL Lambda deployment package"
  type        = string
  default     = "graphql/lambda.zip"
}

variable "authorizer_lambda_s3_key" {
  description = "S3 key for the Authorizer Lambda deployment package"
  type        = string
  default     = "authorizer/lambda.zip"
}

variable "cors_allowed_origin" {
  description = "Allowed CORS origin for API Gateway responses"
  type        = string
  default     = "https://launchsequence.dev"
}
