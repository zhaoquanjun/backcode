/**
 * ----------------------------------------
 * SmartUi(v0.1):text.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import HttpRequest from '../util/httpRequest'
import { downloadApiBase } from '../env'
import { getSysClass, getjQuery } from '../util'
const DATA_KEY = 'st.newsdetail'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'newsdetail'
const templates = {}
templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="{{_Name}}" class="c-newsdetail {{_SysClass}} ql-bubble"> <div class="ql-editor">{{ Text}}</div></div>
    <div class="image-viewer__wrapper">
    <button class="image-viewer__btn image-viewer__close"><i class="iconfont iconguanbi"></i></button>
    <button class="image-viewer__btn image-viewer__prev"><i class="iconfont iconicon-des-Arrowleft1"></i></button>
    <button class="image-viewer__btn image-viewer__next"><i class="iconfont iconicon-des-Arrow"></i></button>
    <div class="image-viewer__canvas"><img src="" class="image-viewer__img"></div>
    </div>
`
const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`
}
const Selector = {
  CLOSE_PREVIEW: '.image-viewer__close',
  IMG_PREV: '.image-viewer__prev',
  IMG_NEXT: '.image-viewer__next'
}
const $ = getjQuery()
class NewsDetail {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + this._id)
    this._type = 'newsdetail'
    this._style = style
  }
  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  _init() {
    this._addEventListeners()
    this._control.data(DATA_KEY, this)
  }
  _addEventListeners() {
    this._control
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._downloadFile, this))
    this._control
      .find('.ql-editor')
      .find('img')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._handlerPreview, this))
    this._control
      .find(Selector.CLOSE_PREVIEW)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.closePreview, this))
    this._control
      .find(Selector.IMG_PREV)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.prev, this))
    this._control
      .find(Selector.IMG_NEXT)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.next, this))
  }
  _handlerPreview(e) {
    this.reset()
    let imgList = this._control.find('.ql-editor').find('img')
    let aryImg = Array.prototype.slice.call(imgList)
    aryImg.forEach(item => {
      let imgUrl = $(item).attr('src')
      this.data.imgList.push(imgUrl)
    })
    this.data.currentImg = $(e.target).attr('src')

    this.data.curIndex = this.data.imgList.indexOf(this.data.currentImg)
    this._control.find('.image-viewer__wrapper').show()
    this.preview()
  }
  preview() {
    this._control
      .find('.image-viewer__canvas')
      .find('img')
      .attr('src', this.data.currentImg)
  }
  next() {
    let $nextBtn = this._control.find(Selector.IMG_NEXT)
    if (this.isLast()) {
      $nextBtn.attr('disabled', true)
      return
    }
    this._control.find(Selector.IMG_PREV).removeAttr('disabled')
    this.data.curIndex++
    this.data.currentImg = this.data.imgList[this.data.curIndex]
    this.preview()
  }
  prev() {
    if (this.isFirst()) {
      this._control.find(Selector.IMG_PREV).attr('disabled', true)
      return
    }
    this._control.find(Selector.IMG_NEXT).removeAttr('disabled')
    this.data.curIndex--
    this.data.currentImg = this.data.imgList[this.data.curIndex]
    this.preview()
  }
  closePreview() {
    this._control.find('.image-viewer__wrapper').hide()
  }
  isLast() {
    return this.data.curIndex === this.data.imgList.length - 1
  }

  isFirst() {
    return this.data.curIndex === 0
  }
  reset() {
    this.data = {
      imgList: [],
      curIndex: -1,
      currentImg: ''
    }
  }
  _downloadFile(e) {
    const type = $(e.target).attr('data-type')
    e.preventDefault()
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

  static NewsDetailInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new NewsDetail($this.attr('id'), $this.attr('data-c-style'))
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
      NewsDetail.NewsDetailInterface(this, config, args)
    })
  }
}
const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = NewsDetail.jQueryInterface
$.fn[NAME].Constructor = NewsDetail
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return NewsDetail.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default NewsDetail
