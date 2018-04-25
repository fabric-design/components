const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const scss = this.resourcePath.split('/').slice(-1)[0].replace('.js', '');
  const scssPath = path.resolve(`src/${scss}/${scss}.scss`);

  if (fs.existsSync(scssPath)) {
    return `
      require('./${scss}.scss');
      ${source}`;
  }

  return source;
}
