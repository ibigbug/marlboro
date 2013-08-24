var server = require('connect');
var options = require('../options').loadConf();

server().use(server.static(options.output_dir)).listen(3000);
console.log('Listening on port 3000');
