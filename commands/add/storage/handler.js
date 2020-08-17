const { TFResoureTemplate } = require('../../../templates/template');
const { saveFile } = require("../../../tools/io");

function configures3(conf, force) {
    var destination = 'storage_' + conf.id + '.tf';
    saveFile(TFResoureTemplate.Storage_S3, conf, destination, 'Storage', force);
}
exports.configureS3Storage = configures3

function configureEFS(conf, force) {
    var destination = 'storage_' + conf.id + '.tf';

    conf.encrypted = conf.kms_key != ''
    conf.kms_key = conf.kms_key != '' ? 'kms_key_id = \"' + conf.kms_key + '\"' : ''

    saveFile(TFResoureTemplate.Storage_EFS, conf, destination, 'Storage', force);
}
exports.configureEFSStorage = configureEFS

