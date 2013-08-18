var colors = require('colors');
var options = require('../options').loadConf();

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'blue',
  help: 'cyan'
});

function log(name) {}

log.prototype = {
  constructor: log,

  info: function (msg) {
    console.log(msg.info);
  },
  warn: function (msg) {
    console.log(msg.warn);
  },
  error: function (msg) {
    console.log(msg.error);
  },
  debug: function (msg) {
    if (options.debug) {
      console.log(msg.debug);
    } else {
      return;
    }
  },
  help: function (msg) {
    console.log(msg.help);
  }
};

module.exports = new log();
