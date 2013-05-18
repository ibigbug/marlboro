require('should');

var Marlboro = require('../app/').App,
    config = require('../config');

var Application = new Marlboro(config);

Application.read();
Application.should.have.property('raw_content');
Application.raw_content.forEach(function(post, index){
  post.should.have.keys('title', 'date', 'tags', 'content', 'abs_path', 'target_folder', 'folder', 'basename', 'perm_link');
});
