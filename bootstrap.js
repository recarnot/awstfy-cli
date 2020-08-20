const shell = require('shelljs');
const fs = require('fs');
const { getLocalConfigPath, getWorkspaceConfigPath } = require('./tools/config');
const { workspaceModel } = require('./managers/workspaces_manager');
const { getWorkspaces } = require('./commands/env/workspace');
const { getInfo } = require('./tools/helper');
const { commandManager } = require('./managers/command_manager');
const { Command } = require('commander');

exports.bootstrap = function() {
    var confFolder = getLocalConfigPath();
    var varFilename = 'env_variables.tf'

    if(!shell.test('-d', confFolder)) shell.mkdir(confFolder);

    if(!shell.test('-f', getWorkspaceConfigPath())) {
        fs.writeFileSync(getWorkspaceConfigPath(), "{\"variables\": {}, \"workspaces\": []}");
    }

    if(!shell.test('-f', varFilename)) {
        shell.touch(varFilename);
        initFile(varFilename);
    }

    commandManager.init(new Command());
    workspaceModel.init();

    getWorkspaces();
}

function initFile(filename) {
    filename = process.cwd() + '/' + filename;
    var header = `#This file is managed by ${getInfo().name}. All manual modifications will be lost.`
    fs.writeFileSync(filename, header, (err) => {
        if (err) {
            console.error(err)
            throw err;
        }
    });
}