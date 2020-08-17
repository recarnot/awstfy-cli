const { saveConfig } = require("../../tools/config")
const { saveFile } = require("../../tools/io");
const { TFResoureTemplate } = require('../../templates/template');
const { createWorkspace } = require('../env/workspace');

function configure(conf) {
    saveFile(TFResoureTemplate.Context, conf, 'context.tf', 'Context');
    saveFile(TFResoureTemplate.Terraform, {version : '~> ' + conf.tf_version}, 'terraform.tf', 'Terraform version');

    createWorkspace(conf.environement);

    saveConfig('context', conf.context)
    saveConfig('environement', conf.environement)
    saveConfig('tf_version', conf.tf_version)
}
exports.configureContext = configure
