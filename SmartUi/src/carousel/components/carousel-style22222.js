import Base, { Default, Event, ClassName, Selector } from '../base/base.js'
import { isDesign } from '../../env/index'
import template from '../../templateengine/index'
const NAME = 'carousel_style2'
const DATA_KEY = 'st.carouselstyle2'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()

const WIDTH = 992

const INNER_TEM_Style2 = ` {{ if imgList.length>0 }}
                    <div class="prev-image_large">
                      <a class="linkArea" href="{{imgList[0].Href}}" target="_blank" data-type="{{imgList[0].Ctype}}">
                        <div class="list-space">
                          <div class="imgview">
                            <img class="imgSrc object-fit--cover"  data-object-fit="cover" src="{{imgList[0].Src}}">
                          </div>
                        </div>
                      </a>
                    </div>
                    {{ /if }}
                    <div class="carousel-list__area" >
                      <div class="carousel-list-center">
                        <ul class="carousel-list {{ if imgList.length < 4 }}contentCenter{{ /if }}">
                          {{each imgList item i}}    
                            <li class="list-item col-item4 {{if i==0}}transition{{/if}}" data-slide-to="{{i}}">    
                              <div class="list-space">
                                <div class="imgview">
                                    <img src="{{item.Src}}" class="imgSrc object-fit--cover"  data-object-fit="cover" data-href="{{item.Href}}">
                                </div>
                                <div class="list-content">
                                  <div class="title ellipsis">{{item.Name}}</div>
                                </div>
                              </div>  
                            </li>
                          {{/each}}
                        </ul>
                      </div>
                      <div class="move-prev translate-icon__area carousel-control-prev" data-slide="prev"><i class="iconfont {{icon}} carousel-control-prev-icon"></i></div>
                      <div class="move-next translate-icon__area carousel-control-next"  data-slide="next"><i class="iconfont {{icon}} carousel-control-next-icon"></i></div>
                      <ol class="carousel-indicators">
                    {{each imgList item i}}
                        <li data-slide-to="{{i}}" class="{{if i==0}}active{{/if}}"></li>
                    {{/each}}
                    </ol>
                    </div>`
const templates = {}
templates[
  'style2'
] = `<div id="{{_Id}}" data-c-type="carousel" class="c-carousel slide {{_SysClass}}" data-c-style="{{_Style}}" data-conf='{"icon":"{{icon}}"}}'><div class="carousel-container">${INNER_TEM_Style2}</div> </div>`

class CarouselStyle2 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._config = $.extend({}, Default, options)

    this.swiperIndex = 0
  }
  _init() {
    this._indicatorsElement = this._control.find(Selector.INDICATORS)
    this._addEventListeners()
    this.initMl()
    this._control.data(DATA_KEY, this)
  }
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data.icon = this._dataConf.icon
    const cacheKey = DATA_KEY + '_' + this._style

    return template(cacheKey, templates[this._style], data)
  }

  refreshControl(data, callback) {
    this.dispose()
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data.icon = this._dataConf.icon
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html = template(cacheKey, INNER_TEM_Style2, data)
    document.getElementById(this._id).innerHTML = html

    this._init()
    if (typeof callback === 'function') {
      callback(this._id)
    }
  }

  _addEventListeners() {
    if (!isDesign()) {
      if (this._config.keyboard) {
        this._control
          .off(Event.KEYDOWN)
          .on(Event.KEYDOWN, $.proxy(this._keydown, this))
      }

      if (this._config.pause === 'hover') {
        this._control
          .off(Event.MOUSEENTER)
          .on(Event.MOUSEENTER, $.proxy(this.pause, this))
        this._control
          .off(Event.MOUSELEAVE)
          .on(Event.MOUSELEAVE, $.proxy(this.cycle, this))
      }
      this._control
        .off(Event.CLICK_DATA_API)
        .on(
          Event.CLICK_DATA_API,
          Selector.DATA_SLIDE,
          $.proxy(this._prevNextClick, this)
        )
      this._control
        .find(Selector.LINK_AREA)
        .off(Event.CLICK_DATA_API)
        .on(Event.CLICK_DATA_API, $.proxy(this._downloadFile, this))

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners()
      }
    }
    $(window)
      .off(Event.RESIZE + this._id)
      .on(Event.RESIZE + this._id, $.proxy(this.resize, this))
  }

  /**
   * @name style2初始化左外边距
   */
  initMl() {
    let imgList = this._control.find(Selector.CAROUSEL_LIST)
    let listItem = imgList.children()
    imgList
      .find('li.list-item')
      .eq(0)
      .attr({
        ml: 0
      })
      .addClass('transition')
      .css('margin-left', 0)
    if (listItem.length < 4) {
      this._control.find('.translate-icon__area').addClass('disabled')
    } else {
      this._control.find('.translate-icon__area').removeClass('disabled')
      // const winW = $(window).width()
      // if(winW > WIDTH) {
      this.cloneItem('list')
      // } else {
      //   this.cloneItem('item')
      // }
    }
  }
  resize() {
    let imgList = this._control.find(Selector.CAROUSEL_LIST)
    this.swiperIndex = 0
    const firstItem = imgList.find('li.list-item').eq(0)
    firstItem
      .attr({
        ml: 0
      })
      .css('margin-left', 0)
    const winW = $(window).width()
    if (winW > WIDTH) {
      this._control
        .find('.prev-image_large .imgSrc')
        .attr('src', firstItem.find(Selector.IMGSRC).attr('src'))
      this._control
        .find('.prev-image_large .linkArea')
        .attr('href', firstItem.find(Selector.IMGSRC).attr('data-href'))
    } else {
      this._indicatorsElement
        .find('.' + ClassName.ACTIVE)
        .removeClass(ClassName.ACTIVE)
      $(this._indicatorsElement.children()[0]).addClass(ClassName.ACTIVE)
    }
  }
  /**
   * @name style2右侧面板更换icon
   * @param {*} data
   */
  changeIconDisplay(data) {
    let display = data && data['iconDisplay'] ? data['iconDisplay'] : 'block'
    let icon = data && data['icon'] ? data['icon'] : ''
    this._control.find('i.iconfont').map((i, it) => {
      $(it).css({
        display: display
      })
      $(it)
        .removeClass()
        .addClass('iconfont ' + icon)
    })
    this._dataConf.icon = icon
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }
  /**
   * @name style2 点击小图替换大图
   */
  replaceLargeImage(e) {
    const winW = $(window).width()
    if (winW > WIDTH) {
      let $target = $(e.currentTarget)
      let slideNum = parseInt($target.attr('data-slide-to'))
      if ($target.hasClass('pc-item')) {
        slideNum +=
          this._control.find(Selector.CAROUSEL_LIST).children().length / 2
      }
      this.swiperIndex = slideNum
      const src = $target.find(Selector.IMGSRC).attr('src')
      const href = $target.find(Selector.IMGSRC).attr('data-href')
      this._control.find('.prev-image_large .imgSrc').attr('src', src)
      this._control.find('.prev-image_large .linkArea').attr('href', href)
    }
  }
  /**
   * @name style2 点击前后箭头 加载下一张图片
   * @param num +1:下一个; -1:上一个
   */
  clickLoadImage(num) {
    const winW = $(window).width()
    let imgList = this._control.find(Selector.CAROUSEL_LIST)
    const firstItem = imgList.find('li.list-item').eq(0)
    let length = this._control.find(Selector.LIST_ITEM).length
    let percent
    let marginLeft
    let src
    let href
    let $nextIndicator

    if (length === 1) {
      this.swiperIndex = 0
      return
    }
    if (winW <= WIDTH) {
      percent = 1

      if (this._indicatorsElement.length) {
        this._indicatorsElement
          .find('.' + ClassName.ACTIVE)
          .removeClass(ClassName.ACTIVE)
        let activeIndex
        // 移动端 下一个 左滑
        if (num === +1) {
          if (this.swiperIndex < length / 2 - 1) {
            activeIndex = this.swiperIndex + 1
          } else {
            if (this.swiperIndex === length / 2 - 1) {
              activeIndex = 0
            } else {
              activeIndex = this.swiperIndex - length / 2
            }
          }
        } else if (num === -1 && this.swiperIndex > 0) {
          // 移动端 上一个 右滑
          if (this.swiperIndex <= length / 2 - 1) {
            activeIndex = this.swiperIndex - 1
          } else {
            if (this.swiperIndex === length / 2) {
              activeIndex = length / 2 - 1
            } else {
              activeIndex = this.swiperIndex - length / 2
            }
          }
        }

        $nextIndicator = $(this._indicatorsElement.children()[activeIndex])
        $nextIndicator && $nextIndicator.addClass(ClassName.ACTIVE)
      }
    } else {
      percent = 4
    }
    // 第一张图片 上一张 处理
    if (this.swiperIndex === 0 && num === -1) {
      firstItem
        .removeClass('transition')
        .css('margin-left', (-(100 / percent) * length) / 2 + '%')
      this.swiperIndex = length / 2
      this.clickLoadImage(-1)
      return
    }

    this.swiperIndex += num
    marginLeft = -(100 / percent) * this.swiperIndex
    firstItem
      .attr({
        ml: this.swiperIndex
      })
      .addClass('transition')
    if (length >= percent) {
      firstItem.css('margin-left', marginLeft + '%')
    } else {
      firstItem.css('margin-left', 0)
      if (this.swiperIndex === length) {
        this.swiperIndex = 0
      }
    }

    src = imgList.find('li.list-item .imgSrc').eq(this.swiperIndex).attr('src')
    href = imgList
      .find('li.list-item .imgSrc')
      .eq(this.swiperIndex)
      .attr('data-href')
    this._control.find('.prev-image_large .imgSrc').attr('src', src)
    this._control.find('.prev-image_large .linkArea').attr('href', href)

    // 最后一张图片 下一张处理
    if (this.swiperIndex === length / 2 + 1) {
      this.swiperIndex = 0
      firstItem.removeClass('transition').css('margin-left', 0)
      this.clickLoadImage(+1)
    }
  }
  /**
   * @name 复制轮播元素，追加到父元素
   */
  cloneItem(type) {
    const listContainer = this._control.find(Selector.CAROUSEL_LIST)
    let cloneItem
    if (type === 'item') {
      cloneItem = listContainer.children().eq(0).clone().addClass('mobile-item')
    } else if (type === 'list') {
      cloneItem = listContainer.children().clone().addClass('pc-item')
    }
    listContainer.append(cloneItem)
  }
  next() {
    if (this._isSliding) return
    this.clickLoadImage(+1)
  }
  prev() {
    if (this._isSliding) return
    this.clickLoadImage(-1)
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
