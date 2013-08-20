var _base = require('./base');
var path = require('path');
var fileutil = require('../file');
var inherits = require('util').inherits;
var log = require('../log');

function FolderWriter(posts) {
  _base.call(this, posts);
}

inherits(FolderWriter, _base);

FolderWriter.prototype.write = function () {
  var self = this;

  this.posts.forEach(function (eachpost) {
    var filename = path.basename(eachpost.filepath);

    var dest_folder = self._output_root;

    if (!eachpost.headers.folder) {
      return;
    }
    dest_folder = path.join(dest_folder, eachpost.headers.folder);
    fileutil.mkdir(dest_folder);

    var dest_file = path.join(dest_folder, filename);
    log.debug('writing: ' + dest_folder);
    self._write(eachpost, dest_file);
  });
};

module.exports = FolderWriter;
