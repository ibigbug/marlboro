require('should');

var Marlboro = require('../app/').App,
    config = require('../config');

config.app_config.content_path = './test/content';

var Application = new Marlboro(config);

Application.read();
Application.should.have.property('raw_content');
Application.raw_content.forEach(function(post, index){
  post.should.have.keys('_title', 'title', 'date', 'tags', 'content', 'abs_path', 'target_folder', 'folder', 'basename', 'perm_link');
});
