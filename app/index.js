var fs = require('fs'),
    path = require('path'),
    reader = require('./reader/'),
    writer = require('./writer/');

function App(config){
  this.config = config;

  this.app_path = path.dirname(__filename);
  this.root_path = path.resolve(this.app_path, '../');
  this.work_path = process.cwd();

  this.config_file = config.app_config.config_file || 'config.json';
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
    callback(this);
  }
}
App.prototype.read = reader.read;
App.prototype.write = writer.write;

App.prototype.build = function(){
  console.log('Building new blog environment');
  copy(path.join(this.root_path, this.config_file), 
       path.join(this.work_path, this.config_file));
  fs.mkdir(this.config.app_config.content_path, function(e){});
  fs.mkdir(this.config.app_config.deploy_path, function(e){});
};


/*===Helpers===*/

function checkENV(config){
  return ( (fs.existsSync(config.app_config.content_path)) && (fs.existsSync(config.app_config.deploy_path)) );
}

function copy(src, dest){
  if (src == dest) return dest;
  fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  return dest;
}


exports.App = App;
