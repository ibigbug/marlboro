var fs = require('fs'),
    path = require('path'),
    walk = require('./utils').walk;


var SUPPORT_FORMAT = ['mkd', 'md', 'markdown'];

function read(callback){
  var _this = this;

  var content_abspath = path.join(this.root_path, this.content_path),
      content_index = path.resolve(content_abspath).split(path.sep).pop();
  walk(content_abspath, function(tree){
    pullTree.call(_this, tree[content_index], callback);
  });
}


/*===Helpers===*/

function pullTree(tree, callback){
  console.log(tree);
  for (var node in tree){
    if (typeof tree[node] == 'object') { // folder found
        this.folders.push(node);
        arguments.callee.call(this, tree[node], callback);
    }
    else {
      this.raw_content.push(tree[node]);
    }
  }

  callback()
}

exports.read = read;
