const logSymbols = require("log-symbols");
const colors = require('colors/safe');

class ContextSpec {
    constructor() {

    }

    _variables = {};

    register(variable) {
        this._variables[variable.name] = variable;
    }

    check(command) {
        var variable;
        var status = {
            success: true,
            message: 'success'
        }
        var errors = [];

        for (var key in this._variables) {
            variable = this._variables[key];
            if (command[variable.name] != undefined) {
                variable.value = command[variable.name];
            } else {
                status.success = false;
                errors.push(variable.option);
            }
        }
        
        if(!status.success) status.message = this._fail(errors);

        return status;
    }

    _fail(errors) {
        var content = '';

        errors.forEach(element => {
            content += colors.red(`${logSymbols.error} ${element} <value> must be defined \n`);
        });
        content += colors.blue(`${logSymbols.info} You can use -h to see help. \n`);
        
        return content;
    }
}
module.exports = ContextSpec;


