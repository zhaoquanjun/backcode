/* eslint-disable no-undef */
import Base, { Default } from '../base/base.js'
import template from '../../templateengine/index'
const NAME = 'carousel_style2'
const DATA_KEY = 'st.carouselstyle2'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()

const INNER_TEM_Style2 = `
  <div class="swiper-container gallery-top galleryTop_{{_Id}}">
  <div class="swiper-wrapper">
  {{each imgList item i}} 
    <div class="swiper-slide">
      <a
        class="linkArea"
        href="{{item.Href}}"
        target="_blank"
        data-type="{{item.Ctype}}"
        ><img
          src="{{item.Src}}"
          class="object-fit--cover"
          data-object-fit="cover"
          alt="{{item.Alt}}"
      /></a>
    </div>
    {{/each}}
  </div>
  <div class="swiper-button-next swiper-button-white"></div>
  <div class="swiper-button-prev swiper-button-white"></div>
</div>
<div class="swiper-container gallery-thumbs galleryThumbs_{{_Id}}">
  <div class="swiper-wrapper">
  {{each imgList item i}} 
    <div class="swiper-slide">
      <a
        class="linkArea"
        href="{{item.Href}}"
        target="_blank"
        data-type="{{item.Ctype}}"
        ><img
          src="{{item.Src}}"
          class="object-fit--cover"
          data-object-fit="cover"
          alt="{{item.Alt}}"
      /></a>
    </div>
    {{/each}}
  </div>
</div>
 `
const templates = {}
templates[
  'style2'
] = `<div id="{{_Id}}" data-c-type="carousel" class="c-carousel slide {{_SysClass}}" data-c-style="{{_Style}}" data-c-effect="{{effect}}" data-c-autoplay="{{autoplay}}" >${INNER_TEM_Style2}</div>`

class CarouselStyle2 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, Default, options)
    this.swiper_params = {
      galleryThumbs: {
        spaceBetween: 10,
        slidesPerView: 5,
        loop: false,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      },
      galleryTop: {
        spaceBetween: 10,
        loop: false,
        effect: this._control.attr('data-c-effect'),
        autoplay: JSON.parse(this._control.attr('data-c-autoplay')),
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        thumbs: {
          swiper: null
        }
      }
    }
  }
  _init() {
    this.galleryThumbs = new Swiper('.galleryThumbs_' + this._id, this.swiper_params.galleryThumbs)
    this.swiper_params.galleryTop.thumbs.swiper = this.galleryThumbs
    this.galleryTop = new Swiper('.galleryTop_' + this._id, this.swiper_params.galleryTop)

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
    let html = template(cacheKey, INNER_TEM_Style2, data)
    document.getElementById(this._id).innerHTML = html
    this._init()
    if (typeof callback === 'function') {
      callback(this._id)
    }
  }

  changeEffect(data) {
    this._control.attr('data-c-effect', data.effect)
    this.swiper_params.galleryTop.effect = data.effect
    this.refreshControl(data)
  }

  changeAutoplay(data) {
    this._control.attr('data-c-autoplay', data.autoplay)
    this.swiper_params.galleryTop.autoplay = data.autoplay
    this.refreshControl(data)
  }

  to(index) {
    if (this.swiper_params.galleryTop.loop) {
      this.galleryThumbs.slideTo(index + 1, 500, false)
    } else {
      this.galleryThumbs.slideTo(index, 500, false)
    }
  }
  // Static
  static carouselInterface(element, config, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    let _config = Default

    if (typeof config === 'object') {
      _config = $.extend({}, CarouselStyle2.DEFAULTS, config)
    }

    const action = typeof config === 'string' ? config : _config.slide

    if (!data) {
      data = new CarouselStyle2($this.attr('id'), $this.attr('data-c-style'))
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
      CarouselStyle2.carouselInterface(this, config, args)
    })
  }
}
const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = CarouselStyle2.jQueryInterface
$.fn[NAME].Constructor = CarouselStyle2
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return CarouselStyle2.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default CarouselStyle2
