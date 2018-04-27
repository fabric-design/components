const path = require('path');

module.exports = {
  devtool: 'inline-source-map', // just do inline source maps instead of the default
  mode: 'development',
  output: {
    filename: 'bundle.test.js',
    path: path.resolve(__dirname, 'tests')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: { babelrc: true },
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
        loader: 'sass-loader', // compiles Sass to CSS
        options: {
          includePaths: [
            'node_modules/fabric-scss/'
          ],
        },
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
      'react-dom': 'preact-compat'
    }
  }
};
