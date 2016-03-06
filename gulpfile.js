'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');
var wiredep = require('wiredep').stream;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var inject = require('gulp-inject');

gulp.task('server',function(){
	connect.server({
		root: './app',
		port: 3000,
		livereload: true,
		middleware: function(){
			return [historyApiFallback({})];
		}
	});
});

gulp.task('html',function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload());
});

gulp.task('css',function(){
	gulp.src('./app/stylesheets/**/*.css')
	.pipe(connect.reload());
});

gulp.task('jshint',function(){
	gulp.src(['./app/scripts/**/*.js','./gulpfile.js'])
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter(stylish));
});

gulp.task('bower', function(){
	gulp.src('./app/index.html')
    .pipe(wiredep({
    	directory: './app/lib'
    }))
	.pipe(gulp.dest('./app'));
});

gulp.task('inject', function () {
	var sources = gulp.src(['./app/scripts/**/*.js','./app/stylesheets/*.css']);
	gulp.src('index.html', {cwd: './app'})
	.pipe(inject(sources, {
		read: false,
		ignorePath: '/app'
	}))
	.pipe(gulp.dest('./app'));
});

gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'],['html']);
	gulp.watch(['./app/stylesheets/**/*.css'],['css']);
	gulp.watch(['./bower.json'],['bower']);
	gulp.watch(['./gulpfile.js','./app/scripts/**/*.js'], ['inject','jshint']);
});

gulp.task('default', ['server', 'bower', 'inject','watch']);

