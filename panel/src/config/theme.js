import themeConfig from './themeData'

let theme = null
if (window.smSite) {
  theme = window.smSite.getThemeConfig()
}

const themeData = {
  data: themeConfig[theme ? theme.themeColor : 'blue_color1']
}

if (window.smSite) {
  window.smSite.setPanelThemeData = function(co) {
    themeData.data = themeConfig[co]
  }
}

export default themeData
