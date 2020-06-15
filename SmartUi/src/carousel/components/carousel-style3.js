/* eslint-disable no-undef */
import Base, { Default } from '../base/base.js'
import template from '../../templateengine/index'
const NAME = 'carousel_style3'
const DATA_KEY = 'st.carouselstyle3'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()

const INNER_TEM_Style3 = `
<div class="swiper-container swiper-{{_Id}}">
    <div class="swiper-wrapper">
    {{each imgList item i}} 
      <div class="swiper-slide">
        <a class="linkArea" href="{{item.Href}}" target="_blank" data-type="{{item.Ctype}}">
          <img src="{{item.Src}}" class="object-fit--cover" data-object-fit="cover" alt="{{item.Alt}}">
        </a>
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
  'style3'
] = `<div id="{{_Id}}" data-c-type="carousel" class="c-carousel slide {{_SysClass}}" data-c-style="{{_Style}}" data-c-effect="{{effect}}" data-c-autoplay="{{autoplay}}" data-config='{"carouselPaginationType":{{carouselPaginationType}}'>${INNER_TEM_Style3}</div>`

class CarouselStyle3 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, Default, options)
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
      autoplay: JSON.parse(this._control.attr('data-c-autoplay')),
      effect: this._control.attr('data-c-effect'),
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true
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
    let html = template(cacheKey, INNER_TEM_Style3, data)
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

  changeAutoplay(data) {
    this._control.attr('data-c-autoplay', data.autoplay)
    this.swiper_params.autoplay = data.autoplay
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
    this.swiper.pagination.update()
  }
  // Static
  static carouselInterface(element, config, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    let _config = Default

    if (typeof config === 'object') {
      _config = $.extend({}, CarouselStyle3.DEFAULTS, config)
    }

    const action = typeof config === 'string' ? config : _config.slide
    if (!data) {
      data = new CarouselStyle3($this.attr('id'), $this.attr('data-c-style'))
      data._init()
    }

    if (typeof config === 'number') {
      data.to(config)
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError(`No method named "${action}"`)
      }

      data[action](args)
    } else if (_config.interval) {
      data.pause()
      data.cycle()
    }
  }

  static jQueryInterface(config) {
    var args = Array.prototype.slice.call(arguments, 1)
    return this.each(function () {
      CarouselStyle3.carouselInterface(this, config, args)
    })
  }
}
const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = CarouselStyle3.jQueryInterface
$.fn[NAME].Constructor = CarouselStyle3
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return CarouselStyle3.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default CarouselStyle3
