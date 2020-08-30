const { Command } = require('commander');
const { callAllHelp, callAddHelp, callEnvHelp, callVarHelp, callCloudHelp, callProfileHelp } = require('./help/action');
const { callProvider } = require('./provider/action');
const { callBackend } = require('./backend/action');
const { callConfigure } = require('./configure/action');
const { getInfo } = require('../tools/helper');
const { callVersion } = require('./version/action');
const { callRState } = require('./add/remotestate/action');
const { callProviderAlias } = require('./add/provider/action');
const { callClone } = require('./clone/action');
const { callConsole } = require('./console/action');
const { callEnvList } = require('./env/list/actions');
const { callEnvShow } = require('./env/show/actions');
const { callEnvNew } = require('./env/new/actions');
const { callEnvSelect } = require('./env/select/actions');
const { callAddVariable } = require('./var/add/actions')
const { callListVariables } = require('./var/list/action')
const { callUpdateVariable } = require('./var/update/actions')
const { callDeleteVariable } = require('./var/delete/actions');
const { callCloudInit } = require('./cloud/init/action');
const { callConfigureProfile } = require('./profile/configure/action');
const { callListProfile } = require('./profile/list/action');
const { callInit, callPlan, callApply, callDestroy } = require('./terraform/action');
const { setupCompletion } = require('./completion/action');
const { commandManager } = require('../managers/command_manager');
const { callModule } = require('./add/module/action');

function initCommands() {

    var program = commandManager.program;

    program
        .version(getInfo().version)
        .description(getInfo().name + ' is a ' + getInfo().description)
        .action(callAllHelp)

    program
        .command('version')
        .description('Shows current version.')
        .action(callVersion);

    program
        .command('help')
        .description('Displays help.')
        .action(callAllHelp);

    program
        .command('configure')
        .description('Configure project.')
        .option('--silent', 'Disabled interactive mode.')
        .option('--context <value>', "Project's name.")
        .option('--environment <value>', "Working environment.")
        .option('--terraform <value>', 'Terraform version.')
        .action(callConfigure)

    program
        .command('provider')
        .description('Configure provider.')
        .option('--silent', 'Disabled interactive mode.')
        .option('--provider-type <local|tfc>', "Chosse provider type between 'local' and 'Terraform Cloud'.")
        .option('--aws-profile <value>', "AWS profile.")
        .option('--aws-region <value>', "AWS region.")
        .option('--tfc-key <value>', 'Terraform Cloud variable which embed AWS access key id.')
        .option('--tfc-secret <value>', 'Terraform Cloud variable which embed AWS secret id.')
        .option('--tfc-region <value>', 'Terraform Cloud variable which embed AWS region.')
        .action(callProvider)

    program
        .command('backend')
        .description('Configure backend.')
        .option('--silent', 'Disabled interactive mode.')
        .option('--backend-type <local|tfc|s3>', "Chosse backend type between 'local', 'Terraform Cloud' and 's3'.")
        .option('--tfc-host <value>', 'Terraform Cloud host.')
        .option('--tfc-organization <value>', 'Terraform Cloud organization.')
        .option('--tfc-workspace <value>', 'Terraform Cloud workspace.')
        .option('--bucket-name <value>', "AWS S3 Bucket prefix.")
        .option('--bucket-key <value>', "AWS S3 Bucket key.")
        .option('--bucket-region <value>', "AWS S3 Bucket prefix.")
        .action(callBackend)

    program
        .command('clone')
        .description('Clones repository.')
        .action(callClone);

    program
        .command('console')
        .description('Opens AWS Management Console.')
        .action(callConsole);

    program
        .command('init')
        .allowUnknownOption()
        .description('Terraform init command.')
        .action(callInit)

    program
        .command('plan')
        .allowUnknownOption()
        .description('Terraform plan command.')
        .action(callPlan)

    program
        .command('apply')
        .allowUnknownOption()
        .description('Terraform apply command.')
        .action(callApply)

    program
        .command('destroy')
        .allowUnknownOption()
        .description('Terraform destroy command.')
        .action(callDestroy)

    program
        .command("setup-completion")
        .allowUnknownOption()
        .description('Setup auto completion.')
        .action(setupCompletion);
    
    const add_help_command = new Command()
        .command('help')
        .description('Displays help for add command')
        .action(callAddHelp)

    const add_rstate_command = new Command()
        .command('state')
        .description('Adds or updates Remote state connection.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callRState)

    const add_alias_command = new Command()
        .command('provider')
        .description('Adds or updates Provider alias.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callProviderAlias)

    const add_module_command = new Command()
        .command('module')
        .description('Adds Terraform module.')
        .action(callModule)

    program
        .command('add <resource>')
        .description('add Terraform resources')
        .addCommand(add_rstate_command)
        .addCommand(add_alias_command)
        .addCommand(add_module_command)
        .addCommand(add_help_command)

    const env_list_command = new Command()
        .command('list')
        .description('List availables workspaces.')
        .action(callEnvList)

    const env_show_command = new Command()
        .command('show')
        .description('Show current workspace.')
        .action(callEnvShow)

    const env_create_command = new Command()
        .command('new')
        .description('Creates new workspace.')
        .action(callEnvNew)

    const env_select_command = new Command()
        .command('select')
        .description('Selects workspace.')
        .action(callEnvSelect)

    const env_help_command = new Command()
        .command('help')
        .description('Displays help for env command')
        .action(callEnvHelp)

    program
        .command('env <option>')
        .description('Terraform workspaces management')
        .addCommand(env_help_command)
        .addCommand(env_list_command)
        .addCommand(env_show_command)
        .addCommand(env_create_command)
        .addCommand(env_select_command)

    const var_add_command = new Command()
        .command('add')
        .description('Adds new variable.')
        .action(callAddVariable)

    const var_delete_command = new Command()
        .command('delete')
        .description('Deletes variable.')
        .action(callDeleteVariable)

    const var_update_command = new Command()
        .command('update')
        .description('Updates variable.')
        .action(callUpdateVariable)

    const var_list_command = new Command()
        .command('list')
        .description('Lists variables.')
        .action(callListVariables)

    const var_help_command = new Command()
        .command('help')
        .description('Displays help for var command.')
        .action(callVarHelp)

    program
        .command('var <option>')
        .description('Environment variables management.')
        .description(' variables management.')
        .addCommand(var_add_command)
        .addCommand(var_list_command)
        .addCommand(var_update_command)
        .addCommand(var_delete_command)
        .addCommand(var_help_command)

    const cloud_init_command = new Command()
        .command('init')
        .description('Lists variables.')
        .action(callCloudInit)

    const cloud_help_command = new Command()
        .command('help')
        .description('Displays help for cloud command')
        .action(callCloudHelp)

    program
        .command('cloud <command>')
        .description('Configures Terrafom Cloud access.')
        .addCommand(cloud_help_command)
        .addCommand(cloud_init_command)


    const profile_configure_command = new Command()
        .command('configure')
        .description('Configures AWS Profile.')
        .action(callConfigureProfile)

    const profile_list_command = new Command()
        .command('list')
        .description('Lists AWS profiles.')
        .action(callListProfile)

    const profile_help_command = new Command()
        .command('help')
        .description('Displays help for profile command')
        .action(callProfileHelp)

    program
        .command('profile <command>')
        .description('Configures Terrafom Cloud access.')
        .addCommand(profile_configure_command)
        .addCommand(profile_list_command)
        .addCommand(profile_help_command)

    /*
    const cost_estimate_command = new Command()
        .command('estimate')
        .allowUnknownOption()
        .description('Estimates cost using plan file (before deploy).')
        .action(callCostEstimate)
    
    const cost_check_command = new Command()
        .command('check')
        .description('Estimates cost using state file (after deploy).')
        .action(callCostCheck)

    const cost_help_command = new Command()
        .command('help')
        .description('Displays help for cost command')
        //.action(callProfileHelp)

    program
        .command('cost <command>')
        .description('Estimates AWS cost.')
        .addCommand(cost_estimate_command)
        .addCommand(cost_check_command)
        .addCommand(cost_help_command)
    */

    program.parse(process.argv)
}
exports.init = initCommands;

