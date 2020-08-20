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
init();

const notifier = updateNotifier({ pkg });
notifier.notify({ defer: false, isGlobal: true });
