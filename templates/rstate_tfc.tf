data "terraform_remote_state" "{{name}}" {
  backend = "remote"
  config = {
    organization = "{{organization}}"
    workspaces = {
      name = "{{workspace}}"
    }
  }
}