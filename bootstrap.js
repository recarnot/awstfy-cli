const shell = require('shelljs');
const fs = require('fs');
const { getLocalConfigPath, getWorkspaceConfigPath } = require('./tools/config');
const { workspaceModel } = require('./managers/workspaces_manager');
const { getWorkspaces } = require('./commands/env/workspace');
const { getInfo } = require('./tools/helper');

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