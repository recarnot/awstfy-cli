**awstfy** is command line tool for **AWS Terraform** project management.



## Installation

```
npm install @recarnot/awstfy-cli
```



## Usage

```bash
Usage: awstfy <command> <subcommand>

  Top level commands:  
  configure             Configures project.
  profile               Manages AWS Profiles.
  provider              Configures default Terraform provider for this project.
  backend               Configures Terraform backend for this projet.
  clone                 Clones GIT repository in current directory.
  console               Opens AWS Management Console.
  pipeline              Creates default CI pipeline for GitHub or GitLab platform.
  version               Shows current version.
  help                  Displays help.
                       
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

