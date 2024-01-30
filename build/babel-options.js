const path = require('path');
const paths = require('./paths');

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
      '@babel/preset-react'
    ],
    plugins: [
      ['@babel/plugin-transform-class-properties', {spec: true}]
    ]
  };
};

exports.commonjs = function () {
  let options = exports.base();
  options.plugins.push('@babel/plugin-transform-modules-commonjs');
  return options;
};

exports.docs = function () {
  const options = exports.base();
  options.comments = true;
  return options;
};

exports.amd = function () {
  let options = exports.base();
  options.plugins.push('@babel/plugin-transform-modules-amd');
  return options;
};

exports.system = function () {
  let options = exports.base();
  options.plugins.push('@babel/plugin-transform-modules-systemjs');
  return options;
};

exports.es2015 = function () {
  return exports.base();
};
