var fileutil = require('./file');
var Post = require('./post');
var _ = require('underscore');

exports = module.exports = {
  loadPostsFromFile: function (options) {
    var source_dir = options.source_dir;
    var files = fileutil.readDir(source_dir);
    if (_.isEmpty(files)) {
      return;
    }
    files.map(function (eachFile) {
      return Post.buildFromFile(eachFile);
    });

    return files;
  },

  loadPostsFromJson: function (options) {
    return new Error('NotImplementedError');
  }
};
