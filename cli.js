#!/usr/bin/env node

var path = require('path'),
    fs = require('fs'),
    commander = require('commander'),
    Application = require('./index').App,
    logger = require('./app/utils').log;

var app = new Application(config),
    log = new logger('Marlboro');

commander.version(require('./package').version)
.option('-c, --create', 'Create new blog environment')
.parse(process.argv);


if (commander.create) {
  app.build();
}
else {
  log.info('Starting');
  app.init(function(){
    log.info('Reading');
    app.read(function(){
      log.info('Writing');
      app.write();
      log.info('Finished');
    });
  });
}


/*===Helpers===*/

function resolveConf(){
  var config_file = path.join(process.cwd(), 'config.json');
  if (fs.existsSync(config_file)) return config_file;
  return './config';
}
