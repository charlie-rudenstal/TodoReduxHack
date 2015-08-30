var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var spawn = require('child_process').spawn;
var node;

/**
 * Build
 */
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('less', function() {
	return gulp.src('src/less/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['js', 'less']);

/**
 * Server and Watch
 */
gulp.task('server', function() {
	if (node) {
		node.kill();
	}
	node = spawn('node', ['server.js'], {stdio: 'inherit'});
});

gulp.task('watch', ['build', 'server'], function() {
	gulp.watch(['src/**/*.js', './server.js'], ['build', 'server'])
});

gulp.task('default', ['build', 'server']);
