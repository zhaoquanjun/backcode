/**
 * ----------------------------------------
 * SmartUi(v0.1):image.js
 * ----------------------------------------
 */
import HttpRequest from '../util/httpRequest'
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
import { downloadApiBase, isDesign } from '../env'
const templates = {}
templates[
  'style1'
] = `<img src="{{Src}}" title="{{Text}}" alt="{{Text}}" id="{{_Id}}" data-c-type="{{_Name}}" class="{{_SysClass}} c-image" href="{{Href}}" target="{{Target}}" data-model="square" data-ride="image" />
`
templates['style2'] = `{{ if Ctype === 'file' }}
<a id="{{_Id}}" data-c-type="{{_Name}}"  target="{{Target}}"  href="{{Href}}" download  class="{{_SysClass}} c-image c-image-circle"   data-model="{{Model.Model}}"  data-ride="image"">
  <img src="{{Src}}" title="{{Text}}" alt="{{Text}}" class="c-image__circle--inner"  onload="if (this.naturalWidth > this.parentNode.clientWidth || this.naturalHeight > this.parentNode.clientHeight){if (this.naturalWidth / this.naturalHeight > this.parentNode.clientWidth / this.parentNode.clientHeight){this.style.maxHeight = '100%'; this.style.maxWidth = 'none';} else {this.style.maxWidth = '100%'; this.style.maxHeight = 'none';}}" />
  <img src="{{Src}}" />
</a>
{{ else }}
<a id="{{_Id}}" data-c-type="{{_Name}}"  target="{{Target}}"  href="{{Href}}" class="{{_SysClass}} c-image c-image-circle"   data-model="{{Model.Model}}"  data-ride="image"">
  <img src="{{Src}}" title="{{Text}}" alt="{{Text}}" class="c-image__circle--inner"  onload="if (this.naturalWidth > this.parentNode.clientWidth || this.naturalHeight > this.parentNode.clientHeight){if (this.naturalWidth / this.naturalHeight > this.parentNode.clientWidth / this.parentNode.clientHeight){this.style.maxHeight = '100%'; this.style.maxWidth = 'none';} else {this.style.maxWidth = '100%'; this.style.maxHeight = 'none';}}" />
  <img src="{{Src}}" />
</a>
{{ /if }}
`

const NAME = 'image'
const DATA_KEY = `st.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const Event = {
  CLICK: `click${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`
}

var $ = getjQuery()
class Images {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + this._id)
    this._type = 'image'
    this._style = style
  }
  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  refreshControl(data, callback) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_inner'
    const html = template(cacheKey, templates[this._style], data)
    let prevDom = this._control.prev()
    if (prevDom[0]) {
      prevDom.after(html)
    } else {
      prevDom.parent().append(html)
    }
    this._control.data(DATA_KEY, this)
    this._init()
    if (typeof callback === 'function') {
      callback(this._id)
    }
  }
  _init() {
    this._addEventListener()
    this.resizeEvent('init')
    this._resetLinkStatus()
  }
  _clickEvent(e) {
    let ele = $(e.target)
    if (ele.attr('data-type') === 'file') {
      this._downloadFile(e)
    } else {
      if (this._style === 'style1') {
        let target = ele.attr('target')
        let href = ele.attr('href')
        if (href == 'javascript:;') return
        let a = document.createElement('a')
        let span = document.createElement('span')
        $(a).append(span)
        $(a).attr({
          target: target,
          href: href,
          class: 'loadNewPageContainer'
        })
        $(span).attr('class', 'loadNewPageSpan')
        if ($('.loadNewPageContainer').length == 0) {
          $(document.body).append(a)
        }
        $('.loadNewPageSpan').click()
        $('.loadNewPageContainer').remove()
      }
    }
  }
  _resetLinkStatus() {
    const url = this._control.attr('href')
    if (url !== 'javascript:;') {
      this._control.css({ cursor: 'pointer' })
    } else {
      this._control.css({ cursor: 'default' })
    }
  }
  resizeEvent(status) {
    if (this._style == 'style2') {
      var self = $('#' + this._id)
      var imgChild = $('#' + this._id).find('img')[0]
      if (status === 'init') {
        let _this = this
        imgChild.onload = function() {
          _this._resizeOperate(self, imgChild)
        }
      } else {
        this._resizeOperate(self, imgChild)
      }
    }
  }

  _resizeOperate(self, imgChild) {
    var selfW = self.width()
    let _this = this
    setTimeout(function() {
      var newW = self.width()
      var newH = self.height()
      if (newW !== newH) {
        _this._resizeOperate(self, imgChild)
      }
    }, 100)
    self.css({ height: selfW + 'px' })
    if (
      imgChild.naturalWidth > imgChild.parentNode.clientWidth ||
      imgChild.naturalHeight > imgChild.parentNode.clientHeight
    ) {
      if (
        imgChild.naturalWidth / imgChild.naturalHeight >
        imgChild.parentNode.clientWidth / imgChild.parentNode.clientHeight
      ) {
        imgChild.style.maxHeight = '100%'
        imgChild.style.maxWidth = 'none'
      } else {
        imgChild.style.maxWidth = '100%'
        imgChild.style.maxHeight = 'none'
      }
    }
  }
  _addEventListener() {
    $(window)
      .off(Event.RESIZE + this._id)
      .on(Event.RESIZE + this._id, $.proxy(this.resizeEvent, this))
    if (!isDesign()) {
      this._control
        .off(Event.CLICK)
        .on(Event.CLICK, $.proxy(this._clickEvent, this))
    }
  }
  _downloadFile(e) {
    const type = this._control.attr('data-type')
    const url = downloadApiBase + this._control.attr('href')

    if (type === 'file') {
      e.stopPropagation()
      e.preventDefault()
      HttpRequest.get(
        url,
        {},
        function(res) {
          if (res.isGetDownloadUrlSuccess) {
            var a = document.createElement('a')
            a.href = res.downloadUrl
            a.target = '_self'

            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          } else {
            let mode = {
              downloadUrl: url,
              Title: '请输入提取码：',
              ConfirmText: '提取文件'
            }
            let filedownload = new window.SmartUi.FileDownload(mode)
            filedownload._render()
          }
        },
        function(err) {
          console.log(err)
        }
      )
    }
  }
  changeImageSrc(data) {
    let control = $('#' + this._id)
    let img = new Image()
    let _this = this
    img.onload = function() {
      if (_this._style == 'style2') {
        if (data) {
          control.find('img').attr('src', data)
          control.find('img')[0].onload = function() {
            window.smDesigner.reSizeSwitchImgSize()
            _this.resizeInnerImageSize()
            control.click()
          }
        } else {
          window.smDesigner.reSizeSwitchImgSize()
          _this.resizeInnerImageSize()
          control.click()
        }
      } else {
        control.attr('src', data)
        control.click()
      }
    }
    img.src = data
    this._init()
  }
  changeText(data) {
    var control = $('#' + this._id)
    switch (this._style) {
      case 'style1':
        control.attr({
          title: data,
          alt: data
        })
        break
      case 'style2':
        control.children('img').attr({
          title: data,
          alt: data
        })
        break
      default:
        break
    }
  }
  changeAttribute(data) {
    for (var k in data) {
      switch (k) {
        case 'Target':
          this._control.attr('target', data[k])
          break
        case 'Href':
          this._control.attr({ href: data[k], 'data-type': data['Ctype'] })
          if (data[k] !== 'javascript:;') {
            this._control.css({ cursor: 'pointer' })
          } else {
            this._control.css({ cursor: 'default' })
          }
          break
        default:
          break
      }
    }
  }
  resizeInnerImageSize() {
    var _this = $('#' + this._id).find('img')[0]
    if (
      _this.naturalWidth > _this.parentNode.clientWidth ||
      _this.naturalHeight > _this.parentNode.clientHeight
    ) {
      if (
        _this.naturalWidth / _this.naturalHeight >
        _this.parentNode.clientWidth / _this.parentNode.clientHeight
      ) {
        _this.style.maxHeight = '100%'
        _this.style.maxWidth = 'none'
      } else {
        _this.style.maxWidth = '100%'
        _this.style.maxHeight = 'none'
      }
    }
  }

  // Static
  static imageInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      var model = $this.attr('data-model')
      var style = model == 'square' ? 'style1' : 'style2'
      data = new Images($this.attr('id'), style)
      data._init()
    }
    if (typeof options === 'string') {
      if (typeof data[options] === 'undefined') {
        throw new TypeError(`No method named "${options}"`)
      }
      data[options].apply(data, args)
    }
  }

  static jQueryInterface(config) {
    var args = Array.prototype.slice.call(arguments, 1)
    return this.each(function() {
      Images.imageInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Images.jQueryInterface
$.fn[NAME].Constructor = Images
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Images.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default Images
