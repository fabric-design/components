const path = require('path');
const testBase = require('./webpack.config.test-base');

module.exports = Object.assign({}, testBase, {
  resolve: {
    alias: {
      imports: path.resolve(__dirname, 'src/imports.js'),
      react: 'preact',
      'react-dom': 'preact-compat'
    }
  }
});
