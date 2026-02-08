# Bootstrap (one-time, run before `terraform init`):
#
#   aws s3api create-bucket \
#     --bucket launch-sequence-terraform-state \
#     --region us-east-1
#
#   aws s3api put-bucket-versioning \
#     --bucket launch-sequence-terraform-state \
#     --versioning-configuration Status=Enabled
#
#   aws s3api put-public-access-block \
#     --bucket launch-sequence-terraform-state \
#     --public-access-block-configuration \
#       BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
#
#   aws dynamodb create-table \
#     --table-name launch-sequence-terraform-locks \
#     --attribute-definitions AttributeName=LockID,AttributeType=S \
#     --key-schema AttributeName=LockID,KeyType=HASH \
#     --billing-mode PAY_PER_REQUEST \
#     --region us-east-1

# TODO: Uncomment when we want to use S3 for state management and DynamoDB for state locking.
# terraform {
#   backend "s3" {
#     bucket         = "launch-sequence-terraform-state"
#     key            = "launch-sequence/terraform.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "launch-sequence-terraform-locks"
#     encrypt        = true
#   }
# }

provider "aws" {
  alias = "us_east_1"
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
