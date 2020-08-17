const { saveFile } = require("../../../tools/io");
const { TFResoureTemplate } = require('../../../templates/template');

function configureTFCState(conf, force) {
    var destination = 'rstate_' + conf.name + '.tf';
    
    saveFile(TFResoureTemplate.RemoteState_TFC, conf, destination, 'Remote state', force);
}
exports.configureTFCState = configureTFCState

function configureS3State(conf, force) {
    var destination = 'rstate_' + conf.name + '.tf';
    
    saveFile(TFResoureTemplate.RemoteState_S3, conf, destination, 'Remote state', force);
}
exports.configureS3State = configureS3State
