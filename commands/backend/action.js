const { prompt } = require('inquirer');
const { configureLocalBackend, configureTFCBackend, configureS3Backend } = require('./handler');
const { saveConfig, loadConfig } = require('../../tools/config');
const { TFRegionList } = require('../../constants');
const { cloudManager } = require("../../managers/cloud_manager");
const VariableSpec = require('../../models/Variable');
const ConfSpec = require('../../models/ConfSpec');


exports.callBackend = function (command) {
    if (command.silent) {
        var spec;
        var status;
        var ctype = new VariableSpec('backend-type');
        spec = new ConfSpec();
        spec.register(ctype);
        status = spec.check(command);

        if (status.success) {
            switch (ctype.value) {
                case "local":
                    configureLocalBackend({});
                    return;
                case "tfc":
                    var tfc_host = new VariableSpec('tfc-host');
                    var tfc_organisation = new VariableSpec('tfc-organization');
                    var tfc_workspace = new VariableSpec('tfc-workspace');
                    spec = new ConfSpec();
                    spec.register(tfc_host);
                    spec.register(tfc_organisation);
                    spec.register(tfc_workspace);
                    status = spec.check(command);

                    if (status.success) {
                        var conf = {
                            backend_host: tfc_host.value,
                            backend_organization: tfc_organisation.value,
                            backend_workspace: tfc_workspace.value,
                        }
                        configureTFCBackend(conf);
                    }
                    else console.info(status.message);

                    return;
                case "s3":
                    var s3_bucket_name = new VariableSpec('bucket-name');
                    var s3_bucket_key = new VariableSpec('bucket-key');
                    var s3_bucket_region = new VariableSpec('bucket-region');
                    spec = new ConfSpec();
                    spec.register(s3_bucket_name);
                    spec.register(s3_bucket_key);
                    spec.register(s3_bucket_region);
                    status = spec.check(command);

                    if (status.success) {
                        var conf = {
                            backend_bucket: s3_bucket_name.value,
                            backend_key: s3_bucket_key.value,
                            backend_region: s3_bucket_region.value,
                        }
                        configureS3Backend(conf);
                    }
                    else console.info(status.message);

                    return;
                default:
                    logError("--type must be 'local' or 'tfc'");
                    return;
            }
        } else {
            console.info(status.message);
        }
        return;
    }

    var backend_inputs = {
        type: 'list',
        name: 'backend_type',
        default: loadConfig('backend_type', 'local'),
        message: 'Choose the type of backend for this project:',
        choices: [
            {
                name: 'Local backend',
                value: 'local'
            },
            {
                name: 's3 backend',
                value: 's3'
            },
            {
                name: 'Terraform Cloud backend',
                value: 'tfc'
            },
        ],
    }
    var tfc_inputs = [
        {
            type: 'input',
            name: 'backend_host',
            message: 'Enter the Terraform Cloud hostname:',
            default: loadConfig('backend_host', loadConfig('cloud_hostname', 'app.terraform.io')),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'backend_organization',
            message: 'Organization:',
            default: loadConfig('backend_organization', null),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            },
            when: function (answers) {
                return cloudManager.organizations.length < 1;
            }
        },
        {
            type: 'list',
            name: 'backend_organization',
            message: 'Choose Terraform Cloud organization:',
            default: loadConfig('cloud_organization', null),
            choices: cloudManager.organizations,
            when: function (answers) {
                return cloudManager.organizations.length > 0;
            }
        },
        {
            type: 'input',
            name: 'backend_workspace',
            message: 'Workspace:',
            default: loadConfig('backend_workspace', null),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
    ];

    var s3_inputs = [
        {
            type: 'input',
            name: 'backend_bucket',
            message: 'Bucket name:',
            default: loadConfig('backend_bucket', null),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'backend_key',
            message: 'Key:',
            default: loadConfig('backend_key', null),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'list',
            name: 'backend_region',
            message: 'Bucket region:',
            default: loadConfig('backend_region', null),
            choices: TFRegionList
        }
    ];

    prompt(backend_inputs).then(answers => {
        saveConfig('backend_type', answers.backend_type)

        switch (answers.backend_type) {
            case 'local':
                configureLocalBackend(answers)
                break;
            case 'tfc':
                prompt(tfc_inputs).then(answers => {
                    configureTFCBackend(answers)
                })
                break;
            case 's3':
                prompt(s3_inputs).then(answers => {
                    configureS3Backend(answers)
                })
                break;
            case 'consul':
                break;
        }
    })
}
