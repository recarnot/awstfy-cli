const fs = require('fs');
const path = require('path');
const { getLocalConfigPath } = require('../../tools/config');
const { prompt } = require('inquirer');
const { logSuccess } = require('../../tools/helper');

exports.callModule = function (rawcommand) {
    var content = path.normalize(fs.readFileSync(getLocalConfigPath() + '/registry.json', { encoding: 'utf8' }));
    var parsed = JSON.parse(content);

    var registry_inputs = {
        type: 'list',
        name: 'registry',
        message: 'Choose module registry:',
        choices: parsed.registers
    }

    prompt(registry_inputs)
        .then(answers => {
            var name = answers.registry;
            var path = getLocalConfigPath() + '/modules/' + name + '.json';
            var registry = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
            var project_path = process.cwd() + '/';
            var modules = registry.modules;
            var module;
            var variables;
            var inputs = [];
            var choices = [];
            var module_name;
            var module_id;
            var module_url;
            var types = {};
            var data = '';
            var module_author = registry.author;

            for (const key in modules) { choices.push(key) }
            var module_input = {
                type: 'list',
                name: 'module',
                message: 'Choose a module',
                choices: choices
            }

            prompt(module_input)
                .then(answers => {
                    module_name = answers.module;

                    module = modules[module_name];
                    module_source = module.source;
                    module_url = module.registry_url;
                    variables = module.required_variables;

                    for (const key in variables) {
                        types[key] = variables[key].type;

                        inputs.push({
                            type: 'input',
                            name: key,
                            message: variables[key].description + " [" + variables[key].type + ']:'
                        })
                    }

                    prompt({
                        'type': 'input',
                        'name': 'id',
                        'message': 'Enter a module id:'
                    }).then(answers => {
                        module_id = answers.id;

                        data += `#Module managed by: ${module_author}\n`
                        data += `#Module url: ${module_url}\n`
                        data += `module "${module_id}" {\n`
                        data += `  source = "${module.source}"\n`;

                        prompt(inputs)
                            .then(answers => {
                                for (const key in answers) {
                                    if (types[key] == "string") {
                                        data += `  ${key} = "${answers[key]}"\n`;
                                    } else {
                                        data += `  ${key} = ${answers[key]}\n`;
                                    }
                                }
                                data += '}';

                                fs.writeFileSync(project_path + `${module_name}_${module_id}.tf`, data);
                                logSuccess(`Module ${module_name} (${module_author}) created`);
                            })
                    })
                })
        })
}
