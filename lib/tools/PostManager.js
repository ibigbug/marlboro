var fileutil = require('./file');
var Post = require('./post');
var _ = require('underscore');

var PostManager = {
  loadPostsFromFile: function (options) {
    var source_dir = options.source_dir;
    var files = fileutil.readDir(source_dir);
    if (_.isEmpty(files)) {
      return [];
    }
    var posts = files.map(function (eachfile) {
      var p = Post(eachfile);
      return p.fromFile();
    });

    return posts;
  },

  loadPostsFromJson: function (options) {
    return new Error('NotImplementedError');
  }
};

exports.loadPosts = function (options) {
  if (_.contains(options.writes, 'doc')) {
    return PostManager.loadPostsFromJson(options);
  }
  return PostManager.loadPostsFromFile(options);
};
