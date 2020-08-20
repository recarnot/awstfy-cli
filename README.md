**awstfy** is command line helper for **AWS Terraform** project management.



## Installation

```bash
npm i -g @recarnot/awstfy-cli
```



## Demo

|                        Configuration                         |                         AWS Profiles                         |                         Environments                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [![asciicast](https://asciinema.org/a/PFL9Qp0c2lH7BApzw6YZ6f67h.svg)](https://asciinema.org/a/PFL9Qp0c2lH7BApzw6YZ6f67h) | [![asciicast](https://asciinema.org/a/BpqLgzswgv3Y0wgYwxjJlZBHt.svg)](https://asciinema.org/a/BpqLgzswgv3Y0wgYwxjJlZBHt) | [![asciicast](https://asciinema.org/a/1l3V0rln48K0nerLJyGBvBbVm.svg)](https://asciinema.org/a/1l3V0rln48K0nerLJyGBvBbVm) |

|                          Variables                           |                       Terraform Cloud                        |                          Resources                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [![asciicast](https://asciinema.org/a/gFfwOqHwb8NSOqThWznA9BBTT.svg)](https://asciinema.org/a/gFfwOqHwb8NSOqThWznA9BBTT) | [![asciicast](https://asciinema.org/a/wsSSxz5lV5NN1zjg7p5a5nzKH.svg)](https://asciinema.org/a/wsSSxz5lV5NN1zjg7p5a5nzKH) | [![asciicast](https://asciinema.org/a/JSVQgNAGZpMC8YNOEYGR4XMkr.svg)](https://asciinema.org/a/JSVQgNAGZpMC8YNOEYGR4XMkr) |

|                          Terraform                           |                            Clone                             |                       Auto completion                        |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [![asciicast](https://asciinema.org/a/pahLoggmpTs8MfylQYH1jIK4P.svg)](https://asciinema.org/a/pahLoggmpTs8MfylQYH1jIK4P) | [![asciicast](https://asciinema.org/a/exqxxSHqxnlkgHRevNDAyjWV3.svg)](https://asciinema.org/a/exqxxSHqxnlkgHRevNDAyjWV3) | [![asciicast](https://asciinema.org/a/s82jWFDhz1AQhz6Ee0YAbOpGo.svg)](https://asciinema.org/a/s82jWFDhz1AQhz6Ee0YAbOpGo) |



## Silent commands

*!! Work in progress !!*

You can use some commands in silent mode to allow script or automation process. Here is a quick dirty demo :

[![asciicast](https://asciinema.org/a/lSm8He8g7m5Bpz1INJiLnhpf8.svg)](https://asciinema.org/a/lSm8He8g7m5Bpz1INJiLnhpf8) 



## Usage

```
Usage: awstfy <command> <subcommand>

  Top level commands:  
  configure             Configures project.
  provider              Configures default Terraform provider for this project.
  backend               Configures Terraform backend for this projet.
  clone                 Clones GIT repository in current directory.
  console               Opens AWS Management Console.
  version               Shows current version.
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
  add sns		        Manages SNS Topic.
  add dns               Manages Hosted zone.
  add state             Manages Remote state connection.
  add provider          Manages Provider alias.
```



## Auto completion

**awstfy** offer auto completion on **Linux based** systems : 

- bash ✔
- zsh ✔
- fish (not test yet)

```
[testcli]$ awstfy setup-completion                         
✔ awstfy auto completion process ok.                                     
  You can source : /home/recarnot/.awstfy/awstfy-completion.sh             

[testcli]$ source ~/.awstfy/awstfy-completion.sh 
```

[![asciicast](https://asciinema.org/a/s82jWFDhz1AQhz6Ee0YAbOpGo.svg)](https://asciinema.org/a/s82jWFDhz1AQhz6Ee0YAbOpGo)