const utils = {
  deepCopy: function(obj) {
    var result = Array.isArray(obj) ? [] : {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = utils.deepCopy(obj[key]) // 递归复制
        } else {
          result[key] = obj[key]
        }
      }
    }
    return result
  },
  /*
   * @Name 颜色值转换
   * @param str  十六进制值
   * @param  n  透明度值
   */
  formatHexToRgba: function(str, n) {
    // 十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    var sColor = str.toLowerCase()
    // 十六进制颜色转换为RGB格式
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          // 例如：#eee,#fff等
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      // 处理六位颜色值
      var sColorChange = []
      for (var k = 1; k < 7; k += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(k, k + 2)))
      }
      return 'rgba(' + sColorChange.join(',') + ',' + n + ')'
    } else {
      return str
    }
  },
  formatRgbaToHex: function(color) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (reg.test(color)) {
      return color
    } else {
      var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',')
      var a = parseFloat(values[3] || 1)
      var r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255)
      var g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255)
      var b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
      return '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2)
    }
  },
  getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) != -1) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },
  setCookie(cname, cvalue) {
    var d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  getThemeConfig() {
    if (window.smSite.getThemeConfigForPanel) {
      return window.smSite.getThemeConfigForPanel()
    }
  }
}

export default utils
