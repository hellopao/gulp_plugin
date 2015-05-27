###gulp-content-includer

a plugin for gulp.js to include files 

###Installation

npm install gulp-utf8-convert

###Usage

<pre>
    var gulp = require('gulp');
    var contentInclude = require('gulp-content-includer');

    gulp.task('concat',function() {
        gulp.src("./content.html")
            .pipe(contentInclude({
                includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
            }))
            .pipe(gulp.dest('./'));
    });
</pre>

