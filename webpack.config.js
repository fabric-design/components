var path = require('path');

module.exports = {
  entry: './preact-components/index.js',
  output: {
    filename: 'preact-bundle.js',
    path: path.resolve(__dirname, 'lib')
  },
  module: {
	loaders: [
		{
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		loader: 'babel-loader',
		query: {
			presets: ['es2015']
		}
		}
	]
  }
};