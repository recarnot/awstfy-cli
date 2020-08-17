data "terraform_remote_state" "{{name}}" {
  backend = "s3"
  config = {
    bucket = "{{bucket}}"
    key    = "{{key}}"
    region = "{{region}}"
  }
}