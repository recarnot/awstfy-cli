const { getInfo, logError } = require("../../tools/helper");
const { renderTemplateFile } = require('template-file')
const fs = require('fs');
const path = require('path');

exports.setupCompletion = function () {
    var shell = process.env.SHELL;
    
    try {
        if (shell.match(/bash/)) {
            shell = 'bash';
        } else if (shell.match(/zsh/)) {
            shell = 'zsh';
        } else if (shell.match(/fish/)) {
            shell = 'fish';
        }
    } catch (err) {
        
    }

    if (shell == undefined) {
        logError('Auto completion not supported by this shell');
        return;
    }

    var completion = `_${getInfo().name}_complette`
    var script;
    var template_name;

    switch (shell) {
        case 'bash':
            script = `### ${getInfo().name} completion script ###\n"if type compdef &>/dev/null; then"\n  ${completion}() {\n    compadd -- \`${getInfo().name} --compzsh --compgen "\${CURRENT}" "\${words[CURRENT-1]}" "\${BUFFER}"\`\n  }\n  compdef ${completion} ${getInfo().name}\nelif type complete &>/dev/null; then\n  ${completion}() {\n    COMPREPLY=( $(compgen -W '$(${getInfo().name} --compbash --compgen "$COMP_CWORD" "$COMP_WORDS[COM_CWOKRDS-1]" "$COMP_LINE}"\n  }\n  complete -F ${completion} ${getInfo().name}\nfi\n`;
            template_name = '/bash_zsh.tpl';
            break;
        case 'zsh':
            script = `### ${getInfo().name} completion script ###\nif type compdef &>/dev/null; then\n  ${completion}() {\n    compadd -- \`${getInfo().name} --compzsh --compgen "\${CURRENT}" "\${words[CURRENT-1]}" "\${BUFFER}"\`\n  }\n  compdef ${completion} ${getInfo().name}\nelif type complete &>/dev/null; then\n  ${completion}() {\n    COMPREPLY=( $(compgen -W '$(${getInfo().name} --compbash --compgen "$COMP_CWORD" "$COMP_WORDS[COM_CWOKRDS-1]" "$COMP_LINE}"\n  }\n  complete -F ${completion} ${getInfo().name}\nfi\n`;
            template_name = '/bash_zsh.tpl';
            break;
        case 'fish':
            script = `### ${getInfo().name} completion script ###\nfunction ${completion}\n  ${getInfo().name} --compfish --compgen (count (commandline -poc)) (commandline -pt) (commandline -pb)\nend\ncomplete -f -c ${getInfo().name} -a '(${completion})'\n`;
            template_name = '/fish.tpl';
            break;
    }
    console.info(shell);
    console.info(template_name);

    try {
        var data = {program: getInfo().name};
        var template = path.dirname(fs.realpathSync(__filename)) + template_name;

        renderTemplateFile(template, data)
            .then(renderedString => console.info(renderedString));
    } catch(err) {
        console.error(err);
        return;
    }
}