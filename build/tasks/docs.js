const gulp = require('gulp');
const runSequence = require('run-sequence');
const paths = require('../paths');
const fs = require('fs-then-native');
const glob = require('glob');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const docjs = require('documentation');

// deletes all files in the output path
gulp.task('clean-docs', () =>
  gulp.src([`${paths.output}/docs/`])
    .pipe(vinylPaths(del))
);

gulp.task('build-jsdoc-to-md', () => {
  const files = glob.sync(paths.source); // glob allows pattern matching for filenames
  const createdMdDocs = [];
  files
  .filter(filename => {
    const name = filename.match(/((\w)+(\-)*(\w))+(?=.js)/g)[0];
    return name !== 'imports';
  })
  .map(filename => {
    const splittedName = filename.split('/');
    const filenameWithoutExt = filename.match(/((\w)+(\-)*(\w))+(?=.js)/g)[0];
    const jsDocObj = docjs.buildSync([filename], {shallow: true});
    return docjs.formats.md(jsDocObj, {}, (err, output) => {
     createdMdDocs.push({
        file: filenameWithoutExt,
        folder: filenameWithoutExt !== 'index' ? splittedName[splittedName.length - 2] : '',  // get the parent folder of file
        markdown: output
      });
    });
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

gulp.task('generate-docs', done => runSequence('clean-docs', 'build-jsdoc-to-md', done));
