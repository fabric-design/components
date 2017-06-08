const gulp = require('gulp');
const paths = require('../paths');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const glob = require('glob');
const docjs = require('documentation');
const REGEX_FILE_NAME = /((\w)+(-)*(\w))+(?=.js)/g;

// runs eslint on all .js files
gulp.task('eslint', () =>
  gulp.src([paths.source, paths.tests])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

gulp.task('doc-lint', () =>
  Promise.resolve(glob.sync(paths.source))
    // Filter file names to match tag name pattern
    .then(fileNames => fileNames.filter(fileName => {
      const name = fileName.match(REGEX_FILE_NAME)[0];
      return name !== 'imports';
    }))
    // Generate markdown for each file
    .then(fileNames => fileNames.map(fileName =>
      docjs.lint(fileName, {}).then(lintOutput => {
        console.log(lintOutput);
      })
    ))
    .then(promises => Promise.all(promises))
);

gulp.task('lint', done =>
  runSequence(['eslint', 'doc-lint'], done)
);
