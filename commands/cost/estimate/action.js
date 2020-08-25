const shell = require('shelljs');
const { callPlan } = require('../../terraform/action');

exports.callCostEstimate = function(rawcommand) {
    console.info('Estimate cost');

    callPlan(rawcommand);

    shell.exec("terraform show dev.plan > dev.json");
    //shell.exec("jq -cf terraform.jq dev.json > ano.json");
    shell.exec('curl -s -X POST -H "Content-Type: application/json" --data @dev.json https://cost.modules.tf/');


    //terraform plan -out=plan.tfplan > /dev/null && terraform show -json plan.tfplan | jq -cf terraform.jq | curl -s -X POST -H "Content-Type: application/json" -d @- https://cost.modules.tf/

    //var request = `curl --header "Authorization: Bearer ${token}" --header "Content-Type: application/vnd.api+json" --request GET  ${hostname}${api}`

    //var status = shell.exec(request, { silent: true });

    /*
     if(status.code > 0) {
            logError("Unables to process the request to Terraform Cloud using given informations, please check.");
            return;
        }
    */
}