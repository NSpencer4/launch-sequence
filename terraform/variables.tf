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
