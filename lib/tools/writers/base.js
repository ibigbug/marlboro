var jade = require('jade');
var log = require('../log');
var options = require('../../options').loadConf();
var fileutil = require('../file');
var path = require('path');
var cache = require('../cache');

function BaseWriter(posts) {
  this.posts = posts;
  this._engine = jade;
  this._template = path.resolve(process.cwd(), '_themes/' + options.theme, 'post.jade');
  this._output_root = path.resolve(process.cwd(), options.output_dir);
}


BaseWriter.prototype.write = function () {
  var self = this;

  this.posts.forEach(function (eachpost) {
    var filename = path.basename(eachpost.filepath),
        filepath = eachpost.filepath;

    var _dest_dir = self._output_root;

    var dest_file = path.join(_dest_dir, filename).replace(/\.(md|mkd|markdown)/, '.html');
    log.debug('suffix changed: ' + filepath);
    log.debug('writing: ' + dest_file);

    self._write(eachpost, dest_file);

  });
};

BaseWriter.prototype._write = function (post, dest_file) {
  var self = this;

  if (cache.get(dest_file)) {
    log.debug('Cache hinted: ' + dest_file);
    var value = cache.get(dest_file);
    var des = path.relative(cache.cache_dir, value);
    fileutil.copy(value, des);
  } else {
    var html = self.render(post);
    fileutil.write(dest_file, html);
    cache.set(dest_file);
  }
};

BaseWriter.prototype.render = function (eachpost) {
  var self = this;
  return this._engine.renderFile(self._template, {content: eachpost, ns: options.ns});
};

module.exports = BaseWriter;
