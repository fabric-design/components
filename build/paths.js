const appRoot = 'src/';
const outputRoot = 'dist/';
const outputDocsRoot = 'docs/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.scss',
  output: outputRoot,
  doc: './doc',
  docsOutput: outputDocsRoot,
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
