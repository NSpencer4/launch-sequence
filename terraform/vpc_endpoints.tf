# ---------------------------------------------------------------------------
# VPC Endpoints — reduce NAT usage and improve reliability for private Lambdas
# ---------------------------------------------------------------------------

locals {
  interface_vpc_endpoints = toset([
    "logs",
    "xray",
    "secretsmanager",
    "ssm",
    "sts",
  ])
}

resource "aws_security_group" "vpc_endpoints" {
  provider = aws.us_east_1

  name        = "${var.project_name}-${var.environment}-vpc-endpoints"
  description = "Allow VPC endpoint traffic from private Lambdas"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTPS from GraphQL Lambda"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    security_groups = [aws_security_group.graphql_lambda.id]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-vpc-endpoints"
  }
}

resource "aws_vpc_endpoint" "interface" {
  provider = aws.us_east_1
  for_each = local.interface_vpc_endpoints

  vpc_id              = aws_vpc.main.id
  vpc_endpoint_type   = "Interface"
  service_name        = "com.amazonaws.${var.aws_region}.${each.value}"
  subnet_ids          = aws_subnet.private[*].id
  security_group_ids = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true

  tags = {
    Name = "${var.project_name}-${var.environment}-${each.value}-vpce"
  }
}

resource "aws_vpc_endpoint" "s3" {
  provider = aws.us_east_1

  vpc_id            = aws_vpc.main.id
  vpc_endpoint_type = "Gateway"
  service_name      = "com.amazonaws.${var.aws_region}.s3"
  route_table_ids   = aws_route_table.private[*].id

  tags = {
    Name = "${var.project_name}-${var.environment}-s3-vpce"
  }
}
