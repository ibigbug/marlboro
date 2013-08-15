var options = require('./options').loadConf();
var PM = require('./tools/PostManager');

var site = module.exports = {
  loadConf: function () {
    this.options = options;
    return this;
  },

  loadPost: function () {
    this.posts = PM.loadPosts(this.options);
  }
};
