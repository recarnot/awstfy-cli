const shell = require('shelljs');
const { getSelectedWorkspace } = require("../env/workspace");
const colors = require('colors/safe');
const { logInfo } = require('../../tools/helper');
const stream = process.stderr;
const logSymbols = require('log-symbols');

exports.callInit = function (rawcommand) {
    var main = 'init';
    var command = buildTerraformCommand(main, rawcommand);
    stream.write(`${logSymbols.info} Terrafom initialization\n`);
    shell.exec(command.line);
}

exports.callPlan = function (rawcommand) {
    var main = 'plan';
    var command = buildTerraformCommand(main, rawcommand, true, false);
    stream.write(`${logSymbols.info} Plan with ${command.env.green}\n`);
    //stream.write(`${logSymbols.info} ${command.line}\n`);
    shell.exec(command.line);
}

exports.callApply = function (rawcommand) {
    var main = 'apply';
    var command = buildTerraformCommand(main, rawcommand, true, true);
    stream.write(`${logSymbols.info} Apply with ${command.env.green}\n`);
    //stream.write(`${logSymbols.info} ${command.line}\n`);
    shell.exec(command.line);
}

exports.callDestroy = function (rawcommand) {
    var main = 'destroy';
    var command = buildTerraformCommand(main, rawcommand, true, true);
    stream.write(`${logSymbols.info} Destroy with ${command.env.green}\n`);
    //stream.write(`${logSymbols.info} ${command.line}\n`);
    shell.exec(command.line, {async:true});
}

exports.callShow = function (rawcommand) {
    var main = 'show';
    var command = buildTerraformCommand(main, rawcommand);
    stream.write(`${logSymbols.info} ${command.line}\n`);
    shell.exec(command.line);
}

exports.CallState = function (rawcommand) {
    var main = 'state';
    var command = buildTerraformCommand(main, rawcommand);
    stream.write(`${logSymbols.info} ${command.line}\n`);
    shell.exec(command.line);
}

function buildTerraformCommand(main, command, env = false, auto = false) {
    var args = command.args || [];
    var env_file;
    var env_value = '';
    var ws;

    if (env) {
        ws = getSelectedWorkspace();
        env_file = `-var-file="env_${ws}.tfvars"`;
        env_value = `env_${ws}.tfvars"`;
        
        if(auto) args.unshift('-auto-approve');
        args.unshift('-input=false');
        args.unshift(env_file);
    }

    args.unshift('terraform ' + main);

    var result = {
        line: args.join(' '),
        env: env_value
    };

    return result; 
}
