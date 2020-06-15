const path = require('path')
const pageMethod = require('./util/getPages.js')

// let env = process.env.NODE_ENV;

function resolve(dir) {
  return path.join(__dirname, dir)
}
const pages = pageMethod.pages()

// const pages = {}
// const page = 'carouselshowstyle1'
// const style = 'style'
// pages[page] = {
//   entry: `src/pages/${page}/${style}.js`,
//   // 模板来源
//   template: `src/pages/${page}/index.html`,
//   // 在 dist/index.html 的输出
//   filename: `${page}/index.html`,
//   // 提取出来的通用 chunk 和 vendor chunk。
//   chunks: ['chunk-vendors', 'chunk-common', `${page}`]
// }

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: '/EditTemplates/',
  outputDir: '../DesignerApp/Designer.App/wwwroot/EditTemplates',
  pages: pages,
  productionSourceMap: false,
  chainWebpack: config => {
    // 生产环境配置
    if (isProduction) {
      // 压缩代码
      config.optimization.minimize(true)
      config.optimization.delete('splitChunks')
    }
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@comp', resolve('src/components'))
      .set('@static', resolve('static'))
      .set('@api', resolve('src/api'))
      .set('@environment', resolve('src/environment'))
      .set('@utils', resolve('util'))
      .set('@pages', resolve('src/pages'))
    config.module
      .rule('svg')
      .use('file-loader')
      .options({
        name: '[name].[ext]',
        outputPath: '../'
      })
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@static/styles/base/common.scss";'
      }
    }
  },
  configureWebpack: config => {
    // 生产环境配置
    if (isProduction) {
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        // 'perfect-scrollbar': 'PerfectScrollbar',
        'tui-image-editor': 'TuiImageEditor'
      }
    }
    config.output.filename = '[name].[hash].js'
    config.output.chunkFilename = '[name].[hash].js'
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          // 抽离所有入口的公用资源为一个chunk
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 3,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          // 抽离node_modules下的库为一个chunk
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          // 由于image入口使用了tui-image-editor,所以tui-image-editor单独处理出来，这样其他入口就不会使用此js
          'tui-image-editor': {
            name: 'tui-image-editor',
            test: /[\\/]node_modules[\\/]tui-image-editor[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          'tui-code-snippet': {
            name: 'tui-code-snippet',
            test: /[\\/]node_modules[\\/]tui-code-snippet[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true
          },
          'tui-color-picker': {
            name: 'tui-color-picker',
            test: /[\\/]node_modules[\\/]tui-color-picker[\\/]/,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: true
          },
          vuedraggable: {
            name: 'vuedraggable',
            test: /[\\/]node_modules[\\/]vuedraggable[\\/]/,
            chunks: 'all',
            priority: 6,
            reuseExistingChunk: true,
            enforce: true
          },
          sortablejs: {
            name: 'sortablejs',
            test: /[\\/]node_modules[\\/]sortablejs[\\/]/,
            chunks: 'all',
            priority: 7,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
  }
}
