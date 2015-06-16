'use strict';

var path = require('path'),
  through2 = require('through2'),
  gutil = require('gulp-util'),
  colors = require('colors/safe'),
  logSymbols = require('log-symbols'),
  appRoot = require('app-root-path'),
  PLUGIN_NAME = require('../package.json').name;

function Stylish (options) {
  // Default options
  var opts = {
      breakOnError: false,
      breakOnWarning: false
    },
    totalErrorCount = 0,
    totalWarningCount = 0;

  // Extend and override default options with the ones user has set
  for (var attr in options) { opts[attr] = options[attr]; }

  // File specific reporter
  function reportFile (filepath, data) {
    var lines = [];

    // Filename
    lines.push(colors.white.bold.underline(path.relative(appRoot.path, filepath)));

    // Loop file specific error/warning messages
    data.results.forEach(function (file) {
      file.messages.forEach(function (msg) {
        var line = colors.grey('  line ' + msg.line + '  col ' + msg.column) + '\t  ' + colors.cyan(msg.message);
        lines.push(line);
      });
    });

    // Error/Warning count
    lines.push('');
    lines.push('  ' + logSymbols.error + ' ' + colors.red(data.errorCount + ' error' + (data.errorCount !== 1 ? 's' : '')));
    lines.push('  ' + logSymbols.warning + ' ' + colors.yellow(data.warningCount + ' warning' + (data.warningCount !== 1 ? 's' : '')));

    return lines.join('\n') + '\n';
  }

  // Reporter footer
  function reportFooter () {
    if (totalErrorCount === 0 && totalWarningCount === 0) {
      // Success!
    } else {
      console.log(logSymbols.error + colors.red(' ' + totalErrorCount + ' errors'));
      console.log(logSymbols.warning + colors.yellow(' ' + totalWarningCount + ' warnings') + '\n');
    }
  }

  return through2.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    // Report file specific stuff only when there are some errors/warnings
    if (file.standard && (file.standard.errorCount || file.standard.warningCount)) {
      totalErrorCount += file.standard.errorCount;
      totalWarningCount += file.standard.warningCount;

      console.log(reportFile(file.path, file.standard));
    }

    cb();
  })
    .on('end', function () {
      reportFooter();

      // If user wants gulp to break execution on reported errors or warnings
      if (totalErrorCount && options.breakOnError) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Linter errors occurred!'));
      }
      if (totalErrorCount && options.breakOnWarning) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Linter warnings occurred!'));
      }
    });
}

module.exports = Stylish;
