const { TFResoureTemplate } = require('../../../templates/template');
const { saveFile } = require('../../../tools/io');

exports.configureVPC = function(conf, force) {
    var destination = 'vpc_' + conf.id + '.tf';
    var data = {
        id : conf.id,
        cidr_block : conf.cidr_block,
        az_count : conf.az,
        map_ip : conf.options.indexOf('public_ip') > -1,
        dns_support : conf.options.indexOf('dns_support') > -1,
        dns_hostnames : conf.options.indexOf('dns_hostnames') > -1,
        nat_enabled : conf.nat.indexOf('0') > -1,
        nat_ha : conf.nat.indexOf('1') > -1,
    }

    saveFile(TFResoureTemplate.VPC, data, destination, 'VPC', force);
}