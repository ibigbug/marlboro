var fs = require('fs'),
    path = require('path'),

    Post = require('../model/post').Post,

    walk = require('./utils').walk;
    log = require('../utils').log;

var logger = new log('READER');

function read(callback){
  var _this = this;

  var content_abspath = path.resolve(this.work_path, this.content_path),
      content_index = path.resolve(content_abspath).split(path.sep).pop();

  walk(content_abspath, function(tree){
    pullTree.call(_this, tree[content_index]);
    _this.raw_content.forEach(function(post_path, index){
      buildPost.call(_this, post_path, index);
    });
    if (callback) {callback();}
    return _this.raw_content;
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
  var post = new Post();

  var data = fs.readFileSync(post_path).toString();
    
  var meta, content;
  var all = data.split('======');
  meta = all[1];
  content = all[2];

  if (meta === undefined || content === undefined) {
    logger.warning('Bad Post :' + post_path);
    return;
  }

  var metas = meta.split('\n');
  for (var key in metas){
    var name = metas[key].split(':')[0],
        value = metas[key].split(':')[1];
    if (name){
      post.set(name.trim(), value.trim());
    }else continue;
  }
  post.set('content', content);

  post.set('abs_path', post_path);
  post.set('target_folder', path.join(path.resolve(this.deploy_path), path.relative(this.content_path, path.dirname(post_path))));
  post.set('folder', path.relative(this.deploy_path, post.target_folder));
  post.set('basename', path.basename(post_path, path.extname(post_path)));
  post.set('perm_link', this.config.site_config.site_url + path.relative(this.content_path, post_path).replace(path.extname(post_path), '.html'));

  post.set('tags', post.tags.split(',').
    filter(function(ele, index){
      return (ele.trim() !== '');
    }).
    map(function(ele){
      return ele.trim();
    }));

  _this.raw_content[index] = post;
}

exports.read = read;
