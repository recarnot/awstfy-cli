const open = require('open');
const { logInfo } = require("../../tools/helper");
const { loadConfig } = require('../../tools/config');

exports.callConsole = function() {
    var region = loadConfig('aws_region', 'us-east-1');
    var consoleUrl = `https://${region}.console.aws.amazon.com/console/home?region=${region}#`;

    logInfo(`Opens AWS Management Console in ${region}`);

    open(consoleUrl, { wait: false });
}