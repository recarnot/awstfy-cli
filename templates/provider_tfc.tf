variable "{{access_key_var}}" {
  description = "Access Key ID of Terraform User"
  type        = string
}

variable "{{secret_key_var}}" {
  description = "Secret Access Key of Terraform User"
  type        = string
}

variable "{{region_var}}" {
  description = "AWS targeted region"
  type        = string
}

provider "aws" {
  access_key = var.{{access_key_var}}
  secret_key = var.{{secret_key_var}}
  region     = var.{{region_var}}
}