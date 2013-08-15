var markdown = require('marked');
var fileutil = require('./file');

function Post(){}

Post.prototype.buildFromFile = function (filePath) {
  var file_data = fileutil.readFile(filePath);
}
