function Post(title){
  this._title = title;
}



Object.defineProperties(Post.prototype, {
  title: {
    get: function(){
      return this._title ? this._title : 'Untitled';
    },

    set: function(title){
      this.title = title;
    }
  },

  set: function(key, value){
    this[key] = value;
  },

  get: function(key){
    return this[key];
  }


  toString: {
    get: function(){
      return '[Post <title: %s>]'.replace('%s', this.title);
    }
  }

});


exports.Post = Post;
