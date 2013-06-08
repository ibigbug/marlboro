function Post(title){
  this._title = title;
}



Object.defineProperties(Post.prototype, {
  toString: {
    get: function(){
      return '[Post <title: %s>]'.replace('%s', this.title);
    }
  }

});

Post.prototype.set = function(key, value){
  this[key] = value;
};

Post.prototype.get = function(key){
  return this[key] ? this[key] : null;
};

exports.Post = Post;
