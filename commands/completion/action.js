const { getInfo, logError, logSuccess } = require("../../tools/helper");
const { renderTemplateFile } = require('template-file')
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const os = require('os');

exports.setupCompletion = function () {
    var currentShell = process.env.SHELL;

    try {
        if (currentShell.match(/bash/)) {
            currentShell = 'bash';
        } else if (currentShell.match(/zsh/)) {
            currentShell = 'zsh';
        } else if (currentShell.match(/fish/)) {
            currentShell = 'fish';
        }
    } catch (err) {
        //For Windows test
        //currentShell = 'bash';
    }

    if (currentShell == undefined) {
        logError('Auto completion not supported by this shell.');
        return;
    }

    var completion = `_${getInfo().name}_complette`
    var script;
    var template_name;
    var success = true;

    switch (currentShell) {
        case 'bash':
            //script = `### ${getInfo().name} completion script ###\n"if type compdef &>/dev/null; then"\n  ${completion}() {\n    compadd -- \`${getInfo().name} --compzsh --compgen "\${CURRENT}" "\${words[CURRENT-1]}" "\${BUFFER}"\`\n  }\n  compdef ${completion} ${getInfo().name}\nelif type complete &>/dev/null; then\n  ${completion}() {\n    COMPREPLY=( $(compgen -W '$(${getInfo().name} --compbash --compgen "$COMP_CWORD" "$COMP_WORDS[COM_CWOKRDS-1]" "$COMP_LINE}"\n  }\n  complete -F ${completion} ${getInfo().name}\nfi\n`;
            template_name = '/completion.sh';
            break;
        case 'zsh':
            //script = `### ${getInfo().name} completion script ###\nif type compdef &>/dev/null; then\n  ${completion}() {\n    compadd -- \`${getInfo().name} --compzsh --compgen "\${CURRENT}" "\${words[CURRENT-1]}" "\${BUFFER}"\`\n  }\n  compdef ${completion} ${getInfo().name}\nelif type complete &>/dev/null; then\n  ${completion}() {\n    COMPREPLY=( $(compgen -W '$(${getInfo().name} --compbash --compgen "$COMP_CWORD" "$COMP_WORDS[COM_CWOKRDS-1]" "$COMP_LINE}"\n  }\n  complete -F ${completion} ${getInfo().name}\nfi\n`;
            template_name = '/completion.sh';
            break;
        case 'fish':
            //script = `### ${getInfo().name} completion script ###\nfunction ${completion}\n  ${getInfo().name} --compfish --compgen (count (commandline -poc)) (commandline -pt) (commandline -pb)\nend\ncomplete -f -c ${getInfo().name} -a '(${completion})'\n`;
            template_name = '/completion.sh';
            break;
    }
    
    try {
        var data = { program: getInfo().name };
        var template = path.dirname(fs.realpathSync(__filename)) + template_name;
        var folder = os.homedir() + `/.${getInfo().name}`
        var destination = folder + `/${getInfo().name}-completion.sh`;

        if(!shell.test('-d', folder)) {
            shell.mkdir(folder);
        }

        renderTemplateFile(template, data)
            .then(renderedString => fs.writeFileSync(destination, renderedString, (err) => {
                if (err) {
                    success = false;
                    throw err;
                }
            }));
    } catch (err) {
        success = false;
    }
    
    if(success) {
        logSuccess(`${getInfo().name} auto completion process ok.\nYou can source : ${destination}`);
    } else {
        logError(`${getInfo().name} auto completion process failed.`);
    }

}