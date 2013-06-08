#!/usr/bin/env node

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

function SimpleHTTPServer(dir, port){
  this.dir = dir || process.cwd();
  this.port = port || 8888;
}

SimpleHTTPServer.prototype.run = function(){
  var server = this;
  console.log('Server running at\n  => http://localhost:' + this.port);
  http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname,
        filename = path.join(server.dir, uri);


    fs.exists(filename, function(exists){
      if(!exists){
        console.log('GET 404: ', filename);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 not found\n');
        res.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += 'index.html';

      fs.readFile(filename, 'binary', function(err, file){
        console.log('GET 200: ' + filename);
        if (err){
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.write(err + '\n');
          res.end();
        }

        res.writeHead(200);
        res.write(file, 'binary');
        res.end();
      });
    });
  }).listen(parseInt(server.port, 10));
};


exports.SimpleHTTPServer = SimpleHTTPServer;
