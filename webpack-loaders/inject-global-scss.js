module.exports = function(source) {
  this.cacheable();
  return `@import 'index.scss';
    ${source}`;
}
