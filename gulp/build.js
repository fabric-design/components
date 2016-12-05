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
var rev = require('gulp-rev');
var runSequence = require('run-sequence');
const babel = require('gulp-babel');
var replace = require('gulp-replace');
var scopeCss = require("gulp-scope-css");

var utils = require('./utils.js');
var config = require('./config.js').default;

gulp.task('clean', function () {
	return gulp.src([config.dest, config.temp], {read: false})
		.pipe(clean());
});

gulp.task('createDistFiles', folders(config.webcomponentsFolder, function(folder){
  return gulp.src(config.templateFile)
    .pipe(rename(folder + '.html'))
    .pipe(gulp.dest(config.tempTemplates));
}));

gulp.task('sass', function () {
  return gulp.src(config.webcomponentsFolder + '/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(flatmap(function(stream, file){
    var componentName = utils.getComponentName(file);
    return stream
    .pipe(purify([config.webcomponentsFolder + '/' + componentName + '/*.js', config.webcomponentsFolder + '/' + componentName + '/*.html']));
  }))
      .pipe(flatmap(function(stream, file){
        var componentName = utils.getComponentName(file);
        return stream
            .pipe(scopeCss('.' + componentName));
      }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gutil.env.type === 'production' ? cssnano() : gutil.noop())
  .pipe(gutil.env.type === 'production' ? uglifycss() : gutil.noop())
  .pipe(gulp.dest(config.temp));
});

gulp.task('sass:styleguide', function () {
  return gulp.src(config.styleguide)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(rename('styleguide.css'))
      .pipe(gulp.dest(config.demo));
});

gulp.task('scripts', function () {
  return gulp.src([
    config.shadowDomHack,
    config.webcomponentsFolder + '/**/*.js'
  ])
  .pipe(babel({
    presets: ['es2015', 'stage-1']
  }))
  .pipe(gutil.env.type === 'production' ? uglifyjs().on('error', gutil.log) : gutil.noop())
  .pipe(gulp.dest(config.temp));
});

gulp.task('prepareFiles', function(done) {
  runSequence('createDistFiles', ['scripts', 'sass'], done);
})

gulp.task('inject', ['prepareFiles'], function() {
  function injectScripts(folder) {
    return inject(gulp.src([
        folder + '/*.js',
        config.shadowDomHack
      ]), {
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
    return inject(gulp.src([folder + '/*.html', '!' + folder + '/*.global.html']), {
      starttag: '<!-- inject:html -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    });
  }

  function injectGlobalHtml(folder) {
    return inject(gulp.src(folder + '/*.global.html'), {
      starttag: '<!-- inject:global -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    });
  }

  return gulp.src(config.tempTemplates + '/*.html')
    .pipe(flatmap(function(stream, file){
      var componentName = utils.getComponentName(file);
      return stream
        .pipe(replace('{{component-class}}', componentName))
        .pipe(injectGlobalHtml(config.webcomponentsFolder + '/' + componentName))
        .pipe(injectHtml(config.webcomponentsFolder + '/' + componentName))
        .pipe(injectStyles(config.temp + '/' + componentName))
        .pipe(injectScripts(config.temp + '/' + componentName))
        .pipe(gulp.dest(config.dest));
    }));
});

gulp.task('build', function(callback) {
  runSequence('clean', 'inject', callback);
});
