# ---------------------------------------------------------------------------
# VPC — 2-AZ network with public + private subnets
# ---------------------------------------------------------------------------

data "aws_availability_zones" "available" {
  provider = aws.us_east_1

  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

locals {
  azs               = slice(sort(data.aws_availability_zones.available.names), 0, var.az_count)
  nat_gateway_count = var.nat_per_az ? var.az_count : 1
}

resource "aws_vpc" "main" {
  provider = aws.us_east_1

  cidr_block                       = var.vpc_cidr
  assign_generated_ipv6_cidr_block = true
  enable_dns_support               = true
  enable_dns_hostnames             = true

  tags = {
    Name = "${var.project_name}-${var.environment}-vpc"
  }
}

# ---------------------------------------------------------------------------
# Internet Gateway
# ---------------------------------------------------------------------------

resource "aws_internet_gateway" "main" {
  provider = aws.us_east_1
  vpc_id   = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-${var.environment}-igw"
  }
}

# IPv6 Egress-Only Internet Gateway (for private subnets)
resource "aws_egress_only_internet_gateway" "main" {
  provider = aws.us_east_1
  vpc_id   = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-${var.environment}-eogw"
  }
}

# ---------------------------------------------------------------------------
# Public Subnets (one per AZ)
# ---------------------------------------------------------------------------

resource "aws_subnet" "public" {
  provider = aws.us_east_1
  count    = var.az_count

  vpc_id                          = aws_vpc.main.id
  cidr_block                      = cidrsubnet(var.vpc_cidr, 8, count.index + 1) # 10.0.1.0/24, 10.0.2.0/24
  ipv6_cidr_block                 = cidrsubnet(aws_vpc.main.ipv6_cidr_block, 8, count.index + 1)
  availability_zone               = local.azs[count.index]
  map_public_ip_on_launch         = true
  assign_ipv6_address_on_creation = true

  tags = {
    Name = "${var.project_name}-${var.environment}-public-${count.index + 1}"
  }
}

# ---------------------------------------------------------------------------
# Private Subnets (one per AZ — future backend services)
# ---------------------------------------------------------------------------

resource "aws_subnet" "private" {
  provider = aws.us_east_1
  count    = var.az_count

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 10) # 10.0.10.0/24, 10.0.11.0/24
  ipv6_cidr_block   = cidrsubnet(aws_vpc.main.ipv6_cidr_block, 8, count.index + 10)
  availability_zone = local.azs[count.index]

  tags = {
    Name = "${var.project_name}-${var.environment}-private-${count.index + 1}"
  }
}

# ---------------------------------------------------------------------------
# NAT Gateway (single — cost-conscious; upgrade to one-per-AZ for prod HA)
# ---------------------------------------------------------------------------

resource "aws_eip" "nat" {
  provider = aws.us_east_1
  count    = local.nat_gateway_count
  domain   = "vpc"

  tags = {
    Name = "${var.project_name}-${var.environment}-nat-eip-${count.index + 1}"
  }
}

resource "aws_nat_gateway" "main" {
  provider      = aws.us_east_1
  count         = local.nat_gateway_count
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = var.nat_per_az ? aws_subnet.public[count.index].id : aws_subnet.public[0].id

  tags = {
    Name = "${var.project_name}-${var.environment}-nat-${count.index + 1}"
  }

  depends_on = [aws_internet_gateway.main]
}

# ---------------------------------------------------------------------------
# Route Tables
# ---------------------------------------------------------------------------

# Public route table — routes internet traffic through the IGW
resource "aws_route_table" "public" {
  provider = aws.us_east_1
  vpc_id   = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  provider = aws.us_east_1
  count    = var.az_count

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Private route table — routes internet traffic through the NAT Gateway
resource "aws_route_table" "private" {
  provider = aws.us_east_1
  count    = var.nat_per_az ? var.az_count : 1
  vpc_id   = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[var.nat_per_az ? count.index : 0].id
  }
  route {
    ipv6_cidr_block        = "::/0"
    egress_only_gateway_id = aws_egress_only_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-private-rt-${count.index + 1}"
  }
}

resource "aws_route_table_association" "private" {
  provider = aws.us_east_1
  count    = var.az_count

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[var.nat_per_az ? count.index : 0].id
}
