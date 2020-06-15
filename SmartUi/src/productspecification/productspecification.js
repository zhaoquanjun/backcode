/**
 * ----------------------------------------
 * SmartUi(v0.1):text.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import HttpRequest from '../util/httpRequest'
import { getSysClass, getjQuery } from '../util'
import { downloadApiBase } from '../env'
const DATA_KEY = 'st.productspecification'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'productspecification'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" class="c-productspecification {{_SysClass}} ql-bubble" data-ride="productspecification"><div class="ql-editor">{{Text}}</div></div>`;

const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`
}
const $ = getjQuery()
class ProductSpecification {
  constructor(id, style) {
      this._id = id
      this._control = $('#' + this._id)
      this._type = 'productspecification'
      this._style = style;
  }
  //public methods
  renderControl(data) {
      data._Id = this._id;
      data._SysClass = getSysClass(this._id);
      const cacheKey = DATA_KEY + '_' + this._style;
      return template(cacheKey, templates[this._style], data);
  }

  _init() {
    this._addEventListeners()
  }

  _addEventListeners() {
    this._control
    .off(Event.CLICK_DATA_API)
    .on(Event.CLICK_DATA_API, $.proxy(this._downloadFile, this))
  }

  _downloadFile(e) {
    const type = $(e.target).attr('data-type')
    if (type === 'file') {
      const url = downloadApiBase + $(e.target).attr('href')
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

  // Static
  static ProductSpecificationInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new ProductSpecification($this.attr('id'), $this.attr('data-c-style'))
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
      ProductSpecification.ProductSpecificationInterface(this, config, args)
    })
  }
}
const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = ProductSpecification.jQueryInterface
$.fn[NAME].Constructor = ProductSpecification
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return ProductSpecification.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default ProductSpecification