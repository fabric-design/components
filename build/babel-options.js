let path = require('path');
let paths = require('./paths');

exports.base = function () {
  return {
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: '',
    moduleRoot: path.resolve('src').replace(/\\/g, '/'),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: [
      ['es2015', {
        modules: false
      }]
    ],
    plugins: [
      ['transform-class-properties', {spec: true}],
      ['transform-react-jsx', {
        pragma: 'React.createElement'
      }]
    ]
  };
};

exports.commonjs = function () {
  let options = exports.base();
  options.plugins.push('transform-es2015-modules-commonjs');
  return options;
};

exports.docs = function () {
  const options = exports.base();
  options.comments = true;
  return options;
};

exports.amd = function () {
  let options = exports.base();
  options.plugins.push('transform-es2015-modules-amd');
  return options;
};

exports.system = function () {
  let options = exports.base();
  options.plugins.push('transform-es2015-modules-systemjs');
  return options;
};

exports.es2015 = function () {
  return exports.base();
};
