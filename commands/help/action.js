const figlet = require('figlet');
const colors = require('colors');
const Table = require('cli-table3');
const { getInfo } = require('../../tools/helper');
const cells = [];

const CLI_TABLE_COMPACT = {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: ' ',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' ',
};

exports.callAllHelp = function() {
    figlet('AWSTFY CLI', { font: 'ANSI Shadow'}, function(err, data) {
        if (err) {
            console.error('Something went wrong...');
            console.dir(err);
            return;
        }

        console.info('');
        console.log(data)
        console.info(colors.gray('Just a command line tool for AWS Terraform project (' + getInfo().version + ')'));
        console.info('');
        console.info('Usage: %s <command> <subcommand>', getInfo().name);
        console.info('');
        
        addBasicCommands();
        addProfileCommands();
        addEnvCommands();
        addVarCommands();
        addCloudCommands();
        addAddCommands();

        showHelp();
    });
}

exports.callAddHelp = function() {
    console.info('');
    console.info('Usage: %s add <resource>', getInfo().name);
    addAddCommands();
    showHelp();
}

exports.callProfileHelp = function() {
    console.info('');
    console.info('Usage: %s profile <command>', getInfo().name);
    addProfileCommands();
    showHelp();
}

exports.callEnvHelp = function() {
    console.info('');
    console.info('Usage: %s env <command>', getInfo().name);
    addEnvCommands();
    showHelp();
}

exports.callVarHelp = function() {
    console.info('');
    console.info('Usage: %s var <command>', getInfo().name);
    addVarCommands();
    showHelp();
}

exports.callCloudHelp = function() {
    console.info('');
    console.info('Usage: %s cloud <command>', getInfo().name);
    addCloudCommands();
    showHelp();
}

function addBasicCommands() {
    var commands = [
        { name: 'Top level commands:'.blue},
        {
            name: 'configure',
            description: "Configures project.",
        },
        {
            name: 'provider',
            description: "Configures default Terraform provider for this project.",
        },
        {
            name: 'backend',
            description: 'Configures Terraform backend for this projet.',
        },
        {
            name: 'clone',
            description: "Clones GIT repository in current directory.",
        },
        {
            name: 'console',
            description: "Opens AWS Management Console.",
        },
        {
            name: 'pipeline',
            description: "Creates default CI pipeline for GitHub or GitLab platform."
        },
        {
            name: 'version',
            description: "Shows current version.",
        },
        {
            name: 'reset',
            description: "Removes all configurations from this project.",
        },
        {
            name: 'help',
            description: "Displays help. ",
        },
    ];

    pushCommands(commands);
}

function addAddCommands() {
    var commands = [
        { name: ''},
        { name: 'add <resource>: Add Terraform resources'.blue, header:true},
        {
            name: 'add vpc',
            description: 'Manages VPC.',
        },
        {
            name: 'add storage',
            description: 'Manages Storage.',
        },
        {
            name: 'add SNS Topic',
            description: 'Manages SNS Topic.',
        },
        {
            name: 'add dns',
            description: 'Manages Hosted zone.',
        },
        {
            name: 'add state',
            description: 'Manages Remote state connection.',
        },
        {
            name: 'add provider',
            description: 'Manages Provider alias.',
        },
    ];

    pushCommands(commands);
}

function addEnvCommands() {
    var commands = [
        { name: ''},
        { name: 'env <command>: Manages Terraform workspaces (environments)'.blue, header:true},
        {
            name: 'env select',
            description: 'Seclect a Terraform workspace.',
        },
        {
            name: 'env list',
            description: 'Retreives Terraform workspaces.',
        },
        {
            name: 'env show',
            description: 'Retreives current Terraform workspace.',
        },
        {
            name: 'env new',
            description: 'Creates a new Terraform workspace.',
        },
    ];

    pushCommands(commands);
}

function addVarCommands() {
    var commands = [
        { name: ''},
        { name: 'var <command>: Manages environment variables'.blue, header:true},
        {
            name: 'var add',
            description: 'Creates a new variable.',
        },
        {
            name: 'var list',
            description: 'Lists variables.',
        },
        {
            name: 'var update',
            description: 'Updates variable.',
        },
        {
            name: 'var delete',
            description: 'Deletes variable.',
        },
    ];

    pushCommands(commands);
}

function addCloudCommands() {
    var commands = [
        { name: ''},
        { name: 'cloud <command>: Manages Terraform Cloud'.blue, header: true},
        {
            name: 'cloud init',
            description: 'Configures Terrafom Cloud access and pulls organizations.',
        },
    ];

    pushCommands(commands);
}

function addProfileCommands() {
    var commands = [
        { name: ''},
        { name: 'profile <command>: Manages AWS profiles'.blue, header: true},
        {
            name: 'profile configure',
            description: 'Creates or updates AWS profile.',
        },
        {
            name: 'profile list',
            description: 'Lists AWS profiles.',
        },
    ];

    pushCommands(commands);
}

function pushCommands(commands) {
    for (let i = 0; i < commands.length; i += 1) {
        if(commands[i].header) {
            cells.push([{ colSpan: 2, content: commands[i].name.bold }]);
        } else cells.push([commands[i].name.bold, commands[i].description]);
    }
}

function showHelp() {
    var t;
    t = new Table({
        chars: CLI_TABLE_COMPACT,
    });
    t.push(...cells);
    
    console.log(t.toString());
}