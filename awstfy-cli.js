#!/usr/bin/env node

const shell = require('shelljs');
const { init } = require('./commands/commander');
const { bootstrap } = require('./bootstrap');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

if (!shell.which('terraform')) {
    shell.echo('Sorry, this tool requires terraform');
    shell.exit(1);
};

bootstrap();

// Write your CLI template.
omelette = require("omelette");
var complete = omelette("awstfy <command> <subcommand>");

complete.on("command", function() {
  this.reply(["version", "configure", "clone"]);
});

complete.on("subcommand", function(action) {
    this.reply(["configure", "list", "select"]);
});
complete.init();

if (~process.argv.indexOf('--completion')) {
  complete.setupShellInitFile();
}

init();

const notifier = updateNotifier({pkg});
notifier.notify({ defer: false, isGlobal: true });
