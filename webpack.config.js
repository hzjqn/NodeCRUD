var path = require('path')

var buildPath = path.resolve(__dirname, 'dist')

var config = {
  entry: './src/index.js',
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    contentBase: buildPath
  }
}

module.exports = config
