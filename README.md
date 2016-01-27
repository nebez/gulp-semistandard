#gulp-semistandard
[![Build Status](https://travis-ci.org/nebez/gulp-semistandard.svg)](https://travis-ci.org/nebez/gulp-semistandard)
[![NPM version](https://badge.fury.io/js/gulp-semistandard.png)](http://badge.fury.io/js/gulp-semistandard)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

> [Semi-Standard](https://github.com/Flet/semistandard/) linter for gulp

## Information

<table>
<tr>
<td>Package</td><td>gulp-semistandard</td>
</tr>
<tr>
<td>Description</td>
<td>Check JavaScript code against the semistandard coding style</td>
</tr>
<tr>
<td>Node version</td>
<td>>= 0.9</td>
</tr>
<tr>
<td>gulp version</td>
<td>3.x</td>
</tr>
</table>

## Usage

#### Install

```sh
$ npm install --save-dev gulp-semistandard
```

## Examples

```javascript
// include the required packages.
var gulp = require('gulp'),
  semistandard = require('gulp-semistandard')

gulp.task('semistandard', function () {
  return gulp.src(['./app.js'])
    .pipe(semistandard())
    .pipe(semistandard.reporter('default', {
      breakOnError: true
    }))
})
```

## Reporters

#### Built-in

You can choose a reporter when you call
````javascript
stuff
  .pipe(semistandard())
  .pipe(semistandard.reporter('default', opts))
External
````

You can also use some other custom made reporter
````javascript
var reporter = require(<SOME_REPORTER>);

stuff
  .pipe(semistandard())
  .pipe(semistandard.reporter(reporter, opts))
````
OR -
````javascript
stuff
  .pipe(semistandard())
  .pipe(semistandard.reporter(<REPORTER NAME>, opts))
````
#### Reporter options

##### breakOnError

Type: `boolean`
Default: `false`

Emit gulp error on reported error

##### breakOnWarning

Type: `boolean`
Default: `false`

Emit gulp error on reported warning

##### prefixLogs

Type: `boolean`
Default: `false`

Prefix log messages with the plugin name

## LICENSE [MIT](LICENSE)
