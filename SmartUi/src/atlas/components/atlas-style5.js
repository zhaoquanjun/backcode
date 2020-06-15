import Base, {
  PREVIEW_INNER_TEM,
  Direction,
  Event,
  Selector
} from '../base/base.js'
import { isDesign } from '../../env/index'
import template from '../../templateengine/index'
const NAME = 'atlas_style5'
const DATA_KEY = 'st.atlasstyle5'

import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()
const WIDTH = 992
const INNER_TEM_Style5 = ` {{each imgList item i}}    
                            <li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}" data-slide-to="{{i}}">
                                <a class="linkArea" href="{{item.Href}}" target="_blank" data-type="{{item.Ctype}}" data-slide-to="{{i}}">    
                                  <div class="list-space">
                                        <div class="imgview">
                                            <img class="imgSrc object-fit--cover" data-object-fit="cover"  src="{{item.Src}}">
                                        </div>
                                        <div class="list-content">
                                          <div class="line"></div>
                                          <div class=" title ellipsis">{{item.Name}}</div>
                                        </div>
                                    </div>  
                                </a>    
                            </li>
                          {{/each}}`
const templates = {}

templates[
  'style5'
] = `<div class="atlas {{_SysClass}}" id="{{_Id}}" data-c-type="atlas" data-percent="{{percent}}"  data-conf='{"percent":"{{percent}}","mobilePercent":"{{mobilePercent}}","icon":"{{icon}}"}'>
<div class="altas-list__area" >
        <ul class="atlas-list">${INNER_TEM_Style5}</ul>
        <div class="move-prev swiper-button translate-icon__area disabled"><i class="iconfont iconicon-des-Arrowleft1"></i></div>
        <div class="move-next swiper-button  translate-icon__area"><i class="iconfont iconicon-des-Arrow"></i></div>
        </div>
        <div class="atlas-preview">
        ${PREVIEW_INNER_TEM}
        </div>                                                                  
    </div>`

class AtlasStyle5 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, options)
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0

    this.style5Index = 0
  }
  _init() {
    this._addEventListeners()
    this._initOriginMl()
    this._checkPrevAndNextBtnStatus()
    this._baseInit()
    this.cloneItem()
    this._control.data(DATA_KEY, this)

    this._atlasListTotal = this._control
      .find(Selector.ATLAS_LIST)
      .children()
      .filter(function () {
        return $(this).css('display') != 'none'
      }).length
  }
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data._Style = this._style
    data._Query = JSON.stringify(data.query)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  refreshControl(data, callback) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_inner' + this._style
    let inner_template = INNER_TEM_Style5
    const html = template(cacheKey, inner_template, data)
    this._control.find(Selector.ATLAS_LIST).html(html)
    this.baseRefreshControl(data)
    this._init()
    typeof callback === 'function' && callback(this._id)
  }
  _addEventListeners() {
    if (!isDesign()) {
      /** 点击图片 begin 继承Base */
      this._control
        .find(Selector.ACTIVE_ITEM)
        .off(Event.CLICK_DATA_API)
        .on(Event.CLICK_DATA_API, $.proxy(this._handleClickPic, this))
      /** 点击图片 end */
    }

    /** 预览图片绑定的事件 begin 继承Base */
    this._control
      .find(Selector.GALLERY_ITEM)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.changeThumbSelected, this))
    //关闭预览大图
    this._control
      .find(Selector.DIALOG_CLOSE_BTN)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.closePreview, this))
    // 点击按钮切换图片
    this._control
      .find(Selector.SLIDE_BNT)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._prevNextClick, this))
    // 点击按钮切换图片
    this._control
      .find(Selector.SPEC_ARROW)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._prevNextClick, this))
    this._control
      .find('.lz-see-change')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.scaling, this))
    /** 预览图片绑定的事件  end */

    if (this._config.keyboard) {
      this._control
        .off(Event.KEYDOWN)
        .on(Event.KEYDOWN, $.proxy(this._keydown, this))
    }

    if (!this._touchSupported) {
      /** pc端下 常态下点击左右箭头事件  begin  继承Base*/
      this._control
        .find(Selector.SWIPER_BUTTON)
        .off(Event.CLICK_DATA_API)
        .on(Event.CLICK_DATA_API, $.proxy(this._handlerClickSlideBtn, this))
    }

    /** 常态下点击左右箭头事件  end */
    if (this._touchSupported) {
      this._addTouchPrevSwiperEvent()
      this._addTouchSwiperEvent()
      this._control
        .find(Selector.MOVE_PREV)
        .off(Event.CLICK_DATA_API)
        .on(Event.CLICK_DATA_API, $.proxy(this._movePrev, this))
      this._control
        .find(Selector.MOVE_NEXT)
        .off(Event.CLICK_DATA_API)
        .on(Event.CLICK_DATA_API, $.proxy(this._moveNext, this))
    }
  }

  // style6 点击左右按钮
  _handlerClickSlideBtn(e) {
    let $this = $(e.currentTarget)
    const direct = $this.attr('data-slide')
    let _atlasListTotal = this._atlasListTotal - this._dataConf.percent
    if (direct === Direction.NEXT) {
      if (_atlasListTotal <= 0 || this.style5Index + 1 > _atlasListTotal) {
        this._disabledNextMoveBtn()
        return
      }
      this.style5Index++
      this.style5Index >= 1 && this._enablePrevMoveBtn()
    } else {
      this.style5Index--
      if (this.style5Index < 0) {
        this.style5Index = 0
        return
      }
      this.style5Index <= 0 && this._disabledPrevMoveBtn()
      this._enableNextMoveBtn()
    }
    this.winW = $(window).width()
    let percent =
      this.winW > WIDTH ? this._dataConf.percent : this._dataConf.mobilePercent
    let marginLeftValue
    if (this.winW > WIDTH) {
      if (this.style5Index === _atlasListTotal) {
        this._disabledNextMoveBtn()
        marginLeftValue = (90 / percent) * (this.style5Index - 1)
        marginLeftValue = marginLeftValue + (90 / percent - 10)
      } else {
        marginLeftValue = (90 / percent) * this.style5Index
      }
    } else {
      marginLeftValue = (100 / percent) * this.style5Index
    }

    this._control
      .find(Selector.ATLAS_LIST)
      .stop()
      .animate({
        marginLeft: -marginLeftValue + '%'
      })
  }
  // Static
  static atlasInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new AtlasStyle5($this.attr('id'), $this.attr('data-c-style'))
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
      AtlasStyle5.atlasInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = AtlasStyle5.jQueryInterface
$.fn[NAME].Constructor = AtlasStyle5
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return AtlasStyle5.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default AtlasStyle5
