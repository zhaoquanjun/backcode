/**
 * ----------------------------------------
 * SmartUi(v0.1):section.js
 * ----------------------------------------
 */
import { isDesign } from '../env/index'
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
const DATA_KEY = 'st.section'
const NAME = 'section'
const EVENT_KEY = `.${DATA_KEY}`
const $ = getjQuery()
const templates = {}
templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="section" class="c-row c-section dashed-line {{_SysClass}}" data-conf='{"toggleSticky":{{toggleSticky}}}'>
<div class="container-warp">    
{{each childArea item i}}
    <div class="Area {{if item.Html==''}}sm-empty{{/if}} dashed-line" id="{{item.Id}}_{{_Id}}">
        {{@item.Html}}
    </div>
    {{/each}}
    </div>
</div>`
const Event = {
  SCROLL_DATA_API: `scroll${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`
}

class Section {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + this._id)
    this._type = 'section'
    this._style = style
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
      this._addEventListeners()
    }
  }
  _addEventListeners() {
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
  changToFull() {
    this._control.attr('data-full-fill', true)
  }
  changeToNotFull() {
    this._control.attr('data-full-fill', false)
  }
  resize() {
    // 窗口大小变化后重新获取响应的值 offsetTop  outerHeight ……
    if (!isDesign()) {
      this.toggleSticky({ toggleSticky: this._dataConf.toggleSticky })
    }
  }
  toggleSticky(data) {
    this._dataConf['toggleSticky'] = data.toggleSticky
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
    console.log(data, isDesign())
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
      this.setBodyTop(this._originHeight)
      this._control.addClass('sticky')
    } else {
      this.setBodyTop(0)
      this._control.removeClass('sticky')
      this._control.css('height', 'auto')
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
      data = new Section($this.attr('id'), $this.attr('data-c-style'))
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
      Section.atlasInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Section.jQueryInterface
$.fn[NAME].Constructor = Section
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Section.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default Section
