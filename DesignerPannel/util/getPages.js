const glob = require('glob')
const pages = {}
module.exports.pages = function() {
  glob.sync('./src/pages/*/style.js').forEach(filepath => {
    const fileList = filepath.split('/')
    const fileName = fileList[fileList.length - 1]
    const folderName = fileList[fileList.length - 2]
    if (folderName.indexOf('imagestyle') > -1) {
      pages[folderName] = {
        entry: `src/pages/${folderName}/${fileName}`,
        // 模板来源
        template: `src/pages/${folderName}/index.html`,
        // 在 dist/index.html 的输出
        filename: `${folderName}/index.html`,
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: [
          'tui-image-editor',
          'tui-code-snippet',
          'tui-color-picker',
          'chunk-vendors',
          'chunk-common',
          folderName
        ]
      }
    } else if (
      folderName.indexOf('atlasstyle') > -1 ||
      folderName.indexOf('carouselstyle') > -1 ||
      folderName.indexOf('newsliststyle5') > -1 ||
      folderName.indexOf('timelinestyle1') > -1 ||
      folderName.indexOf('tabstyle') > -1 ||
      folderName.indexOf('columnsstyle1') > -1 ||
      folderName.indexOf('navcontainerstyle') > -1
    ) {
      pages[folderName] = {
        entry: `src/pages/${folderName}/${fileName}`,
        // 模板来源
        template: `src/pages/${folderName}/index.html`,
        // 在 dist/index.html 的输出
        filename: `${folderName}/index.html`,
        // 提取出来的通用 chunk 和 vendor chunk。
        // chunks: ['chunk-vendors', 'chunk-common', folderName]
        chunks: [
          'sortablejs',
          'vuedraggable',
          'chunk-vendors',
          'chunk-common',
          folderName
        ]
      }
    } else {
      pages[folderName] = {
        entry: `src/pages/${folderName}/${fileName}`,
        // 模板来源
        template: `src/pages/${folderName}/index.html`,
        // 在 dist/index.html 的输出
        filename: `${folderName}/index.html`,
        // 提取出来的通用 chunk 和 vendor chunk。
        // chunks: ['chunk-vendors', 'chunk-common', folderName]
        chunks: ['chunk-vendors', 'chunk-common', folderName]
      }
    }
  })
  return pages
}
