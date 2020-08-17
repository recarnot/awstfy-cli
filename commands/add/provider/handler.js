const { saveFile } = require("../../../tools/io");
const { TFResoureTemplate } = require('../../../templates/template');

exports.configureLocalProvider = function (conf, force) {
    var destination = 'provider_' + conf.id + '.tf';
        
    saveFile(TFResoureTemplate.ProviderAlias_Local, conf, destination, 'Provider alias', force);
}

exports.configureTFCProvider = function (conf, force) {
    var destination = 'provider_' + conf.id + '.tf';
    
    saveFile(TFResoureTemplate.ProviderAlias_TFC, conf, destination, 'Provider alias', force);
}
