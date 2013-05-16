var fs = require('fs'),
    path = require('path'),
    jade = require('jade'),

    log = require('../utils').log;


var logger = log('WRITER');


exports.write = function(){
  var _this = this;

  this.template_path = path.resolve(this.app_path, 'themes', this.theme, '_templates');

  var list_tpl_str = fs.readFileSync(path.join(this.template_path, 'list.jade'), {encoding: 'utf8'}),
      post_tpl_str = fs.readFileSync(path.join(this.template_path, 'post.jade'), {encoding: 'utf8'});

  this.raw_content.forEach(function(item, index){
    var fn = jade.compile(post_tpl_str, {filename: _this.template_path + '/post.jade'});
    console.log(fn({site_config: _this.config.site_config, item: item}));
  });
};
