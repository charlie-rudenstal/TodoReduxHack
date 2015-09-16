var gulp = require('gulp');
var babel = require('gulp-babel');
var spawn = require('child_process').spawn;
var node;

gulp.task('server', function() {
	if (node) {
		node.kill();
	}
	node = spawn('node', ['server.js'], {stdio: 'inherit'});
})

gulp.task('build', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', ['build', 'server'], function() {
	gulp.watch(['src/**/*.js', './server.js'], ['build', 'server'])
})

gulp.task('default', ['build', 'server']);