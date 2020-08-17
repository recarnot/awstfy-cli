locals {
  vpc_id = "{{vpc_id}}"
  vpc_region = "{{vpc_region}}"
}

resource "aws_route53_zone" "{{id}}" {
  name          = "{{name}}"
  comment       = "{{comment}}"
  force_destroy = {{force_destroy}}

  dynamic "vpc" {
    for_each = local.vpc_id == "" ? [] : [1]
    content {
      vpc_id = local.vpc_id
      vpc_region = local.vpc_region
    }
  }

  tags = merge(
    local.tags,
    {
      Name : format(local.label_formatter, "zone")
    }
  )
}
