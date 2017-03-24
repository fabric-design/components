const path = require('path');

module.exports = {
  entry: './demo/demo_app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo')
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
      test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)(\?.*$|$)/,
      loader: 'file-loader?name=[path][name].[ext]'
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 8080
  }
};
