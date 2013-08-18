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
    var filepath = path.resolve(self._output_root, 
                                path.basename(eachpost.filepath));
    filepath = filepath.replace(/\.(md|mkd|markdown)$/, '.html');
    log.debug('suffix changed: ' + filepath);
    log.debug('writing: ' + filepath);

    if (cache.get(filepath)) {
      log.info('Cache hinted: ' + filepath);
      var value = cache.get(filepath);
      var des = path.relative(cache.cache_dir, value);
      fileutil.copy(value, des);
    } else {
      var html = self.render(eachpost);
      fileutil.write(filepath, html);
      cache.set(filepath);
    }
  });
};

BaseWriter.prototype.render = function (eachpost) {
  var self = this;
  return this._engine.renderFile(self._template, {content: eachpost, ns:options.ns})
};

module.exports = BaseWriter;
