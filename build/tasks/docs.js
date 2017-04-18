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
  const folderNamesSet = new Set();
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
      const folderName = filenameWithoutExt !== 'index' ? splittedName[splittedName.length - 2] : '/';
      folderNamesSet.add(folderName);
      createdMdDocs.push({
        file: filenameWithoutExt,
        folder: folderName,  // get the parent folder of file
        markdown: output
      });
    });
  });
  // Reduce Array to (unique) Folder values ✅
  // iterate over folders ✅
  // for each folder get all elements in createdMdDocs ✅
  // Write "#Foldername"✅
  // concat the markdowns ✅
  // writeFile(foldername.md)
  // How to handle index.md ??

  const createMdFiles = Array.from(folderNamesSet.values()).map(folder => {
    const rootApiFolder = paths.docsOutput.concat('api/');
    const componentFolder = folder.length > 1 ? `${rootApiFolder}${folder}/` : rootApiFolder;
    const filePath = folder.length > 1 ? `${componentFolder}${folder}.md` : `${rootApiFolder}index.md`;
    // get all components in a folder
    const components = createdMdDocs.filter(entry => entry.folder === folder);
/*    const getComponentName = (string) => {
      const firstLetter = string.charAt(0).toUpperCase();
      const fourthLetter = string.charAt(4).toUpperCase();
      return `${firstLetter}${string.substring(1,2)}${fourthLetter}${string.substring(5)}`;
    };*/
    const rootMarkdown = `#${folder.toUpperCase()}\n`;
    const markdown = rootMarkdown.concat(components.reduce((prev, next) => next.markdown.concat(prev), ''));
    if (!fs.existsSync(componentFolder)) {
      fs.mkdirSync(componentFolder);
    }
    return fs.writeFile(filePath, markdown);
  });
  return Promise.all(createMdFiles);
});



gulp.task('generate-docs', done => runSequence('clean-docs', 'create-docs-folder', 'build-jsdoc-to-md', done));
