terraform {
  backend "s3" {
    bucket = "{{backend_bucket}}"
    key    = "{{backend_key}}"
    region = "{{backend_region}}"
  }
}