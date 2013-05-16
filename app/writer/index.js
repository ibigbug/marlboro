var fs = require('fs'),
    mkdir = require('mkdirp'),
    path = require('path'),
    jade = require('jade'),
    marked = require('marked'),
    highlight = require('highlight').Highlight,

    log = require('../utils').log;


var logger = log('WRITER');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'lang-',
  highlight: function(code, lang) {
    return highlight(code);
  }
});


function write(){
  var _this = this;

  this.template_path = path.resolve(this.app_path, 'themes', this.theme, '_templates');

  var list_tpl_str = fs.readFileSync(path.join(this.template_path, 'list.jade'), {encoding: 'utf8'}),
      post_tpl_str = fs.readFileSync(path.join(this.template_path, 'post.jade'), {encoding: 'utf8'});

  var locals = {
    site_config: this.config.site_config,
    folders: this.folders
  };

  //write each post
  this.raw_content.forEach(function(item, index){
    item.content = marked(item.content);
    var fn = jade.compile(post_tpl_str, {filename: _this.template_path + '/post.jade'});
    var buff = fn(update(locals, {item: item}));
    var target = resolveTarget(item);
    fs.writeFile(target, buff, function(err){
      if (err) logger.error(err);
    });
  });


  //index template
  var fn = jade.compile(list_tpl_str, {filename: _this.template_path + '/list.jade'});

  //write site index
  var buff = fn(update(locals, {posts: _this.raw_content}));
  fs.writeFile(path.join(_this.deploy_path, 'index.html'), buff, function(err){
    if (err) logger.error(err);
  });

  //write folder index

  this.folders.forEach(function(folder, index){
    var buff = fn(update(locals, {posts: folderedPosts(_this.raw_content, folder)}));
    fs.writeFile(path.join(_this.deploy_path, folder, 'index.html'), buff, function(err){
      if (err) logger.error(err);
    });
  });
}



/*===Helpers===*/


function resolveTarget(post){
  if (!fs.existsSync(post.target_folder)){
    mkdir.sync(post.target_folder);
  }

  return path.join(post.target_folder, post.basename) + '.html';
}

function update(obj, args){
  var ret = {};

  for (var key in obj){ // make a copy
    if (obj.hasOwnProperty(key)) ret[key] = obj[key];
  }

  for (key in args){ // make update
    ret[key] = args[key];
  }

  return ret;
}


function folderedPosts(posts, folder){
  var ret = [];
  for (var index in posts){
    if (posts[index].folder == folder) ret.push(posts[index]);
  }
  return ret;
}

exports.write = write;
