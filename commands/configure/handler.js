const { saveConfig } = require("../../tools/config")
const { saveFile } = require("../../tools/io");
const { TFResoureTemplate } = require('../../templates/template');
const { createWorkspace } = require('../env/workspace');
const shell = require('shelljs');

function configure(conf) {

    if (conf.tf_version === 'automatic') {
        var status = shell.exec("terraform version", { silent: true });
        var tmp = '';

        if (status.code < 1) {
            tmp = status.stdout.split("\n")[0].split(' ')[1].substr(1);
            tmp = tmp.split('.');
            version = tmp[0] + '.' + tmp[1];
            conf.tf_version = version;
        }
    }

    var tmp = {context: conf.context, environment: conf.environment};
    saveFile(TFResoureTemplate.Context, tmp, 'context.tf', 'Context');
    
    saveFile(TFResoureTemplate.Terraform, { version: '~> ' + conf.tf_version }, 'terraform.tf', 'Terraform version');

    createWorkspace(conf.environment);

    saveConfig('context', conf.context)
    saveConfig('environment', conf.environment)
    saveConfig('tf_version', conf.tf_version)
}
exports.configureContext = configure
