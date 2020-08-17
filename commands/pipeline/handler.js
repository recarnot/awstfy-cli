const shell = require('shelljs');
const { loadConfig } = require("../../tools/config")
const { saveFile } = require("../../tools/io");
const { TFResoureTemplate } = require('../../templates/template');
const { logError, logInfo } = require("../../tools/helper");

function isExist(file) {
    if(shell.test('-e', file)) return true;
    return false;
}

function configureGitlab(conf, force) {
    var template = TFResoureTemplate.GitlabCI;
    var destination = '.gitlab-ci.yml';
    var data = {
        context: loadConfig('context', 'my-project'),
        stage: loadConfig('stage', 'dev'),
    };

    if(!isExist(destination, force) || force) {
        saveFile(template, data, destination, 'Gitlab pipeline');
    } else {
        logError('Gitlab pipeline already exist'.red);
        logInfo('Use -f, --force flag to allow configuration overwriting.'.red);
    }
}
exports.configureGitlabCICD = configureGitlab

function configureGithub(conf, force) {
    var destination = '/.github/workflows/workflow.yml';
    var template = TFResoureTemplate.GithubCI;
    var data = {
        context: loadConfig('context', 'my-project'),
    };
    
    if(!isExist('.' + destination) || force) {
        if(!shell.test('-d', '.github')) shell.mkdir('.github');
        if(!shell.test('-d', '.github/workflows')) shell.mkdir('.github/workflows');
    
        saveFile(template, data, destination, 'Github workflow');
    } else {
        console.info('Github workflow already exist'.red);
        console.info('Use -f, --force flag to allow configuration overwriting.'.red);
    }
}
exports.configureGithubCICD = configureGithub