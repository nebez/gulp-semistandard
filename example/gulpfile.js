var gulp = require('gulp');
var standard = require('../');

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }));
});

gulp.task('default', ['standard']);
