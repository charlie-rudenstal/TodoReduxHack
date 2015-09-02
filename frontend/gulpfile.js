var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var spawn = require('child_process').spawn;
var livereload = require('gulp-livereload');
var injectReload = require('gulp-inject-reload');
var node, isLiveReload = false;

/**
 * Build
 */
gulp.task('browserify', function() {
	return browserify('./src/js/app.js')
		.transform(babelify)
		.bundle()
		.on('error', handleError)
		.pipe(source('client.bundle.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(gulpif(isLiveReload, livereload()));
});

gulp.task('less', function() {
	return gulp.src('src/less/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulpif(isLiveReload, livereload()));
});

gulp.task('index', function() {
	return index();
});

function index() {
	return gulp.src('./src/index.html')
		.pipe(gulpif(isLiveReload, injectReload()))
		.pipe(gulp.dest('./dist'))
		.pipe(gulpif(isLiveReload, livereload()));
}

function handleError(err) {
	console.log('Error', err);
	this.emit('end');
}

gulp.task('build', ['index', 'browserify', 'less']);

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
	gulp.watch(['src/index.html'], ['index']);
	gulp.watch(['src/js/**/*.js'], ['browserify']);
	gulp.watch(['src/less/**/*.less'], ['less']);
	gulp.watch(['./server.js'], ['server']);
});

gulp.task('live', ['watch'], function() {
	isLiveReload = true;
	livereload.listen();
	return index();
});

gulp.task('default', ['build', 'server']);
