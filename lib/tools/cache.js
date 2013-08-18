var path = require('path');
var log = require('./log');
var fileutil = require('./file');

function cache () {
  this.cache_dir = path.resolve(process.cwd(), '.cache');
  if (!fileutil.exists(this.cache_dir));
  fileutil.mkdir(this.cache_dir);
}

cache.prototype._get = function (key) {
  return path.resolve(this.cache_dir, key);
}

cache.prototype.get = function (key) {
  var self = this;
  key = path.join(self.cache_dir, path.relative(process.cwd(), key));
  if (fileutil.exists(key)) {
    return this._get(key);
  }
  return null;
}

cache.prototype.set = function (key) {
  var basename = path.basename(key);
  fileutil.copy(key, path.resolve(this.cache_dir, basename));
  return this._get(key);
}

module.exports = new cache();
