var should = require('should');

var Post = require('../lib/tools/post');

describe('post', function () {
  before(function () {
    var p = new Post('./tests/data/source_dir/mk.mkd');
    post = p.fromFile();
  });

  describe('fromFile', function () {
    it('was parsed regularly', function () {
      post.should.have.keys('headers', 'body', 'filepath');
    });

    it('has title', function () {
      post.headers.should.have.property('title');
    });

    it('has content', function () {
      post.body.length.should.above(0);
    });
  });
});
