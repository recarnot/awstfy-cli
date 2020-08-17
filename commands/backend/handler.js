const shell = require('shelljs');
const { saveConfig } = require("../../tools/config")
const { saveFile } = require("../../tools/io")
const { TFResoureTemplate } = require('../../templates/template');

function configureLocal(conf) {
    if(shell.test('-f', 'backend.tf')) {
        shell.rm('backend.tf');
    }

    saveFile(TFResoureTemplate.Backend_Local, {'type' : 'local'}, 'backend.tf', 'Backend [local]');
}
exports.configureLocalBackend = configureLocal

function configureTFC(conf) {
    var data = {
        backend_host: conf.backend_host,
        backend_organization: conf.backend_organization,
        backend_workspace: conf.backend_workspace,
    }

    saveFile(TFResoureTemplate.Backend_TFC, data, 'backend.tf', 'Backend [TFC]');

    saveConfig('backend_host', conf.backend_host)
    saveConfig('backend_organization', conf.backend_organization)
    saveConfig('backend_workspace', conf.backend_workspace)
}
exports.configureTFCBackend = configureTFC

function configureS3(conf) {
    var data = {
        backend_bucket: conf.backend_bucket,
        backend_key: conf.backend_key,
        backend_region: conf.backend_region,
    }
    
    saveFile(TFResoureTemplate.Backend_S3, data, 'backend.tf', 'Backend [s3]');

    saveConfig('backend_bucket', conf.backend_bucket)
    saveConfig('backend_key', conf.backend_key)
    saveConfig('backend_region', conf.backend_region)
}
exports.configureS3Backend = configureS3