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
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('build-es2015-for-docs', () => {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.docs())))
    .pipe(gulp.dest(`${paths.output}/docs/es2015`));
});

gulp.task('build-api-docs', () => {
  const files = glob.sync(`${paths.output}/docs/es2015/**/**/*.js`); // glob allows pattern matching for filenames
  const createdMdDocs = files
  .filter(filename => {
    const name = filename.match(/((\w)+(\-)*(\w))+(?=.js)/g)[0];
    return name !== "imports";
  })
  .map(filename => {
    const splittedName = filename.split("/");
    const filenameWithoutExt = filename.match(/((\w)+(\-)*(\w))+(?=.js)/g)[0];
    return {
      file: filenameWithoutExt,
      folder: filenameWithoutExt !== 'index' ? splittedName[splittedName.length - 2] : '',  // get the parent folder of file
      markdown: jsdoc2md.renderSync({files: filename})
    };
  });
  const writeMdFiles = createdMdDocs.map(mdDoc => {
    const folder = `${paths.output}docs/${mdDoc.folder}`;
    const filePath = mdDoc.file !== 'index' ? `${paths.output}docs/${mdDoc.folder}/${mdDoc.file}.md` : `${paths.output}docs/${mdDoc.file}.md`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    return fs.writeFile(filePath, mdDoc.markdown);
  });
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

// deletes all files in the output path
gulp.task('clean-docs', function() {
  return gulp.src([`${paths.output}/docs/`])
    .pipe(vinylPaths(del));
});

gulp.task('generate-docs', done => runSequence('clean-docs', 'build-es2015-for-docs', 'build-api-docs', 'delete-es2015-for-docs', done));

