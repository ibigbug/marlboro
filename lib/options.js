var _ = require('underscore');
var file = require('./tools/file');
var log = require('./tools/log');

var options = {
  conf_file: 'conf.json',
  source_dir: 'source',
  output_dir: '_site',
  writers: 'folder,tag,feed',

  author: 'admin',
  site: 'localhost'
};

exports.loadConf = function (conf) {
  if (!conf) {
    return options;
  } else {
    var custom = file.loadJson(conf);
    if (_.isEmpty(custom)) {
      log.info('use default options');
    }
    return _.defaults(file.loadJson(conf), options);
  }
};
