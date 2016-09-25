'use strict';

var through2 = require('through2');
var semistandard = require('semistandard');
var gutil = require('gulp-util');
var PLUGIN_NAME = require('./package.json').name;
var defaultReporter = require('./reporters/stylish');

function gulpSemiStandard (opts) {
  opts = opts || {};

  function processFile (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
    }

    semistandard.lintText(String(file.contents), opts, function (err, data) {
      if (err) {
        return cb(err);
      }
      file.standard = data;
      cb(null, file);
    });
  }

  return through2.obj(processFile);
}

gulpSemiStandard.reporter = function (reporter, opts) {
  // Load default reporter
  if (reporter === 'default') return defaultReporter(opts);

  // Load reporter from function
  if (typeof reporter === 'function') return reporter(opts);

  // load built-in reporters
  if (typeof reporter === 'string') {
    try {
      return require('gulp-semistandard/reporters/' + reporter)(opts);
    } catch (err) {}
  }

  // load full-path or module reporters
  if (typeof reporter === 'string') {
    try {
      return require(reporter)(opts);
    } catch (err) {}
  }
};

module.exports = gulpSemiStandard;
