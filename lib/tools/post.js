var markdown = require('marked');
var path = require('path');
var fileutil = require('./file');
var log = require('./log');
var options = require('../options').loadConf();

function Post(post_source) {
  if (!(this instanceof Post)) {
    return new Post(post_source);
  }

  this._source_dir = path.resolve(process.cwd(), options.source_dir);
  this.post_source = path.resolve(this._source_dir, path.basename(post_source));  // TODO folder support
}

Post.prototype.fromFile = function (filepath) {
  var post_parsed = parsePost(filepath || this.post_source);
  return post_parsed;
};

module.exports = Post;

function parsePost(filepath) {
  var post = {};
  var content = fileutil.readFile(filepath);
  var canParse = content.split(/-{3,}/);
  if (canParse.length <= 1) {
    log.debug('Unsupport format: ' + filepath);
    return;
  }
  var headers = markdown(canParse.shift().split(/[\n\r\n]/).filter(function (line) {
    return (line.length > 0);
  }).join('\n'));
  var body = markdown(canParse.join(''));

  post.headers = _parseHeader(headers);
  post.body = body;

  post.filepath = filepath;

  post.permlink = options.permlink.replace(/{{(.*?)}}/g, function(m, p){
    return post.headers[p.trim()];
  });

  return post;

  function _parseHeader(header_content) {
    var headers = {};
    var title_reg = new RegExp('<h1>(.*?)</h1>');
    var title = header_content.match(title_reg);
    headers.title = title ? title[1] : null;

    var _metas = [];
    var metas_reg = new RegExp('<li>(.*?)</li>', 'g');
    var match = metas_reg.exec(header_content);
    while (match) {
      _metas.push(match[1]);
      match = metas_reg.exec(header_content);
    }
    _metas.forEach(function (meta) {
      var key = meta.split(':')[0].trim();
      var value = meta.split(':')[1].trim();
      headers[key] = value;
    });

    headers.status = headers.status || 'public';
    headers.filename = path.basename(filepath).replace(path.extname(filepath), '');
    
    return headers;
  }
}
