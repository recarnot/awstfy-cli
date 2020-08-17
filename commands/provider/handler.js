const { saveConfig } = require("../../tools/config")
const { saveFile } = require("../../tools/io")
const { TFResoureTemplate } = require('../../templates/template');

function configureLocalProvider(conf) {
    var data = {
        profile: conf.aws_profile,
        region: conf.aws_region
    }

    saveFile(TFResoureTemplate.Provider_Local, data, 'provider.tf', 'Provider')

    saveConfig('aws_profile', conf.aws_profile);
    saveConfig('aws_region', conf.aws_region);
}
exports.configureLocalProvider = configureLocalProvider

function configureTFCProvider(conf) {
    var data = {
        access_key_var: conf.access_key_var,
        secret_key_var: conf.secret_key_var,
        region_var: conf.region_var
    }
    
    saveFile(TFResoureTemplate.Provider_TFC, data, 'provider.tf', 'Provider');

    saveConfig('access_key_var', conf.access_key_var);
    saveConfig('secret_key_var', conf.secret_key_var);
    saveConfig('region_var', conf.region_var);
}
exports.configureTFCProvider = configureTFCProvider