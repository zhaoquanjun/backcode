/* eslint-disable no-undef */
import template from '../../templateengine/index'
const NAME = 'carouselshow_style2'
const DATA_KEY = 'st.carouselshowstyle2'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()

const INNER_TEM = `
<div class="swiper-container swiper-{{_Id}} ">
  <div class="swiper-wrapper">
    {{each childArea item i}}
    <div
      style="background-color: {{item.BgColor}}; background-image: url({{item.Src}}); background-repeat: {{item.BgRepeat}}; background-size: {{item.BgSize}}; background-position: {{item.BgPosition}}; background: linear-gradient({{item.Violet}}, {{item.Gradientstartcolor}}, {{item.Gradientendcolor}})"
      class="swiper-slide Area fmcontrol"
      data-title="{{item.Id}}"
      id="{{item.Id}}_{{_Id}}"
    >
      {{@item.Html}}
    </div>
    {{/each}}
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
</div>
`
const templates = {}
templates[
  'style2'
] = `<div id="{{_Id}}" class="c-carouselshow slide {{_SysClass}}" data-c-effect="{{effect}}"  data-config='{"carouselPaginationType":{{carouselPaginationType}}' data-ride="carouselshow" data-c-style="{{_Style}}">${INNER_TEM}</div>`

class Carouselshowstyle2 {
  constructor(id, style, options) {
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, options)
    this.swiper_params = {
      navigation: {
        //左右箭头
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        // 焦点
        el: '.swiper-pagination',
        type: this._control.attr('data-c-paginationType'),
        clickable: true
      },
      loop: true, // 环路
      keyboard: true, // 键盘控制
      autoplay: false,
      effect: this._control.attr('data-c-effect'),
      fadeEffect: {
        crossFade: true
      }
    }
  }
  _init() {
    this.swiper = new Swiper('.swiper-' + this._id, this.swiper_params)
    this._control.data(DATA_KEY, this)
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
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html = template(cacheKey, INNER_TEM, data)
    document.getElementById(this._id).innerHTML = html
    this._init()
    if (typeof callback === 'function') {
      callback(this._id)
    }
  }

  changeEffect(data) {
    this._control.attr('data-c-effect', data.effect)
    this.swiper_params.effect = data.effect
    this.refreshControl(data)
  }

  changePaginationType(data) {
    this._control.attr('data-c-paginationType', data.paginationType)
    this.swiper_params.pagination.type = data.paginationType
    this.refreshControl(data)
  }
  to(index) {
    if (this.swiper_params.loop) {
      this.swiper.slideTo(index + 1, 500, false)
    } else {
      this.swiper.slideTo(index, 500, false)
    }
  }
  // Static
  static carouselshowInterface(element, config) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Carouselshowstyle2($this.attr('id'), $this.attr('data-c-style'))
      data._init()
    }

    if (typeof config === 'number') {
      data.to(config)
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError(`No method named "${action}"`)
      }
    }
  }

  static jQueryInterface(config) {
    var args = Array.prototype.slice.call(arguments, 1)
    return this.each(function () {
      Carouselshowstyle2.carouselshowInterface(this, config, args)
    })
  }
}
const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Carouselshowstyle2.jQueryInterface
$.fn[NAME].Constructor = Carouselshowstyle2
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Carouselshowstyle2.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default Carouselshowstyle2
