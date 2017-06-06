var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');
const glob = require('glob');
const docjs = require('documentation');
const REGEX_FILE_NAME = /((\w)+(-)*(\w))+(?=.js)/g;

// runs eslint on all .js files
gulp.task('lint', function() {
  Promise.resolve(glob.sync(paths.source))
    // Filter file names to match tag name pattern
    .then(fileNames => fileNames.filter(fileName => {
      const name = fileName.match(REGEX_FILE_NAME)[0];
      return name !== 'imports';
    }))
    // Generate markdown for each file
    .then(fileNames => fileNames.forEach(fileName =>
      docjs.lint(fileName, {}).then(lintOutput => {
        console.log(lintOutput);
      })
    ));

  return gulp.src([paths.source, paths.tests])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
