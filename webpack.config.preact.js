var path = require('path');

module.exports = {
  entry: './demo/demo_app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo'),
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
  resolve: {
    alias: {
      react: 'preact',
      'react-dom': 'preact',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 8080,
  },
};
