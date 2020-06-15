import Base, { PREVIEW_INNER_TEM, Event, Selector } from '../base/base.js'
import { isDesign } from '../../env/index'
import template from '../../templateengine/index'
const NAME = 'atlas_style3'
const DATA_KEY = 'st.atlasstyle3'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()
const INNER_TEM_Style3 = ` {{each imgList item i}}    
                            <li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}" data-slide-to="{{i}}">
                                      <a class="linkArea" href="{{item.Href}}" target="_blank" data-type="{{item.Ctype}}" data-slide-to="{{i}}">             
                                        <div class="list-space">
                                          <div class="imgview">
                                              <img src="{{item.Src}}" class="imgSrc">
                                          </div>
                                          <div class="list-content title ellipsis">
                                              {{item.Name}}   
                                          </div>
                                        </div>  
                                    </a>
                            </li>
                           {{/each}}`
const templates = {}
templates[
  'style3'
] = `<div class="atlas {{_SysClass}}" id="{{_Id}}" data-c-type="atlas" data-percent="{{percent}}"  data-conf='{"percent":"{{percent}}","mobilePercent":"{{mobilePercent}}"}'>
        <div class="altas-list__area" >
        <ul class="atlas-list">${INNER_TEM_Style3}</ul>
        <div class="move-prev translate-icon__area"></div>
        <div class="move-next translate-icon__area"></div>
        </div>
        <div class="atlas-preview">
        ${PREVIEW_INNER_TEM}
        </div>
      </div>`

class AtlasStyle3 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, options)
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
  }
  _init() {
    this._addEventListeners()
    this._baseInit()
    this._control.data(DATA_KEY, this)

    this.loadWaterfall()
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
    let inner_template = INNER_TEM_Style3
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
    $(window)
      .off(Event.RESIZE + this._id)
      .on(Event.RESIZE + this._id, $.proxy(this.resize, this))
    if (this._touchSupported) {
      this._addTouchPrevSwiperEvent()
    }
  }
  resize() {
    clearTimeout(timer)
    let timer = setTimeout(() => {
      this.imgWaterfall()
      clearTimeout(timer)
    }, 200)
  }
  // 获得数组中数值为val的下标
  getHeightIndex(arr, val) {
    for (let i in arr) {
      if (arr[i] === val) {
        return i
      }
    }
  }
  // 获取图片的尺寸，绝对定位设置相对位置
  imgWaterfall(percent) {
    let imgs = this._control.find(Selector.IMGSRC)
    let imgView = this._control.find(Selector.IMGVIEW)
    let listItem = this._control.find(Selector.LIST_ITEM)
    let atlasList = this._control.find(Selector.ATLAS_LIST)
    let imgWidth
    let imgHeight
    let hArr = []
    let padding
    percent =
      percent || this._control.attr('data-percent') || this._dataConf.percent
    if (parseFloat($(atlasList).css('width')) < 375) {
      percent = 2
    }
    imgs.each(function (index, el) {
      imgWidth = $(el).css('width')
      imgHeight = $(el).css('height')
      $(imgView[index]).css('height', imgHeight)
      padding = $(listItem[index]).css('padding')
      $(listItem[index]).css(
        'height',
        parseFloat(imgHeight) + parseFloat(padding) * 2 + 'px'
      )
    })
    for (let i = 0; i < imgs.length; i++) {
      $(listItem[i]).css('position', 'absolute')
      if (i < percent) {
        hArr.push(parseFloat($(imgs[i]).css('height')))
        $(listItem[i]).css({
          top: '0',
          left: (parseFloat(imgWidth) + parseFloat(padding) * 2) * i + 'px'
        })
      } else {
        let minH = Math.min.apply(null, hArr)
        let MinIndex = this.getHeightIndex(hArr, minH)
        $(listItem[i]).css({
          top: minH + parseFloat(padding) * 2 + 'px',
          left: $(listItem[MinIndex]).css('left')
        })
        hArr[MinIndex] += parseFloat($(listItem[i]).css('height'))
      }
      $(atlasList).css(
        'height',
        Math.max.apply(null, hArr) + parseFloat(padding) * 2 + 'px'
      )
    }
  }
  loadWaterfall() {
    let $imgs = this._control.find(Selector.IMGSRC)
    console.log($imgs)

    let num = $imgs.length
    $imgs
      .on('error', function () {
        $(this).attr(
          'src',
          'https://nwzimg.clouddream.net/newwezhan/base/control/designerImg/video/video_replay.png'
        )
      })
      .on('load', () => {
        num--
        if (num > 0) {
          return
        }
        this.imgWaterfall()
        console.log('reshow')
        if (
          window.smDesigner &&
          typeof window.smDesigner.reshowCurControlSetting === 'function'
        ) {
          console.log('reshow3333333')
          window.smDesigner.reshowCurControlSetting()
        }
      })
  }
  // Static
  static atlasInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new AtlasStyle3($this.attr('id'), $this.attr('data-c-style'))
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
      AtlasStyle3.atlasInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = AtlasStyle3.jQueryInterface
$.fn[NAME].Constructor = AtlasStyle3
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return AtlasStyle3.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default AtlasStyle3
