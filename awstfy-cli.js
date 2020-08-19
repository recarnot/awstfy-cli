#!/usr/bin/env node

const shell = require('shelljs');
const { init } = require('./commands/commander');
const { bootstrap } = require('./bootstrap');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const { getInfo } = require('./tools/helper');

if (!shell.which('terraform')) {
    shell.echo('Sorry, this tool requires terraform');
    shell.exit(1);
};

bootstrap();

omelette = require("omelette");

omelette(getInfo().name).tree({
  configure: {},
  provider: {},
  backend: {},
  version: {},
  init: {},
  plqn: {},
  apply: {},
  destroy: {},
  profile: ['list', 'configure'],
  env: ['slecect', 'list', 'show', 'new'],
  var: ['add', 'list', 'update', 'delete'],
  cloud: ['init'],
  add: ['vpc', 'storage', 'sns', 'dns', 'state', 'provider'],
}).init();

if (~process.argv.indexOf('--completion')) {
  complete.setupShellInitFile();
}

init();

const notifier = updateNotifier({pkg});
notifier.notify({ defer: false, isGlobal: true });
