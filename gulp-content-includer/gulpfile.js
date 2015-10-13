var gulp = require('gulp');
var contentIncluder = require('./');
var rename = require('gulp-rename');

gulp.task('concat',function() {
    gulp.src("./content.html")
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g,
            deepConcat: true,
            baseSrc: './'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});
