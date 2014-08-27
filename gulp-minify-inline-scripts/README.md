###gulp-minify-inline-scripts

a plugin for gulp.js to minify inline scripts in html files

###Installation

npm install gulp-minify-inline-scripts

###Usage

<pre>
var minifyInline = require('gulp-minify-inline-scripts');

gulp.task('minify', function() {
  gulp.src('html/*.html')
    .pipe(minifyInline())
    .pipe(gulp.dest('dist'))
});
</pre>
