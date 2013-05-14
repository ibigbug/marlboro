var fs = require('fs'),
    path = require('path'),
    reader = require('./reader/'),
    writer = require('./writer/');

function App(config){
  this.config = config;

  this.root_path = path.dirname(__filename);
  this.content_path = config.app_config.content_path || './content';
  this.deploy_path = config.app_config.deploy_path || './deploy';
  this.theme = config.app_config.theme || 'default';

  this.folders = [];
  this.tags = [];
  this.raw_content = [];
  this.rendered = [];
}

App.prototype.init = function(callback){
  var _this = this;

  if ( checkENV(this.config) == false ) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    console.log('Build a fresh blog environment? Y/n')
    process.stdin.on('data', function(yes){
      yes = yes.replace('\n', '');
      if (yes == 'n'){
        process.exit()
      }
      _this.build();
      process.exit();
    });
  }
  else {
    callback();
  }
}
App.prototype.read = reader.read;
App.prototype.write = writer.write;

App.prototype.build = function(){
  console.log('Building new blog environment');
  fs.mkdir(this.config.app_config.content_path, function(e){});
  fs.mkdir(this.config.app_config.deploy_path, function(e){});
};


/*===Helpers===*/
function checkENV(config){
  return ( (fs.existsSync(config.app_config.content_path)) && (fs.existsSync(config.app_config.deploy_path)) );
}


exports.App = App;
