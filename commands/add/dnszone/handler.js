const { saveFile } = require("../../../tools/io");
const { TFResoureTemplate } = require('../../../templates/template');

function configure(conf, force) {
    var destination = 'dnszone_' + conf.id + '.tf';
        
    saveFile(TFResoureTemplate.DNSZone, conf, destination, 'DNS Zone', force);
}
exports.configureDNSZone = configure

