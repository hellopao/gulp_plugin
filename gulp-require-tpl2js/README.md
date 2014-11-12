###gulp-require-tpl2js

convert tpl files content to js for requirejs

###Installation

npm install gulp-require-tpl2js

###Usage

<pre>
var gulp = require('gulp');
var tpl2js = require('gulp-require-tpl2js')

gulp.task('convert',function() {
    gulp.src("./test.tpl")
        .pipe(tpl2js())
        .pipe(gulp.dest('./'));
});
</pre>

