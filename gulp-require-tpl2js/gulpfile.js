var gulp = require ('gulp');
var tpl2js = require('./');
var rename = require('gulp-rename');

gulp.task('convert',function () {
    gulp.src('./test.tpl')  
        .pipe(tpl2js())
        .pipe(rename('./test.bak.tpl'))
        .pipe(gulp.dest('./'));
});

