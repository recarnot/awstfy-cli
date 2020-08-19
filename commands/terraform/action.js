const shell = require('shelljs');
const { getSelectedWorkspace } = require("../env/workspace");
const logSymbols = require('log-symbols');

exports.callInit = function (rawcommand) {
    var main = 'init';
    var command = buildInitCommand(main, rawcommand);
    console.info(`${logSymbols.info} Terrafom initialization`);
    console.info(" ", command.line, "\n");
    shell.exec(command.line);
}

exports.callPlan = function (rawcommand) {
    var main = 'plan';
    var command = buildPlanCommand(main, rawcommand);
    console.info(`${logSymbols.info} Plan using ${command.env.green} variables:`)
    console.info(" ", command.line, "\n");
    shell.exec(command.line);
}

exports.callApply = function (rawcommand) {
    var main = 'apply';
    var command = buildApplyCommand(main, rawcommand);
    console.info(`${logSymbols.info} Apply using ${command.env.green} saved plan`);
    console.info(" ", command.line, "\n");
    shell.exec(command.line);
}

exports.callDestroy = function (rawcommand) {
    var main = 'destroy';
    var command = buildTerraformCommand(main, rawcommand, true, true);
    console.info(`${logSymbols.info} Destroy with ${command.env.green}`);
    console.info(" ", command.line, "\n");
    shell.exec(command.line, { async: true });
}

function buildInitCommand(main, command) {
    var args = command.args || [];
    args.unshift('-input=false');

    args.unshift('terraform ' + main);

    var result = {
        line: args.join(' '),
        env: ''
    };

    return result;
}

function buildPlanCommand(main, command) {
    var args = command.args || [];
    var env_file;
    var env_value = '';
    var ws;

    ws = getSelectedWorkspace();
    env_file = `-var-file=env_${ws}.tfvars`;

    args.unshift('-input=false');
    args.unshift(env_file);
    args.unshift('terraform ' + main);
    args.push(`-out=${ws}.plan`);

    var result = {
        line: args.join(' '),
        env: ws
    };

    return result;
}

function buildApplyCommand(main, command) {
    var args = command.args || [];
    var env_file;
    var env_value = '';
    var ws;

    ws = getSelectedWorkspace();
    env_file = `-var-file=env_${ws}.tfvars`;
    env_value = `env_${ws}.tfvars`;

    args.unshift('-auto-approve');
    args.unshift('-input=false');
    args.unshift('terraform ' + main);
    args.push(`${ws}.plan`);

    var result = {
        line: args.join(' '),
        env: ws
    };

    return result;
}
