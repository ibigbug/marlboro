require('should');
var site = require('../lib/site');
var fileutil = require('../lib/tools/file');

describe('site', function () {
  before(function () {
    site.build();
  });

  describe('folder writer', function () {
    it('can mkdir', function () {
      fileutil.exists('./_site/fold').should.be.true;
    });

    it('can write posts in dir', function () {
      fileutil.exists('./_site/fold/mk.html');
    });
  });
});
