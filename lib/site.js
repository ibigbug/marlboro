var options = require('./options');
var path = require('path');
var cache = require('./tools/cache');
var log = require('./tools/log');

var site = {
  version: require('../package').version,

  options: null,

  cache: cache,

  loadConf: function (conf) {
    this.options = options.loadConf();
    return this;
  },

  loadPosts: function () {
    var PM = require('./tools/PostManager');

    this.posts = PM.loadPosts(this.options);
    return this;
  },

  writePosts: function () {
    var self = this;

    var writers = this.options.writers.split(',').map(function (w) {
      var w = w.trim();
      w = requireWriter(w);
      log.debug('    Loading writer: ' + w.name);
      return w;
    });
    this.writers = writers;

    writers.forEach(function (W) {
      var w = new W(self.posts);
      w.write();
    });
    return this;
  },

  build: function () {
    this.loadConf().loadPosts().writePosts();
  }
};

module.exports = site;

function requireWriter (writer) {
  var s = path.resolve(process.cwd(), './lib/tools/writers/' + writer);
  return require(s);
}
