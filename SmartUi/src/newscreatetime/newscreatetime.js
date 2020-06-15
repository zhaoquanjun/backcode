/**
 * ----------------------------------------
 * SmartUi(v0.1):newscreatetime.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
const NAME = 'newscreatetime'
const DATA_KEY = `st.${NAME}`
const templates = {}
templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="newscreatetime" contenteditable="false" class="c-newscreatetime {{_SysClass}}">{{Text}}</div>`

const $ = getjQuery()
class NewsCreateTime {
  constructor(id, style) {
    this._id = id
    this._type = 'newscreatetime'
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
    // this.initOriginTime()
    this._control.data(DATA_KEY, this)
  }

  initOriginTime() {
    let time = this._control.attr('data-text')
    const dateStyle = this._control.attr('data-date-style')
    if (time === '') {
      time = new Date();
      if (window.parent.smSite) {
        window.parent.smSite.onDataChange(null, {Text: ''}, {Text: time})
      }
      this._control.attr('data-text', time)
    }
    const newTime = this.convertTime(dateStyle, time)
    this._control.find('p').last().text(newTime)
  }

  changeDateStyle(data) {
    let dateTime = data.dataModel.Text
    this._control.attr('data-date-style', data.dataModel.dateStyle)
    dateTime = dateTime.replace('T', ' ')
    const newTime = this.convertTime(data.dataModel.dateStyle, dateTime)
    this._control.find('p').last().text(newTime)
  }

  convertTime(format, dateTime) {
    let targetTime
    let myDate = new Date(dateTime)
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    let hour = myDate.getHours()
    let minute = myDate.getMinutes()
    console.log(format, dateTime, myDate)
    switch (format) {
      case 'MM-DD':
        targetTime = month + '-' + day
        break
      case 'MM月DD日':
        targetTime = month + '月' + day + '日'
        break
      case 'YYYY-MM-DD':
        targetTime = year + '-' + month + '-' + day
        break
      case 'YYYY年MM月DD日':
        targetTime = year + '年' + month + '月' + day + '日'
        break
      case 'MM-DD hh:mm':
        targetTime = month + '-' + day + ' ' + hour + ':' + minute
        break
      case 'MM月DD日 hh:mm':
        targetTime = month + '月' + day + '日 ' + hour + ':' + minute
        break
      case 'YYYY-MM-DD hh:mm':
        targetTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
        break
      case 'YYYY年MM月DD日 hh:mm':
        targetTime =
          year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
        break
      default:
        '创建时间：'
    }
    return targetTime
  }

  // Static
  static newCreateTimeInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new NewsCreateTime($this.attr('id'), 'style1')
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
      NewsCreateTime.newCreateTimeInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = NewsCreateTime.jQueryInterface
$.fn[NAME].Constructor = NewsCreateTime
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return NewsCreateTime.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default NewsCreateTime
