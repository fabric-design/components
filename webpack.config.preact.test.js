const path = require('path');

module.exports = {
  devtool: 'inline-source-map', // just do inline source maps instead of the default
  output: {
    filename: 'bundle.test.js',
    path: path.resolve(__dirname, 'tests')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: require(path.resolve(__dirname, 'babelrc.js')) // eslint-disable-line
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
  resolve: {
    alias: {
      imports: path.resolve(__dirname, 'src/imports.js'),
      react: 'preact',
      'react-dom': 'preact'
    }
  }
};
