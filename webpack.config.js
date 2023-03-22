const webpack = require('webpack');
const path = require('path');

const PROD = process.env.PRODUCTION || false;

module.exports = {
  mode: PROD ? 'production' : 'development',

  entry: './webpack-loaders/index.js',

  output: {
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'fabricComponents.js',
    library: 'fabric-components',
    libraryTarget: 'umd',
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /([\w-]+)\/\1.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: {babelrc: true}
              },
            ],
            exclude: [/node_modules/]
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: {babelrc: true}
              }
            ],
            exclude: [/node_modules/]
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  exclude: 'node_modules/',
                  includePaths: [
                    'node_modules/fabric-scss/'
                  ]
                },
              },
              {
                loader: path.resolve('webpack-loaders/inject-global-scss'),
              },
            ],
          },
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 8080
  }
};
