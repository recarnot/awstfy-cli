const { Command } = require('commander');

const { callProvider } = require('./commands/provider/action');
const { callBackend } = require('./commands/backend/action');
const { callCICD } = require('./commands/pipeline/action');
const { callConfigure } = require('./commands/configure/action');
const { getInfo } = require('./tools/helper');
const { callVersion } = require('./commands/version/action');
const { callCreateProfile } = require('./commands/profile/action');
const { callVPC } = require('./commands/add/vpc/action');
const { callStorage } = require('./commands/add/storage/action');
const { callDNSZone } = require('./commands/add/dnszone/action');
const { callRState } = require('./commands/add/remotestate/action');
const { callSNS } = require('./commands/add/sns/action');
const { callProviderAlias } = require('./commands/add/provider/action');
const { callClone } = require('./commands/clone/action');
const { callConsole } = require('./commands/console/action');
const { callEnvList } = require('./commands/env/list/actions');
const { callEnvShow } = require('./commands/env/show/actions');
const { callEnvNew } = require('./commands/env/new/actions');
const { callEnvSelect } = require('./commands/env/select/actions');
const { callAllHelp, callAddHelp, callEnvHelp, callVarHelp, callCloudHelp } = require('./commands/help/action');
const { callAddVariable } = require('./commands/var/add/actions')
const { callListVariables } = require('./commands/var/list/action')
const { callUpdateVariable } = require('./commands/var/update/actions')
const { callDeleteVariable } = require('./commands/var/delete/actions');
const { callCloudInit } = require('./commands/cloud/init/action');

function initCommands () {
    var program = new Command();

    program
        .version(getInfo().version)
        .description(getInfo().name + ' is a ' + getInfo().description)
        .action(callAllHelp)

    const version_command = program 
        .command('version')
        .description('Shows current version.')
        .action(callVersion);
    
    const help_command = program
        .command('help')
        .description('Displays help.')
        .action(callAllHelp);

    const context_command = program
        .command('configure')
        .description('Configure project.')
        .action(callConfigure)

    const provider_command = program
        .command('provider')
        .description('Configure provider.')
        .action(callProvider)

    const backend_command = program
        .command('backend')
        .description('Configure backend.')
        .action(callBackend)

    const pipeline_command = program
        .command('pipeline')
        .description('Create CI/CD pipeline.')
        .option('-f, --force', 'Allows to overwrite configuration if exist')
        .action(callCICD)

    const profile_command = program
        .command('profile')
        .description('Create new AWS profile.')
        .action(callCreateProfile)

    const clone_command = program
        .command('clone')
        .description('Clones repository.')
        .action(callClone);

    const console_command = program
        .command('console')
        .description('Opens AWS Management Console.')
        .action(callConsole);

    const add_help_command = new Command()
        .command('help')
        .description('Displays help for add command')
        .action(callAddHelp)

    const add_vpc_command = new Command()
        .command('vpc')
        .description('Adds or updates VPC resource.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callVPC)
    
    const add_storage_command = new Command()
        .command('storage')
        .description('Adds or updates Storage resource.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callStorage)

    const add_dnszone_command = new Command()
        .command('dns')
        .description('Adds or updates Hosted zone resource.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callDNSZone)

    const add_rstate_command = new Command()
        .command('state')
        .description('Adds or updates Remote state connection.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callRState)

    const add_sns_command = new Command()
        .command('sns')
        .description('Adds or updates SNS Topic resource.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callSNS)

    const add_alias_command = new Command()
        .command('provider')
        .description('Adds or updates Provider alias.')
        .option('-f, --force', 'Allows to auto overwrite configuration if exist.')
        .action(callProviderAlias)

    program
        .command('add <resource>')
        .description('add Terraform resource')
        .addCommand(add_vpc_command)
        .addCommand(add_storage_command)
        .addCommand(add_dnszone_command)
        .addCommand(add_rstate_command)
        .addCommand(add_sns_command)
        .addCommand(add_alias_command)
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
        .description('Environement variables management.')
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

    program.parse(process.argv)
}
exports.init = initCommands;
