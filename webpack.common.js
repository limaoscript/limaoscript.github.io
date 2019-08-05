const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    carousel1: './src/project/carousel/carousel1/index.js',
    carousel2: './src/project/carousel/carousel2/index.js',
    carousel3: './src/project/carousel/carousel3/index.js',
    waterFall: './src/project/waterFall/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|gif|jpg|png|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks:['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'carousel1.html',
      template: 'src/project/carousel/carousel1/index.html',
      chunks:['carousel1'],
    }),
    new HtmlWebpackPlugin({
      filename: 'carousel2.html',
      template: 'src/project/carousel/carousel2/index.html',
      chunks:['carousel2'],
    }),
    new HtmlWebpackPlugin({
      filename: 'carousel3.html',
      template: 'src/project/carousel/carousel3/index.html',
      chunks:['carousel3'],
    }),
    new HtmlWebpackPlugin({
      filename: 'waterFall.html',
      template: 'src/project/waterFall/index.html',
      chunks:['waterFall'],
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  // optimization: {  //https://webpack.js.org/guides/caching/  TODO:: 暂时不用理解不够
  //   moduleIds: 'hashed',
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: { // 抽离第三方插件
  //         test: /[\\/]node_modules[\\/]/,  // 指定是node_modules下的第三方包
  //         name: 'vendors',  // 打包后的文件名，任意命名
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
};