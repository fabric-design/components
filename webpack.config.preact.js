const path = require('path');

module.exports = {
  entry: './demo/demo_app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo')
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {babelrc: true}
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
        loader: 'sass-loader' // compiles Sass to CSS
      }]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 100000
      }
    }]
  },
  resolve: {
    alias: {
      imports: path.resolve(__dirname, 'src/imports.js'),
      react: 'preact',
      'react-dom': 'preact-compat'
    }
  },
  devServer: {
    static: path.join(__dirname, 'demo'),
    compress: true,
    port: 8080
  }
};

