/* globals it, describe */

var fs = require('fs');
var should = require('should');
var gutil = require('gulp-util');
var standard = require('../');

require('mocha');

var testEqual = fs.readFileSync('test/fixtures/test-eq.js');
var testSemicolon = fs.readFileSync('test/fixtures/test-semicolon.js');

describe('gulp-standard', function () {
  it('should lint files', function (done) {
    var stream = standard();
    var fakeFile = new gutil.File({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/test-eq.js',
      contents: testEqual
    });
    stream.once('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.standard);
      should(newFile.standard.results[0].messages[0].message).equal("Expected '===' and instead saw '=='.");
      done();
    });
    stream.write(fakeFile);
    stream.end();
  });

  it('should expect semicolons', function (done) {
    var stream = standard();
    var fakeFile = new gutil.File({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/test-semicolon.js',
      contents: testSemicolon
    });
    stream.once('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.standard);
      should(newFile.standard.results[0].messages[0].message).equal('Missing semicolon.');
      done();
    });
    stream.write(fakeFile);
    stream.end();
  });
});
