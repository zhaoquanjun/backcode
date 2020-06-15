/**
 * ----------------------------------------
 * SmartUi(v0.1):step.js
 * ----------------------------------------
 */
// import HttpRequest from '../util/httpRequest'
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
const NAME = 'step'
const DATA_KEY = `st.${NAME}`

const INNER_TEM = `
  `

const templates = {}
templates['style1'] = ``

const $ = getjQuery()
class Step {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + id)
    this._style = style
  }

  _init() {
    // const data = JSON.parse(this._control.attr('data-model')).childArea
    // this.refreshControl(data)
    // this._addEventListener()
  }

  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }

  refreshControl(data, callback) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data = data.slice(0, parseInt(this._control.attr('data-num')))
    const paramData = { childArea: data }
    const cacheKey = DATA_KEY + '_inner' + this._style
    const html = template(cacheKey, INNER_TEM, paramData)
    this._control.html(html)
    this._control.data(DATA_KEY, this)
    if (typeof callback === 'function') {
      callback(this._id)
    }
    this._resizeDateAreaByEquipment()
  }

  changeIcon(data) {
    this._control
      .find('.icon-block')
      .children('i')
      .attr('class', 'iconfont ' + data)
  }

  // Static
  static stepInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Step($this.attr('id'), 'style1')
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
      Step.stepInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Step.jQueryInterface
$.fn[NAME].Constructor = Step
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Step.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default Step
