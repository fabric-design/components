const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    'ws-header': './components/ws-header/ws-header.js',
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/components'),
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
        options: {
          includePaths: [
            'node_modules/fabric-scss/'
          ],
        },
      }],
    }],
  },
};
