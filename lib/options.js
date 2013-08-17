var _ = require('underscore');
var fs = require('fs');
var log = require('./tools/log');

var options = {
  conf_file: 'conf.json',
  source_dir: 'source_dir',
  output_dir: '_site',
  writers: 'folder,tag,feed',

  author: 'admin',
  site: 'localhost'
};

function parseJson(jsonPath) {
  try {
    return JSON.pares(fs.readFileSync(jsonPath).toString());
  } catch (e) {
    log.error('Config load error at : ' + jsonPath);
  }
}

exports.loadConf = function (conf) {
  if (!conf) {
    return options;
  } else {
    if (_.isEmpty(conf)) {
      log.info('using default options');
    }
    return _.defaults(parseJson(conf), options);
  }
};
