// webpack v4
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
// const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin(),
  //   new HtmlWebpackPlugin({template: './src/index.html'})
  // ]
};