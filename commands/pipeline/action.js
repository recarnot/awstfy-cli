const { prompt } = require('inquirer');
const { configureGitlabCICD, configureGithubCICD } = require('./handler');

var cicd_inputs = {
    type: 'list',
    name: 'type',
    message: 'Type of Version Control System?',
    choices: [
        {
            name: 'Gitlab',
            value: 'gitlab'
        },
        {
            name: 'Github',
            value: 'github'
        },
    ],
}

exports.callCICD = function(answers) {
    var force = answers.force || false;

    console.info('Configure CI/CD pipeline:'.gray);
    
    prompt(cicd_inputs).then(answers => {
        switch(answers.type) {
            case 'gitlab' : 
                configureGitlabCICD(answers, force);
                break;
            case 'github' : 
                configureGithubCICD(answers, force);
                break;
        }
    })
}