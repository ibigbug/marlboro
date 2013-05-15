#!/usr/bin/env node

var commander = require('commander'),
    Application = require('./index').App,
    config = require('./config');

var app = new Application(config);

commander.version(require('./package').version)
.option('-c, --create', 'Create new blog environment')
.parse(process.argv);


if (commander.create) {
  app.build();
}
else {
  app.init(function(){
    app.read(function(){
      app.write();
    });
  });
}
