const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.webpack.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),

    library: 'fabric-components',
    libraryTarget: "umd",
  },
  plugins : [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  externals: {
    'react': 'commonjs react',
    'react-dom' : 'commonjs react-dom',
  },
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
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [
            'node_modules/fabric-scss/'
          ],
          outputStyle : 'compressed',
        },
      }],
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 8080
  }
};
