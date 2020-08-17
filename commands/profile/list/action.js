const colors = require('colors/safe');
const Table = require('cli-table3');
const { logSuccess, logError } = require("../../../tools/helper")
const { profileManager } = require("../../../managers/profiles_manager")

exports.callListProfile = function () {

    var names = profileManager.list();
    var count = names.length;
    var cells = [];

    if (count > 0) {
        logSuccess(`${count} AWS profiles found:`);
        var line = [];
        var limit = 4;
        var iterator;
        var delta = count%limit;
        
        for (let index = 0; index < delta; index++) {
            names.push('');
            
        }

        for (let index = 0; index < names.length; index++) {
            const element = names[index];

            line.push(element);

            iterator = index + 1;

            if (iterator%limit == 0) {
                cells.push(line);
                line = [];
            }
        }
        
        var t;
        t = new Table({
            chars: CLI_TABLE_COMPACT
        });
        t.push(...cells);

        console.log(colors.gray(t.toString()));
    }
    else {
        logError('No AWS profiles found on this platform.');
    }

}

const CLI_TABLE_COMPACT = {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: ' ',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' ',
};
