var options = require('./options').loadConf();
var PM = require('./tools/PostManager');

var site = {
  loadConf: function () {
    this.options = options;
    return this;
  },

  loadPosts: function () {
    this.posts = PM.loadPosts(this.options);
    return this;
  },
};

exports.run = function () {
  site.loadConf().loadPosts();
};
