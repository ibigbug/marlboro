var options = require('./options');
var PM = require('./tools/PostManager');

var site = {
  version: require('../package').version,

  options: null,

  loadConf: function (conf) {
    this.options = options.loadConf();
    return this;
  },

  loadPosts: function () {
    this.posts = PM.loadPosts(this.options);
    return this;
  },

  build: function () {
    this.loadConf().loadPosts();
  }
};

module.exports = site;
