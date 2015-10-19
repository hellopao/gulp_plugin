"use strict";

var gulp = require('gulp');
var rev = require('./index');

gulp.task('default',function(){
	return gulp.src('./test/**/*.*')
		.pipe(rev())
		.pipe(gulp.dest('./dest/'))
})