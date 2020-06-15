/**
 * ----------------------------------------
 * SmartUi(v0.1):button.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import HttpRequest from '../util/httpRequest'
import { getSysClass, getjQuery } from '../util'
import { isDesign, downloadApiBase } from '../env'
const NAME = 'button'
const DATA_KEY = `st.${NAME}`
const templates = {}

templates['style1'] = `{{if Ctype=='file'}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>
{{else}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>`
templates['style2'] = `{{if Ctype=='file'}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>
{{else}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>`
templates['style3'] = `{{if Ctype=='file'}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>
{{else}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>`
templates['style4'] = `{{if Ctype=='file'}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>
{{else}}
<a id="{{_Id}}" contenteditable="false" data-c-type="{{_Name}}" class="c-button {{_ThemeClasses[0]}} {{_SysClass}}" data-type="{{Ctype}}"
href="{{Href}}" download target="{{Target}}"><i class="iconfont {{Icon}}"></i><span>{{Text}}</span></a>`

const EVENT_KEY = `.${DATA_KEY}`
const Event = {
  CLICK: `click${EVENT_KEY}`
}

const $ = getjQuery()

class Button {
  constructor(id, style) {
    this._id = id
    this._type = 'button'
    this._style = style
    this._control = $('#' + this._id)
  }
  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  _init() {
    if (!isDesign()) {
      this.addEventListenter()
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
  addEventListenter() {
    this._control
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._downloadFile, this))
  }

  // Static
  static buttonInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Button($this.attr('id'), 'style1')
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
      Button.buttonInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Button.jQueryInterface
$.fn[NAME].Constructor = Button
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Button.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default Button
