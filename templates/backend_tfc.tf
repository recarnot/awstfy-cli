terraform {
  backend "remote" {
    hostname = "{{backend_host}}"
    organization = "{{backend_organization}}"
    workspaces {
      name = "{{backend_workspace}}"
    }
  }
}
