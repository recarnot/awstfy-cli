const cli_conf = require('../package.json');
const colors = require('colors/safe');

exports.getInfo = function() {
    return {
        name: 'awstfy',
        version: cli_conf.version,
        description: cli_conf.description
    }
}

const stream = process.stderr;
const logSymbols = require('log-symbols');

exports.logSuccess = function(text) {
    stream.write(`${logSymbols.success} ${colors.green(text)}\n`);
}

exports.logError = function(text) {
    stream.write(`${logSymbols.error} ${colors.red(text)}\n`);
}

exports.logInfo = function(text) {
    stream.write(`${logSymbols.info} ${colors.blue(text)}\n`);
}

exports.logWarning = function(text) {
    stream.write(`${logSymbols.warning} ${colors.yellow(text)}\n`);
}