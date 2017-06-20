const gulp = require('gulp');
const runSequence = require('run-sequence');
const paths = require('../paths');
const fs = require('fs-then-native');
const glob = require('glob');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const docjs = require('documentation');
const REGEX_FILE_NAME = /((\w)+(-)*(\w))+(?=.js)/g;

function createDocForFile(filename) {
  const splittedName = filename.split('/');
  const filenameWithoutExt = filename.match(REGEX_FILE_NAME)[0];

  return docjs.build([filename], {shallow: true})
    .then(result => docjs.formats.md(result, {}))
    .then(output => ({
      file: filenameWithoutExt,
      // get the parent folder of file
      folder: filenameWithoutExt !== 'index' ? splittedName[splittedName.length - 2] : 'index',
      markdown: output
    }));
}

// deletes all files in the output path
gulp.task('clean-docs', () =>
  gulp.src([`${paths.apiDoc}`])
    .pipe(vinylPaths(del))
);

gulp.task('build-jsdoc-to-md', done => {
  Promise.resolve(glob.sync(paths.source))
    // Filter file names to match tag name pattern
    .then(fileNames => fileNames.filter(fileName => {
      const name = fileName.match(REGEX_FILE_NAME)[0];
      return name !== 'imports' && name !== 'index';
    }))
    // Generate markdown for each file
    .then(fileNames =>
      Promise.all(fileNames.map(createDocForFile))
    )
    // Group the markdown docs by there folder
    .then(docs => docs.reduce((groups, doc) => {
      groups[doc.folder] = groups[doc.folder] || [];
      groups[doc.folder].push(doc);
      return groups;
    }, {}))
    // Create markdown files for each folder
    .then(groups => Object.keys(groups).forEach(folderName => {
      const group = groups[folderName];
      const fileName = `${paths.apiDoc}/${folderName}.md`;
      const normalize = doc => doc.markdown.replace(/<!--.*?-->\n*/g, '');
      const content = `# ${folderName}\n${group.map(normalize).join('')}`;
      if (!fs.existsSync(paths.apiDoc)) {
        fs.mkdirSync(paths.apiDoc);
      }
      fs.writeFileSync(fileName, content);
    }))
    .then(done);
});

gulp.task('generate-docs', done => runSequence('clean-docs', 'build-jsdoc-to-md', done));
