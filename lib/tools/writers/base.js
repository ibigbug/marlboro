var jade = require('jade');
var log = require('../log');
var options = require('../../options').loadConf();
var fileutil = require('../file');
var path = require('path');
var cache = require('../cache');

function BaseWriter(posts) {
  this.posts = posts;
  this._engine = jade;
  this._template_dir = path.resolve(process.cwd(), '_themes/' + options.theme);

  this.post_template = path.join(this._template_dir, 'post.jade');
  this.index_template = path.join(this._template_dir, 'index.jade');

  this._output_root = path.resolve(process.cwd(), options.output_dir);
}


BaseWriter.prototype.write = function () {
  var self = this;

  this.posts.forEach(function (eachpost) {
    var filename = path.basename(eachpost.filepath);

    var _dest_dir = self._output_root;

    var _dest_file = path.join(_dest_dir, filename);

    self._write(eachpost, _dest_file);  // _write each post

  });

};

BaseWriter.prototype._write = function (post, _dest_file) {
  var self = this;

  var dest_file = _dest_file.replace(/\.(md|mkd|markdown)/, '.html');
  log.debug('suffix changed: ' + _dest_file);
  log.debug('writing: ' + dest_file);

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
  return this._engine.renderFile(self.post_template, {content: eachpost, ns: options.ns});
};

module.exports = BaseWriter;
