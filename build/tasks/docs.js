const gulp = require('gulp');
const runSequence = require('run-sequence');
const to5 = require('gulp-babel');
const paths = require('../paths');
const compilerOptions = require('../babel-options');
const assign = Object.assign || require('object.assign');
const fs = require('fs-then-native');
const glob = require('glob');
const jsdoc2md = require('jsdoc-to-markdown');
const rimraf = require('rimraf');

gulp.task('build-es2015-for-docs', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.docs())))
    .pipe(gulp.dest(`${paths.output}/docs/es2015`));
});

gulp.task('build-api-docs', () => {
  const files = glob.sync(`${paths.output}/docs/es2015/**/**/*.js`); // glob allows pattern matching for filenames
  const createdMdDocs = files.map(filename => {
    return {
      file: filename.match(/((\w)+(\-)*(\w))+(?=.js)/g)[0],
      markdown: jsdoc2md.renderSync({files: filename})
    };
  });
  const writeMdFiles = createdMdDocs.map(mdDoc => fs.writeFile(`${paths.output}/docs/${mdDoc.file}.md`, mdDoc.markdown));
  return Promise.all(writeMdFiles);
});

gulp.task('delete-es2015-for-docs', () => {
  return new Promise(
    (resolve, reject) => {
      rimraf(`${paths.output}/docs/es2015`, err => {
        if (err) reject(err);
        resolve();
      });
    });
});

gulp.task('generate-docs', done => runSequence('clean', 'build-es2015-for-docs', 'build-api-docs', 'delete-es2015-for-docs', done));

