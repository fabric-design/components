var karma = require('gulp-karma');
var gulp = require('gulp');

gulp.task('test', function () {
	// Be sure to return the stream
	return gulp.src([
			'dist/*.html',
			'tests/**/*.spec.js'
		])
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}))
		.on('error', function (err) {
			// Make sure failed tests cause gulp to exit non-zero
			throw err;
		});
});