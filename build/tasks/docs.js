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
  gulp.src([`${paths.docsOutput}`])
    .pipe(vinylPaths(del))
);

gulp.task('create-docs-folder', () => {
  const folder = paths.docsOutput;
  return !fs.existsSync(folder) ? fs.mkdirSync(folder) : false;
});

gulp.task('build-jsdoc-to-md', () => {
  const files = glob.sync(paths.source); // glob allows pattern matching for filenames
  const regexFileName = /((\w)+(\-)*(\w))+(?=.js)/g;
  const createdMdDocs = [];
  files
  .filter(filename => {
    const name = filename.match(regexFileName)[0];
    return name !== 'imports';
  })
  .map(filename => {
    const splittedName = filename.split('/');
    const filenameWithoutExt = filename.match(regexFileName)[0];
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
    const rootApiFolder = paths.docsOutput.concat('/api/');
    const componentFolder = `${rootApiFolder}${mdDoc.folder}`;
    const filePath = mdDoc.file !== 'index' ? `${componentFolder}/${mdDoc.file}.md` : `${rootApiFolder}${mdDoc.file}.md`;
    if (!fs.existsSync(componentFolder)) {
      fs.mkdirSync(componentFolder);
    }
    return fs.writeFile(filePath, mdDoc.markdown);
  });
  return Promise.all(writeMdFiles);
});

gulp.task('generate-docs', done => runSequence('clean-docs', 'create-docs-folder', 'build-jsdoc-to-md', done));
