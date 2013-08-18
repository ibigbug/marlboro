var should = require('should');
var site = require('../lib/site');

describe('site', function () {
  before(function () {
    site.build();
  });

  describe('writePosts', function () {
    it('has load writer', function () {
      site.should.have.property('writers');
      site.writers.length.should.above(0);
    });
  });
});
