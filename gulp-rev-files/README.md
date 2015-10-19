## gulp-rev-flies

a plugin for gulp.js to replace file's name by adding content hash

## Installation

```bash
npm install gulp-rev-flies
```

## Usage

```js
var gulp = require('gulp');
var rev = require('gulp-rev-flies');

gulp.task('rev',function() {
    gulp.src("./test/test.html")
        .pipe(rev())
        .pipe(gulp.dest('./'));
});
```

## Options

### hashLen: length of hash version string
Type: `Number` default: 7

### verConnecter: version connect char
Type: `String` default: '-'

## Example

```js

var gulp = require('gulp');
var rev = require('./index');

gulp.task('default',function(){
	return gulp.src('./test/**/*.*')
		.pipe(rev())
		.pipe(gulp.dest('./dest/'))
})
```
