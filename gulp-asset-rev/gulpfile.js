var gulp = require('gulp');
var assetRev = require('./index.js');

gulp.task('rev',['revCss'],function() {
    gulp.src("./test/test.html")
        .pipe(assetRev())
        .pipe(gulp.dest('./dest'));
});

gulp.task('revCss',function () {
    return gulp.src('./test/styles/test.css')
        .pipe(assetRev())
        .pipe(gulp.dest('./dest/styles/'))
});

gulp.task('default',['rev']);
