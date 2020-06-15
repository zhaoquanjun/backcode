/**
 * ----------------------------------------
 * SmartUi(v0.1):timeline.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'

const NAME = 'timeline'
const DATA_KEY = `st.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const Event = {
  RESIZE: `resize${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`
}

const INNER_TEM = `
  <ul>
    {{each childArea item i}}
    <li class="timeline-list--item Area fmcontrol ui-sortable" data-title="{{item.Id}}" id="{{item.Id}}_{{_Id}}">
      <span class="time-area c-col-{{leftPercent}}">
        <span class="block time-block">{{item.Time}}</span>
      </span>
      <span class="table-cell content-area c-col-{{rightPercent}}">
        <p class="content-title ellipsis">{{item.Title}}</p>
        <p class="content-desc">{{item.Desc}}</p>
        <span class="block icon-block">
          <i class="iconfont iconziyuan"></i>
        </span>
        <span class="top-icon"></span>
        <span class="bottom-icon"></span>
      </span>
    </li>
    {{/each}}
  </ul>
  `

const templates = {}
templates['style1'] = `<div
  id="{{_Id}}"
  data-c-type="{{_Name}}"
  class="c-timeline {{_ThemeClasses[0]}} {{_SysClass}}"
  data-percent="{{rightPercent}}"
  data-ride="timeline"
  >
  ${INNER_TEM}
  </div>`

const $ = getjQuery()
class TimeLine {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + id)
    this._style = style
    this._index = 0
    this._startY = 0
    this._isDragging = false
    this._hasAppend = false
  }

  _init() {
    this._addEventListener()
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
    const cacheKey = DATA_KEY + '_inner'
    const html = template(cacheKey, INNER_TEM, data)
    this._control.html(html)
    this._control.data(DATA_KEY, this)
    if (typeof callback === 'function') {
      callback(this._id)
    }
    this._resizeDateAreaByEquipment()
    this._addEventListener()
  }

  refreshItemPercent(id) {
    const rightP = $('#' + id).attr('data-percent')
    const leftP = 12 - parseInt(rightP)
    $('#' + id)
      .find('.time-area')
      .attr('class', 'time-area c-col-' + leftP)
    $('#' + id)
      .find('.table-cell content-area')
      .attr('class', 'content-area c-col-' + rightP)
  }

  _resizeDateAreaByEquipment() {
    const winW = $(window).width()
    const percent = this._control.attr('data-percent')
    if (winW <= 992) {
      this._control
        .find('.time-block')
        .css({ width: (winW * percent) / 12 - 48 + 'px' })
        .children('span')
        .addClass('ellipsis block')
    } else {
      this._control
        .find('.time-block')
        .css({ width: 'auto' })
        .children('span')
        .removeClass('ellipsis block')
    }
  }

  changeListItemPercent(data) {
    const leftP = data.leftPercent
    const rightP = data.rightPercent
    this._control.find('.time-area').attr('class', 'time-area c-col-' + leftP)
    this._control
      .find('.content-area')
      .attr('class', 'table-cell content-area c-col-' + rightP)
    Number(leftP) != 0 && this._control.attr('data-percent', rightP)
  }

  changeIcon(data) {
    this._control
      .find('.icon-block')
      .children('i')
      .attr('class', 'iconfont ' + data)
  }

  _resizeEvent(e) {
    e.stopPropagation()
    const winW = $(window).width()
    const percent = this._control.attr('data-percent')
    if (winW <= 992) {
      this._control
        .find('.time-block')
        .css({ width: (winW * percent) / 12 - 48 + 'px' })
        .addClass('ellipsis block')
    } else {
      this._control
        .find('.time-block')
        .css({ width: 'auto' })
        .removeClass('ellipsis block')
    }
  }

  _itemClickEvent(e) {
    e.stopPropagation()
    var element = $(e.target).hasClass('timeline-list--item')
      ? $(e.target)
      : $(e.target).parents('.timeline-list--item')
    if (window.parent.smSite && window.parent.smSite.setControlSelectedItem) {
      var index = element.index()
      window.parent.smSite.setControlSelectedItem(index)
    } else {
      setTimeout(function() {
        if (
          window.parent.smSite &&
          window.parent.smSite.setControlSelectedItem
        ) {
          var index = element.index()
          window.parent.smSite.setControlSelectedItem(index)
        }
      }, 600)
    }
  }

  _addEventListener() {
    $(window)
      .off(Event.RESIZE)
      .on(Event.RESIZE, $.proxy(this._resizeEvent, this))
    this._control
      .find('.timeline-list--item')
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._itemClickEvent, this))
  }

  // Static
  static timelineInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new TimeLine($this.attr('id'), 'style1')
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
      TimeLine.timelineInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = TimeLine.jQueryInterface
$.fn[NAME].Constructor = TimeLine
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return TimeLine.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default TimeLine
