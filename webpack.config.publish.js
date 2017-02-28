const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'components.js',
    path: path.resolve(__dirname, 'dist/components'),
    libraryTarget: 'umd',
    library: 'wholesale-components',
    umdNamedDefine: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] },
      }],
      exclude: [/node_modules/],
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
      }],
    }],
  },
};
