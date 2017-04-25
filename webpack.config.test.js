const path = require('path');
const webpack = require('webpack');
module.exports = {
  devtool: 'inline-source-map', //just do inline source maps instead of the default
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: require(path.resolve(__dirname, 'babelrc.preact.js'))
      }],
      exclude: [/node_modules/]
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'sass-loader?sourceMap' // compiles Sass to CSS
      }]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  externals: {
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },
  resolve: {
    alias: {
      imports: path.resolve(__dirname, 'src/imports.js'),
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-dom/lib/ReactTestUtils': 'react-dom'
    }
  }
};
