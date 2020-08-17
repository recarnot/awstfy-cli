data "aws_region" "current" {}

variable "context" {
  description = "Project context"
  type        = string
  default     = "{{context}}"
}

variable "environement" {
  description = "Environement"
  type        = string
  default     = "{{environement}}"
}

locals {
  regex_chars     = "/[^a-zA-Z0-9-]/"
  delimiter       = "-"
  context         = lower(replace(var.context, local.regex_chars, ""))
  stage           = lower(replace(var.stage, local.regex_chars, ""))
  prefix          = join(local.delimiter, [local.context, local.stage])
  label_formatter = format("%s%%s", format("%s%s", join(local.delimiter, [local.context, local.stage]), local.delimiter))
  region_location = lower(split(" ", data.aws_region.current.description)[0])
  region_name     = lower(replace(split(" ", data.aws_region.current.description)[1], local.regex_chars, ""))

  tags = {
    context : local.context
    location : local.region_location
    management : "managed-by-terraform"
    region : local.region_name
    stage : local.stage
  }
}

