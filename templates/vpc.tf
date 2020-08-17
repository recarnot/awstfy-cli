module "vpc_{{id}}" {
  source = "recarnot/open-vpc/aws"
  
  cidr_block              = "{{cidr_block}}"
  max_availability_zones  = {{az_count}}
  map_public_ip_on_launch = {{map_ip}}
  enable_dns_support      = {{dns_support}}
  enable_dns_hostnames    = {{dns_hostnames}}
  nat_gateway_enabled     = {{nat_enabled}}
  nat_gateway_ha          = {{nat_ha}}
  tags                    = local.tags
  label_formatter         = local.label_formatter
}