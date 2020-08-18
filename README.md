**awstfy** is command line tool for **AWS Terraform** project management.



## Installation

```
npm install @recarnot/awstfy-cli
```

## Demo

|                        Configuration                         |                         AWS Profiles                         |                         Environments                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [![asciicast](https://asciinema.org/a/PFL9Qp0c2lH7BApzw6YZ6f67h.svg)](https://asciinema.org/a/PFL9Qp0c2lH7BApzw6YZ6f67h) | [![asciicast](https://asciinema.org/a/BpqLgzswgv3Y0wgYwxjJlZBHt.svg)](https://asciinema.org/a/BpqLgzswgv3Y0wgYwxjJlZBHt) | [![asciicast](https://asciinema.org/a/1l3V0rln48K0nerLJyGBvBbVm.svg)](https://asciinema.org/a/1l3V0rln48K0nerLJyGBvBbVm) |

|                          Variables                           |                       Terraform Cloud                        |                          Resources                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [![asciicast](https://asciinema.org/a/gFfwOqHwb8NSOqThWznA9BBTT.svg)](https://asciinema.org/a/gFfwOqHwb8NSOqThWznA9BBTT) | [![asciicast](https://asciinema.org/a/wsSSxz5lV5NN1zjg7p5a5nzKH.svg)](https://asciinema.org/a/wsSSxz5lV5NN1zjg7p5a5nzKH) | [![asciicast](https://asciinema.org/a/JSVQgNAGZpMC8YNOEYGR4XMkr.svg)](https://asciinema.org/a/JSVQgNAGZpMC8YNOEYGR4XMkr) |

|                          Terraform                           | Reset | Clone |
| :----------------------------------------------------------: | :---: | :---: |
| [![asciicast](https://asciinema.org/a/pahLoggmpTs8MfylQYH1jIK4P.svg)](https://asciinema.org/a/pahLoggmpTs8MfylQYH1jIK4P) |       |       |



## Usage

```bash
Usage: awstfy <command> <subcommand>

  Top level commands:  
  configure             Configures project.
  provider              Configures default Terraform provider for this project.
  backend               Configures Terraform backend for this projet.
  clone                 Clones GIT repository in current directory.
  console               Opens AWS Management Console.
  pipeline              Creates default CI pipeline for GitHub or GitLab platform.
  version               Shows current version.
  reset                 Removes all configurations from this project.
  help                  Displays help.
  init                  Terraform init.
  plan                  Terraform plan.
  apply                 Terraform apply.
  destroy               Terraform destroy.
                       
  profile <command>: Manages AWS profiles
  profile configure     Creates or updates AWS profile.
  profile list          Lists AWS profiles.
                       
  env <command>: Manages Terraform workspaces (environments)
  env select            Seclect a Terraform workspace.
  env list              Retreives Terraform workspaces.
  env show              Retreives current Terraform workspace.
  env new               Creates a new Terraform workspace.
                       
  var <command>: Manages environment variables
  var add               Creates a new variable.
  var list              Lists variables.
  var update            Updates variable.
  var delete            Deletes variable.
                       
  cloud <command>: Manages Terraform Cloud
  cloud init            Configures Terrafom Cloud access and pulls organizations.
                       
  add <resource>: Add Terraform resources
  add vpc               Manages VPC.
  add storage           Manages Storage.
  add SNS Topic         Manages SNS Topic.
  add dns               Manages Hosted zone.
  add state             Manages Remote state connection.
  add provider          Manages Provider alias.
```

