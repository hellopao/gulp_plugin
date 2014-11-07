var gulp = require('gulp');
var utf8Convert = require('./');

gulp.task('convert',function() {
    gulp.src("./test.txt")
        .pipe(utf8Convert({
            encNotMatchHandle:function (file) {
                //send mail
                console.log(file + " 编码不正确，请事主速速认领并修改！");
            }
        }))
        .pipe(gulp.dest('./'));
})
