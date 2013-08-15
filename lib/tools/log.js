var colors = require('colors');

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'blue',
  help: 'cyan'
});

function log() {
  this.caller = log.caller.name;
}

log.prototype = {
  constructor: log,

  info: function (msg) {
    return msg.info;
  },
  warn: function (msg) {
    return msg.warn;
  },
  error: function (msg) {
    return msg.error;
  },
  debug: function (msg) {
    return msg.debug;
  },
  help: function (msg) {
    return msg.help;
  }
};

module.exports = log;
