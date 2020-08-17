
variable "{{name}}" {
  description = "{{description}}"
  type        = {{type}}
  
  validation {
    condition     = "{{condition}}"
    error_message = "{{error_message}}"
  }
}