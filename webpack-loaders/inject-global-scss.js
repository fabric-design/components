let globalsImported = false;

module.exports = function(source) {
  this.cacheable();
  if (!globalsImported) {
    globalsImported = true;

    return `@import 'index-webpack.scss';
    ${source}`;
  }

  return `@import 'index-variables.scss';
    ${source}`;
}
