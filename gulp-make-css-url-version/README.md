## gulp-make-css-url-version

a plugin for gulp.js to replace version for images in css files,the version should be file's md5 or time stamp;

## Installation

```bash
npm install gulp-make-css-url-version
```

## Usage

```js
var makeUrlVer = require('gulp-make-css-url-version');

gulp.task('stylesheets', function() {
    gulp.src('css/*.css')
        .pipe(makeUrlVer())
        .pipe(gulp.dest('dist'))
});
```

## Options

useDate :make version with time stamp

```js
var makeUrlVer = require('gulp-make-css-url-version');

gulp.task('stylesheets', function() {
    gulp.src('css/*.css')
        .pipe(makeUrlVer({useDate:true}))
        .pipe(gulp.dest('dist'))
});
```

assetsDir: specify the public directory for correct MD5 calculation in some specific cases

```js
var makeUrlVer = require('gulp-make-css-url-version');

gulp.task('stylesheets', function() {
    gulp.src('css/*.css')
        .pipe(makeUrlVer({
            assetsDir: __dirname + '/public'
        }))
        .pipe(gulp.dest('dist'))
});
```

## Example

### before: index.css

```css
/* loading */
.i-loading{width:32px;height:32px;background:url(../images/loading.gif) no-repeat;}    
```

### after: index.css

```css
/* loading */
.i-loading{width:32px;height:32px;background:url(../images/loading.gif?v=Je0sUcMH0mhJPWdZdpHzXg%3D%3D) no-repeat}

```



