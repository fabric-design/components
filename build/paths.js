const appRoot = 'src/';
const outputRoot = 'dist/';
const docsOutput = 'docs/';
const testRoot = 'tests/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  tests:  testRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.scss',
  output: outputRoot,
  docsOutput: docsOutput.concat('api/'),
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
