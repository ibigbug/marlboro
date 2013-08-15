var should = require('should');

var site = require('../lib/site');

describe('site', function () {
  before(function () {
    site.loadConf();
  });

  describe('options', function () {
    it('should have options', function () {
      site.should.be.a('object').and.have.property('options');
    });
  });

  describe('options', function () {
    it('should have some keys', function () {
      site.options.should.have.keys(['conf_file', 'source_dir', 'output_dir', 'writers', 'author', 'site']);
    });
  });
});
