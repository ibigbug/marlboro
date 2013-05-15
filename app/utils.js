function log(name, msg) {
  this.name = name
}

log.prototype.debug = function(msg){
  console.log('DEBUG:' + this.name + ':' + msg);
};

log.prototype.warning = function(msg){
  console.log('WARNING:' + this.name + ':' + msg);
};


exports.log = log;
