var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var spawn = require('child_process').spawn;
var node;

/**
 * Build
 */
gulp.task('browserify', function() {
	return browserify('./src/js/app.js')
		.transform(babelify)
		.bundle()
		.pipe(source('client.bundle.js'))
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('less', function() {
	return gulp.src('src/less/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['browserify', 'less']);

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
