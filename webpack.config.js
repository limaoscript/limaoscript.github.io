// webpack v4
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map', //代码错误检测追踪
  devServer: {
    contentBase: './dist', //实时重新加载
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/' //express webpack-dev-middleware publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
  },
   module: {
       rules: [
           {
             test: /\.css$/,
               use: ['style-loader', 'css-loader']
         }
       ]
 },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
    mode: "production"
};