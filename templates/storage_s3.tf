module "storage_{{id}}" {
  source = "recarnot/open-bucket/aws"

  prefix     = "{{prefix}}"
  acl        = "{{acl}}"
  
  versioning = {{versioning}}
  logs       = {{logs}}
  encryption = {{encryption}}

  transition_30_days = {{transition_30}}
  transition_60_days = {{transition_60}}
  transition_90_days = {{expiration}}

  label_formatter = local.label_formatter
  tags            = local.tags
}
