var cache = require('../lib/tools/cache');
var fs = require('fs');
require('should');

describe('cache', function () {
  it('can init', function () {
    fs.existsSync('./.cache').should.be.true;
  });

  it('can set', function () {
    cache.set('./tests/data/conf.json');
    fs.existsSync('./.cache/tests/data/conf.json').should.be.true;
  });

  it('can get', function () {
    cache.get('./tests/data/conf.json').should.include('tests/data/conf.json');
  });

  it('can destroy', function () {
    cache.destroy();
    fs.existsSync('./.cache').should.be.false;
  });
});
