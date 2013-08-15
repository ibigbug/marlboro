var fs = require('fs');
var log = require('./log');

exports.loadJson = function (path) {
  try {
    return require(path);
  } catch (e) {
    log.error(e);
    return {};
  }
};

exports.readDir = function (dirpath) {
  try {
    return fs.readdirSync(dirpath).filter(function (eachFile) {
      return fs.statSync(eachFile).isFile();
    });
  } catch (e) {
    log.error(e);
    return [];
  }
}
