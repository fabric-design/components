const appRoot = 'src/';
const outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.scss',
  output: outputRoot,
  doc: './doc',
  docsOutput: outputRoot.concat('docs/api/'),
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
