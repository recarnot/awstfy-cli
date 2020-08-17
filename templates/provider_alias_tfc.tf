variable "{{id}}_{{access_key_var}}" {
  description = "Access Key ID of Terraform User"
  type        = string
}

variable "{{id}}_{{secret_key_var}}" {
  description = "Secret Access Key of Terraform User"
  type        = string
}

variable "{{id}}_{{region_var}}" {
  description = "AWS targeted region"
  type        = string
}

provider "aws" {
  alias      = "{{id}}"
  access_key = var.{{id}}_{{access_key_var}}
  secret_key = var.{{id}}_{{secret_key_var}}
  region     = var.{{id}}_{{region_var}}
}
