**awstfy** is command line tool for **AWS Terraform** project management.



## Installation

```
npm install @recarnot/awstfy-cli
```



## Usage

```bash
Usage: awstfy <command> <flag>

  version                Shows current version.
  help                   Shows CLI help.
  context                Configures project context : name, region and Terraform version to use.
  provider               Configures default Terraform provider for this project.
  backend                Configures Terraform backend for this projet.
  pipeline               Creates default CI pipeline for GitHub or GitLab platform.
                        
  add        -vpc        Creates new VPC resource.
  add        -storage    Creates new Storage resource.
  add        -sns        Creates new SNS Topic resource.
  add        -dns_zone   Creates new Route 53 Zone.
  add        -rstate     Creates new Remote State data.
                        
  init                   Terraform init command.
  plan                   Terraform plan command.
  apply                  Terraform apply command.
  destroy                Terraform destroy command.
  show                   Terraform show command.
  state                  Terraform state command.
```

