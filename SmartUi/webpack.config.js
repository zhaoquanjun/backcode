var path = require('path')
var appPath = {
  './dist/index.js': path.resolve(__dirname, './src/design.js'),
  '../DesignerApp/Designer.App/wwwroot/js/cm-smartui.js': path.resolve(
    __dirname,
    './src/design.js'
  ),
  '../AppPrev/AppPreview/wwwroot/js/cm-smartui.js': path.resolve(
    __dirname,
    './src/prev.js'
  ),
  '../AppPub/AppPublish/wwwroot/js/cm-smartui.js': path.resolve(
    __dirname,
    './src/pub.js'
  )
}

// var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var buildPath = path.resolve(__dirname, '../DesignerApp/Designer.App/wwwroot/js');
module.exports = {
  entry: appPath, //整个页面的入口文件
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name]', //输出的文件名称
    library: 'SmartUi',
    libraryTarget: 'umd'
  },
  devServer: {
    disableHostCheck: true,
    port: 8080
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
      // {
      //     test: /\.(sa|sc|c)ss$/,
      //     use: [{
      //             loader: MiniCssExtractPlugin.loader,
      //             options: {
      //                 hmr: process.env.NODE_ENV === 'development'
      //             },
      //         },
      //         'css-loader',
      //         'sass-loader',
      //         {
      //             loader: 'postcss-loader',
      //             options: {
      //                 ident: 'postcss',
      //                 sourceMap: false,
      //                 plugins: () => [
      //                     require('autoprefixer')({
      //                         overrideBrowserslist: [
      //                             "> 1%",
      //                             "last 2 versions",
      //                             "not ie <= 8"
      //                         ]
      //                     }) // 添加前缀
      //                 ]
      //             }
      //         }
      //     ],
      // }
    ]
  },
  // plugins: [
  //     new MiniCssExtractPlugin({
  //         // Options similar to the same options in webpackOptions.output
  //         // all options are optional
  //         filename: '../DesignerApp/Designer.App/wwwroot/css/smart-ui.min.css',
  //         chunkFilename: '[id].css',
  //         ignoreOrder: false, // Enable to remove warnings about conflicting order
  //     })
  // ],
  externals: {
    BMap: 'BMap'
  }
}
