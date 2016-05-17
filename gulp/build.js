var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var path = require('path');
var clean = require('gulp-clean');
var folders = require('gulp-folders');
var inject = require('gulp-inject');
var flatmap = require('gulp-flatmap');
var sass = require('gulp-sass');
var purify = require('gulp-purifycss');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var uglifyjs = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
const babel = require('gulp-babel');

var utils = require('./utils.js');
var config = require('./config.js').default;

gulp.task('build', ['inject']);

gulp.task('createDistFiles', ['clean'], folders(config.webcomponentsFolder, function(folder){
  return gulp.src(config.templateFile)
  .pipe(rename(folder + '.html'))
  .pipe(gulp.dest(config.dest));
}));

gulp.task('inject', ['scripts', 'sass', 'createDistFiles'], function() {
    var emptyComponents = config.dest + '/*.html';

    function injectScripts(folder) {
      return inject(gulp.src(folder + '/*.js'), {
          starttag: '/* inject:js */',
          endtag: '/* endinject */',
          transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString('utf8')
          }
        });
    }

    function injectStyles(folder) {
      return inject(gulp.src(folder + '/*.css'), {
          starttag: '/* inject:styles */',
          endtag: '/* endinject */',
          transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString('utf8')
          }
        });
    }

    function injectHtml(folder) {
      return inject(gulp.src(folder + '/*.html'), {
          starttag: '<!-- inject:html -->',
          transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString('utf8')
          }
        });
    }

    return gulp.src(emptyComponents)
      .pipe(flatmap(function(stream, file){
        var componentName = utils.getComponentName(file);
        return stream
        .pipe(injectHtml(config.webcomponentsFolder + '/' + componentName))
        .pipe(injectStyles(config.temp + '/' + componentName))
        .pipe(injectScripts(config.temp + '/' + componentName))
        .pipe(gulp.dest(config.dest));
      }));
});

gulp.task('sass', function () {
  return gulp.src(config.webcomponentsFolder + '/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(flatmap(function(stream, file){
    var componentName = utils.getComponentName(file);
    return stream
    .pipe(purify([config.webcomponentsFolder + '/' + componentName + '/*.js', config.webcomponentsFolder + '/' + componentName + '/*.html']));
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gutil.env.type === 'production' ? cssnano() : gutil.noop())
  .pipe(uglifycss())
  .pipe(gulp.dest(config.temp));
});

gulp.task('scripts', function () {
  return gulp.src(config.webcomponentsFolder + '/**/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglifyjs().on('error', gutil.log))
  .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function () {
	return gulp.src(config.dest, {read: false})
		.pipe(clean());
});