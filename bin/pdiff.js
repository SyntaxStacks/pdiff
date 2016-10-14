#!/usr/bin/env node
var program = require('commander');
var cdn = require('./cdn');
var pkg = require('../package.json');

program
  .version(pkg.version)

program
  .command('config')
  .description('Generate config for pdiff')
  .action(function () {
    var fs = require('fs');
    var path = require('path');
    console.log(process.cwd());
    fs.createReadStream('./config.json.dist').pipe(fs.createWriteStream(path.resolve(process.cwd(), 'config.json')));
  });

program
  .command('push <app>')
  .description('Push new baseline images')
  .action(function (app) {
    cdn.push(app);
    // Pkg cloud mgik
  });

program
  .command('pull <app>')
  .description('Pull baseline images')
  .action(function (app) {
    cdn.pull(app);
  });
program.parse(process.argv);


