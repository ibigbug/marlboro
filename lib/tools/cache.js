var path = require('path');
var log = require('./log');
var fileutil = require('./file');

function cache () {
  this.cache_dir = path.resolve(process.cwd(), '.cache');
  if (!fileutil.exists(this.cache_dir));
  fileutil.mkdir(this.cache_dir);
}

cache.prototype._get = function (key) {
  var _value = path.relative(this.cache_dir, key);
  return path.resolve(this.cache_dir, _value);
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
  _key = path.relative(process.cwd(), key);
  var dir = path.dirname(_key);
  var _value = path.join(this.cache_dir, dir);
  if (!fileutil.exists(_value)) {
    log.debug('cache mkdir: ' + _value);
    fileutil.mkdir(_value);
  }

  _value = path.join(_value, path.basename(_key));
  fileutil.copy(key, _value);

  return this._get(key);
}

cache.prototype.destroy = function () {
  try {
    fileutil.rimraf(this.cache_dir);
    return true;
  } catch (e) {
    log.error('Destroy cache faild.');
    return false;
  }
};

module.exports = new cache();
