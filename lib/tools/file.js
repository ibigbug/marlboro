var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var log = require('./log');
var options = require('../options').loadConf();
var _ = require('underscore');
var rimraf = require('rimraf');

exports.loadJson = function (path) {
  try {
    return require(path);
  } catch (e) {
    log.error(e);
    return {};
  }
};

exports.readDir = function (dirpath) {
  dirpath = path.resolve(process.cwd(), dirpath);
  try {
    return fs.readdirSync(dirpath).filter(function (eachfile) {
      return fs.statSync(exports.absPath(eachfile)).isFile() ;
    });
  } catch (e) {
    log.error('Read Directory Error at : ' + dirpath);
    return [];
  }
};

exports.absPath = function (filepath) {  // resolve abspath from relative
  if (!filepath) {
    return process.cwd();
  }
  var basename = path.basename(filepath);
  var source_dir_abs = path.resolve(process.cwd(), options.source_dir);
  return path.join(source_dir_abs, basename);
};

exports.readFile = function (filepath) {
  try {
    return fs.readFileSync(filepath).toString();
  } catch (e) {
    log.error(e);
    return null;
  }
};

exports.mkdir = mkdirp.sync;
exports.exists = fs.existsSync;

exports.copy = function (src, des) {
  if (!exports.exists(path.dirname(des))) {
    exports.mkdir(path.dirname(des));
  }
  fs.createReadStream(src).pipe(fs.createWriteStream(des));
}

exports.write = function (des, content) {
  var dir = path.dirname(des);
  if (!exports.exists(dir)) {
    log.debug('mkdir: ' + dir);
    exports.mkdir(dir);
  }

  fs.writeFileSync(des, content);
}

exports.rimraf = rimraf.sync;
