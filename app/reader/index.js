var fs = require('fs'),
    path = require('path'),
    walk = require('./utils').walk;
    log = require('../utils').log;

var logger = new log('READER');

function read(callback){
  var _this = this;

  var content_abspath = path.join(this.root_path, this.content_path),
      content_index = path.resolve(content_abspath).split(path.sep).pop();

  walk(content_abspath, function(tree){
    pullTree.call(_this, tree[content_index]);
    _this.raw_content.forEach(function(post_path, index){
      buildPost.call(_this, post_path, index);
    });
    callback();
  });
}


/*===Helpers===*/

function pullTree(tree){
  for (var node in tree){
    if (typeof tree[node] == 'object') { // folder found
        this.folders.push(node);
        arguments.callee.call(this, tree[node]);
    }
    else {
      this.raw_content.push(tree[node]);
    }
  }
}

function buildPost(post_path, index){
  var _this = this;
  var post = {};
  var data = fs.readFileSync(post_path, {encoding: 'utf8'});
    
  var meta, content;
  var all = data.split('======');
  meta = all[1];
  content = all[2];

  if (meta == undefined || content == undefined) {
    logger.warning('Bad Post :' + post_path);
    return;
  }

  var metas = meta.split('\n');
  for (var key in metas){
    var name = metas[key].split(':')[0],
        value = metas[key].split(':')[1];
    if (name){
      post[name] = value;
    }else continue;
  }
  post.abs_path = post_path;
  post.parent_folder = path.dirname(post_path).split(path.sep).pop();

  _this.raw_content[index] = post;
}

exports.read = read;
