/**
 * ----------------------------------------
 * SmartUi(v0.1):columns.js
 * ----------------------------------------
 */
import { isDesign } from '../env/index'
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
const DATA_KEY = 'st.columns'
const NAME = 'columns'
const EVENT_KEY = `.${DATA_KEY}`
const $ = getjQuery()
const INNER_TEM = `{{each childArea item i}}
    <div class=" c-columns-{{item.Columns}} c-col-{{item.Percent}} c-col-md-{{item.MobilePercent}} Area fmcontrol dashed-line {{if item.Html==''}}sm-empty columns-empty-space{{/if}}""
    id="{{item.Id}}_{{_Id}}" data-title="{{item.Title}}" data-pc-percent="{{item.Percent}}" data-mb-percent="{{item.MobilePercent}}">
            {{@item.Html}}
    </div>
    {{/each}}`
const templates = {}
templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="columns" class="c-row c-columns {{_SysClass}}" data-conf='{"toggleSticky":{{toggleSticky}}}'>
        <div class="container-warp">    
          <div class="tableRow columns-inner">
            ${INNER_TEM}
          </div>
        </div>
</div>`
const Event = {
  SCROLL_DATA_API: `scroll${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`
}
class Columns {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + this._id)
    this._type = 'columns'
    this._style = style
    this._timer = null
    this.offsetTop = this._control.offset().top
    try {
      this._dataConf = JSON.parse(this._control.attr('data-conf'))
    } catch (err) {
      this._dataConf = { toggleSticky: false }
    }
  }
  _init() {
    if (this._dataConf.toggleSticky && !isDesign()) {
      this.toggleSticky({ toggleSticky: this._dataConf.toggleSticky })
    }
    this._addEventListeners()
    this.resetSpaceLinePosition()
  }
  _addEventListeners() {
    // $(window)
    //   .off(Event.RESIZE + this._id)
    //   .on(Event.RESIZE + this._id, $.proxy(this.resize, this))
    $(window)
      .off(Event.RESIZE + this._id)
      .on(
        Event.RESIZE + this._id,
        $.proxy(this.throttle(this.resize, 20, { leading: false }), this)
      )
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
    const html = template(cacheKey, INNER_TEM, data)
    this._control.find('.columns-inner').html(html)
    this.resetSpaceLinePosition()
    if (typeof callback === 'function') {
      callback(this._id)
    }
  }
  _getTotalPercent(k, data) {
    var n = 0
    data.map((i, it) => {
      if (i <= k) {
        n += parseFloat($(it).attr('data-pc-percent'))
      }
    })
    return n
  }
  resetSpaceLinePosition() {
    if ($('#columns-space-' + this._id)[0]) {
      $('#columns-space-' + this._id).remove()
    }
    let style = document.createElement('style')
    style.id = 'columns-space-' + this._id
    document.head.appendChild(style)
    let sheet = style.sheet
    const childs = this._control.find('.columns-inner').children('.Area')
    let left,
      mbPercent,
      maxHeight = parseFloat(childs.eq(0).outerHeight())
    const marginDis = parseFloat(childs.eq(0).css('margin-bottom'))
    const winW = $(window).width()
    const dividerW = getComputedStyle(childs[0], '::after').width
    const marginValue = getComputedStyle(childs[0], '::after').marginTop

    childs.map((i, it) => {
      if (i < childs.length) {
        if (winW < 992) {
          mbPercent = parseFloat($(it).attr('data-mb-percent'))
          left = (1 / mbPercent) * ((i + 1) % mbPercent) * 100 + '%'
          if (mbPercent === 2) {
            if (i + 1 === 3) {
              if (childs.length !== 3) {
                sheet.addRule(
                  '.' +
                    this._id +
                    ' .Area[data-title=area' +
                    (i + 1) +
                    ']::after',
                  `top: ${marginDis + maxHeight + 'px'}`
                )
              }
            }
            if (i + 1 === 5) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `top: ${
                  marginDis * 2 +
                  maxHeight +
                  parseFloat(childs.eq(3).outerHeight()) +
                  'px'
                }`
              )
            }
            // 一行
            if (childs.length < 3) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `height: calc(100% - ${
                  parseFloat(marginValue) * 2
                }px - ${marginDis}px)`
              )
            }
            // 两行
            if (childs.length === 3 || childs.length === 4) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `height: calc(100% - ${
                  parseFloat(marginValue) * 2
                }px - ${marginDis}px - ${maxHeight}px)`
              )
              console.log(
                `height: calc(100% - ${
                  parseFloat(marginValue) * 2
                }px - ${marginDis}px - ${maxHeight}px)`
              )
            }
            // 三行
            if (childs.length > 4) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `height: calc(100% - ${parseFloat(marginValue) * 2}px - ${
                  marginDis * 2
                }px - ${maxHeight * 2}px)`
              )
            }
          }
          if (mbPercent === 3) {
            if ([4, 5].indexOf(i + 1) > -1) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `top: ${marginDis + maxHeight + 'px'}`
              )
            }
            // 一行
            if (childs.length < 4) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `height: calc(100% - ${
                  parseFloat(marginValue) * 2
                }px - ${marginDis}px)`
              )
            }
            // 两行
            if (childs.length > 4) {
              sheet.addRule(
                '.' +
                  this._id +
                  ' .Area[data-title=area' +
                  (i + 1) +
                  ']::after',
                `height: calc(100% - ${parseFloat(marginValue) * 2}px - ${
                  marginDis * 2
                }px - ${maxHeight}px)`
              )
            }
          }
        } else {
          left = (this._getTotalPercent(i, childs) / 12) * 100 + '%'
          sheet.addRule(
            '.' + this._id + ' .Area[data-title=area' + (i + 1) + ']::after',
            `height: calc(100% - ${
              parseFloat(marginValue) * 2
            }px - ${marginDis}px)`
          )
        }
        sheet.addRule(
          '.' + this._id + ' .Area[data-title=area' + (i + 1) + ']::after',
          `margin-left: calc(${left} - ${parseFloat(dividerW) / 2}px)`
        )
      }
    })
  }
  changeColumnWidth(data, callback) {
    const areas = data.childArea
    const childLen = areas.length
    for (let i = 0; i < childLen; i++) {
      const areaId = areas[i].Id + '_' + this._id
      const $area = $('#' + areaId)
      const percent = areas[i].Percent
      const columns = areas[i].Columns
      const mobilePercent = areas[i].MobilePercent
      const title = areas[i].Title
      if ($area.length > 0) {
        const areaChildLen = $area.children().length
        if (areaChildLen > 0) {
          $area.attr({
            class:
              'Area  fmcontrol dashed-line c-col-' +
              percent +
              ' c-columns-' +
              columns +
              ' c-col-md-' +
              mobilePercent,
            'data-mb-percent': mobilePercent,
            'data-pc-percent': percent
          })
        } else {
          $area.attr({
            class:
              'sm-empty Area  fmcontrol dashed-line c-col-' +
              percent +
              ' c-columns-' +
              columns +
              ' c-col-md-' +
              mobilePercent,
            'data-mb-percent': mobilePercent,
            'data-pc-percent': percent
          })
        }
        $area.attr({ 'data-title': title, 'data-percent': percent })
      }
    }
    this.resetSpaceLinePosition()
    if (typeof callback == 'function') callback()
  }
  addEmptyArea(data) {
    const areas = data.childArea
    const childLen = areas.length
    for (let i = 0; i < childLen; i++) {
      const areaId = areas[i].Id + '_' + this._id
      const percent = areas[i].Percent
      const columns = areas[i].Columns
      const mobilePercent = areas[i].MobilePercent
      const $area = $('#' + areaId)
      const title = areas[i].Title
      if ($area.length == 0) {
        this._addSingleArea(areaId, areas[i])
      } else {
        const areaChildLen = $area.children().length
        if (areaChildLen > 0) {
          $area.attr({
            class:
              'Area  fmcontrol dashed-line c-col-' +
              percent +
              ' c-columns-' +
              columns +
              ' c-col-md-' +
              mobilePercent,
            'data-mb-percent': mobilePercent
          })
        } else {
          $area.attr({
            class:
              'sm-empty Area  fmcontrol dashed-line c-col-' +
              percent +
              ' c-columns-' +
              columns +
              ' c-col-md-' +
              mobilePercent,
            'data-mb-percent': mobilePercent
          })
        }
        $area.attr('data-title', title)
      }
    }
  }
  removeEmptyArea(data) {
    const areas = data.childArea
    const childLen = areas.length
    const areaIdDic = {}
    for (let i = 0; i < childLen; i++) {
      areaIdDic[areas[i].Id + '_' + this._id] = areas[i].Percent
    }
    const waitDeleteAreaId = []
    this._control.children().each(function () {
      let $this = $(this)
      const id = $this.attr('id')
      const title = this.Title
      const areaChildLen = $this.children().length
      if (!areaIdDic[id]) {
        waitDeleteAreaId.push(id)
      }
      if (areaChildLen > 0) {
        $this.attr(
          'class',
          'Area fmcontrol dashed-line  c-col-' + areaIdDic[id]
        )
      } else {
        $this.attr('class', 'Area  sm-empty  c-col-' + areaIdDic[id])
      }
      $this.attr('data-title', title)
    })
    for (let k = 0; k < waitDeleteAreaId.length; k++) {
      $('#' + waitDeleteAreaId[k]).remove()
    }
  }
  _addSingleArea(id, item) {
    const areaStr = ` <div class=" c-columns-${item.Columns} c-col-${item.Percent} c-col-md-{{item.MobilePercent}}  Area  fmcontrol dashed-line {{if item.Html==''}}sm-empty{{/if}}""
    id="${id}" data-pc-percent="${item.Percent}" data-mb-percent="${item.MobilePercent}" data-title="${item.Title}"></div>`
    const $area = $(areaStr)
    this._control.find('.columns-inner').append($area)
  }
  resize() {
    if (!isDesign()) {
      // 窗口大小变化后重新获取响应的值 offsetTop  outerHeight ……
      this.toggleSticky({ toggleSticky: this._dataConf.toggleSticky })
    }
    const _this = this
    if ($('#columns-space-hidden-' + this._id)[0]) {
      $('#columns-space-hidden-' + this._id).remove()
    }
    let style = document.createElement('style')
    style.id = 'columns-space-hidden-' + this._id
    document.head.appendChild(style)
    let sheet = style.sheet
    sheet.addRule(`.${this._id} .Area::after`, `display: none !important`)
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(function () {
      _this.resetSpaceLinePosition()
      if ($('#columns-space-hidden-' + _this._id)[0]) {
        $('#columns-space-hidden-' + _this._id).remove()
      }
    }, 350)
  }
  toggleSticky(data) {
    this._dataConf['toggleSticky'] = data.toggleSticky
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
    if (isDesign()) return
    if (data.toggleSticky) {
      // 设置吸顶效果 绑定滚动事件
      $(window)
        .off(Event.SCROLL_DATA_API + this._id)
        .on(
          Event.SCROLL_DATA_API + this._id,
          $.proxy(this.throttle(this.scroll, 20, { leading: false }), this)
        )
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // 延迟获取容器的高度 避免容器内有其他空间 无法获取真实高度
        this._originHeight = this._control.outerHeight(true)
        this._control.css('height', this._originHeight + 'px')
        this.offsetTop = this._control.offset().top // 避免添加或者删除其他控件时改变自身的offsetTop
        clearTimeout(this.timer)
      }, 20)
    } else {
      // 解绑吸顶操作
      clearTimeout(this.timer)
      this.timer = null
      $(window).off(Event.SCROLL_DATA_API + this._id)
      $(window).off(Event.RESIZE + this._id)
      this._control.css('height', 'auto')
      this._control.removeClass('sticky')
      this.setBodyTop(0)
    }
  }
  scroll() {
    // 重新获取container-warp高度 避免添加或删除容器内控件 高度变化。  因为此时容器已设置高度所以获取的sticky
    let newHeight = this._control.find('.container-warp').outerHeight(true)
    if (newHeight !== this._originHeight) {
      this._originHeight = newHeight
      this._control.css('height', this._originHeight + 'px')
    }
    let scrollTop = $(window).scrollTop()
    if (this.offsetTop - scrollTop <= 0) {
      this._control.addClass('sticky')
      this.setBodyTop(this._originHeight)
    } else {
      this._control.removeClass('sticky')
      this.setBodyTop(0)
    }
  }
  setBodyTop(val) {
    $('body').css('paddingTop', val)
  }
  // 节流方法
  throttle(func, wait, options) {
    // trailing 最后一次应该触发(默认触发)；
    let args,
      context,
      previous = 0,
      timeout
    let later = function () {
      previous = options.leading === false ? 0 : Date.now()
      func.apply(context, args)
      args = context = null
    }
    let throttled = function () {
      args = arguments
      context = this
      let now = Date.now() // 现在的时间
      if (!previous && options.leading === false) previous = now
      let remaning = wait - (now - previous)
      if (remaning <= 0) {
        // 第一次
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        func.apply(context, args)
        previous = now
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaning)
      }
    }
    return throttled
  }
  // Static
  static atlasInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Columns($this.attr('id'), $this.attr('data-c-style'))
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
    return this.each(function () {
      Columns.atlasInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Columns.jQueryInterface
$.fn[NAME].Constructor = Columns
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Columns.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default Columns
