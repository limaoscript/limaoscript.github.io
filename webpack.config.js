// webpack v4
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
// const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //       plugins: ['@babel/transform-runtime']
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            'file-loader'
          ]
      },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
           use: [
             'xml-loader'
           ]
       }
    ]
  }
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin(),
  //   new HtmlWebpackPlugin({template: './src/index.html'})
  // ]
};