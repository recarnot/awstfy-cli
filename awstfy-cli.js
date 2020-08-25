#!/usr/bin/env node
//Have fun 👍

const { init } = require('./commands/commander');
const { bootstrap } = require('./bootstrap');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

bootstrap();
init();

updateNotifier({ pkg }).notify({ defer: false, isGlobal: true });
