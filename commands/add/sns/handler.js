const { TFResoureTemplate } = require('../../../templates/template');
const { saveFile } = require('../../../tools/io');

exports.configureSNS = function(conf, force) {
    var destination = 'sns_' + conf.id + '.tf';

    saveFile(TFResoureTemplate.SNS, conf, destination, 'SNS Topic', force);
}
