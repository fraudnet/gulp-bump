var gutil = require('gulp-util');
var should = require('should');
var bump = require('..');

require('mocha');

describe('gulp-bump: JSON comparison fixtures', function() {

  it('should bump patch version by default', function(done) {
    var fakeFile = new gutil.File({
      contents: new Buffer('{ "version": "0.0.9" }')
    });

    var bumpS = bump();

    bumpS.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      JSON.parse(newFile.contents.toString()).version.should.equal('0.0.10');
      return done();
    });
    bumpS.write(fakeFile);
    bumpS.end();
  });

  it('should bump patch version as default and a key=appversion', function(done) {
    var fakeFile = new gutil.File({
      contents: new Buffer('{ "appversion": "0.0.1" }')
    });

    var bumpS = bump({key: 'appversion'});

    bumpS.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      JSON.parse(newFile.contents.toString()).appversion.should.equal('0.0.2');
      return done();
    });
    bumpS.write(fakeFile);
    bumpS.end();
  });

  it('should ignore invalid type and use type=patch', function(done) {
    var fakeFile = new gutil.File({
      contents: new Buffer('{ "version": "0.0.1" }')
    });

    var bumpS = bump({type: 'invalidType'});

    bumpS.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      JSON.parse(newFile.contents.toString()).version.should.equal('0.0.2');
      return done();
    });

    bumpS.write(fakeFile);
    bumpS.end();
  });

  it('should set the correct version when supplied', function(done) {
    var fakeFile = new gutil.File({
      contents: new Buffer('{ "version": "0.0.1" }')
    });

    var bumpS = bump({version: '0.0.2'});

    bumpS.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      JSON.parse(newFile.contents.toString()).version.should.equal('0.0.2');
      return done();
    });
    bumpS.write(fakeFile);
    bumpS.end();
  });

  it('should set the correct version when supplied even if key did not exist', function(done) {
    var fakeFile = new gutil.File({
      contents: new Buffer('{}')
    });

    var bumpS = bump({version: '0.0.2'});

    bumpS.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      JSON.parse(newFile.contents.toString()).version.should.equal('0.0.2');
      return done();
    });
    bumpS.write(fakeFile);
    bumpS.end();
  });

  it('should bump prerelease version', function(done) {
    var fakeFile = new gutil.File({
      contents: new Buffer('{ "version": "0.0.1-0"}')
    });

    var bumpS = bump({type: 'prerelease'});

    bumpS.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      JSON.parse(newFile.contents.toString()).version.should.equal('0.0.1-1');
      return done();
    });
    bumpS.write(fakeFile);
    bumpS.end();
  });
});
