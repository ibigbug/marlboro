var fs = require('fs'),
path = require('path');


exports.walk = function(abspath, callback){
  /*
   * callback will get { dirname: {file1: file1_abs_path, subdir: { fil2: file2_abs_path, subdir2: {}.. }}
   */

  var dir_tree = {},
      dirname = path.resolve(abspath).split(path.sep).pop(); // resolve the dir name from abspath
      dir_tree[dirname] = {};

  (function wrapper(dirpath, ret){

    fs.readdirSync(dirpath).forEach(function(item){
      if (fs.statSync(path.join(dirpath, item)).isDirectory()) {

        var subdir = ret[item] = {};
        wrapper(path.join(dirpath, item), subdir);

      } else {
        ret[item] = path.join(dirpath, item);
      }
    });

  })(abspath, dir_tree[dirname]);


  if (callback) return callback(dir_tree);
  return dir_tree;
};
