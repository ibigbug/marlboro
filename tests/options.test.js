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

    it('should have some keys', function () {
      site.options.should.have.keys(['source_dir', 'output_dir', 'writers', 'theme', 'ns']);
    });

    it('can load conf from specific file', function () {
      site.loadConf('./test/data/conf.json');
      site.options.ns.should.be.a('object');
    });

    it('can mount extra options on ns', function () {
      site.options.ns.should.be.a('object');
      site.options.ns.author.should.equal('ibigbug');
    });
  });
});
