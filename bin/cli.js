#!/usr/bin/env node

const chalk = require('chalk');
const Creator = require('../lib/index.js').default;

const creator = new Creator();

try {
  creator.init();
} catch (e) {
  console.error(chalk.red(e.message));
}

process.on('unhandledRejection', (e) => {
  console.error(chalk.red(e.message));
});
