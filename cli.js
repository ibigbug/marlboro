#!/usr/bin/env node

var commander = require('commander'),
    Application = require('./index').App,
    logger = require('./app/utils').log;
    config = require('./config');

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
