var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var options = {
  source_dir: 'source_dir',
  output_dir: '_site',
  writers: 'base, folder',
  theme: 'default',
  permlink: '{{ folder }}/{{ filename }}.html',

  debug: false,

  ns: {}
};

function parseJson(jsonpath) {
  jsonpath = path.resolve(process.cwd(), jsonpath);
  try {
    return JSON.parse(fs.readFileSync(jsonpath).toString());
  } catch (e) {
    log.error('Config load error at : ' + jsonpath);
  }
}

exports.loadConf = function () {
  var conf = path.resolve(process.cwd(), 'modoc.json');
  if (!conf) {
    log.info('Using default options');
    return options;
  } else {
    return _.defaults(parseJson(conf), options);
  }
};

var log = require('./tools/log');
