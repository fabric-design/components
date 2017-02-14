var path = require('path');

module.exports = {
  entry: './preact-components/index.js',
  output: {
    filename: 'preact-bundle.js',
    path: path.resolve(__dirname, 'lib')
  },
	module: {
		rules: [{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] },
				}],
				exclude: [/node_modules/]
			},
			{
				test: /\.scss$/,
				use: [{
						loader: "style-loader" // creates style nodes from JS strings
				}, {
						loader: "css-loader" // translates CSS into CommonJS
				}, {
						loader: "sass-loader" // compiles Sass to CSS
				}]
		}]
	},
	resolve: {
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	}
};