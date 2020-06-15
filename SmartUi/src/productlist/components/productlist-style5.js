import Base, { $, WIDTH, Selector, Default, Event } from '../base/base.js'
import { isDesign } from '../../env/index'
import template from '../../templateengine/index'
const NAME = 'productlist_style5'
const DATA_KEY = 'st.productlist_style5'
import { getSysClass } from '../../util'
const templates = {}
const INNER_LIST = `{{each listData item i}} 
                    <li class="real-item list-item col-item{{percent}} col-md-item{{mobilePercent}}">
                      <div class="img--mask"></div>
                      <a href="product/{{if productDetailPageId}}{{productDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}"> 
                        <div class="imgview">
                          <img src="{{item.CoverUrl}}" alt="" class="object-fit--cover"   data-object-fit="cover">
                        </div>
                        <div class="list-content">
                          <h1 class="title ellipsis">{{item.Name}}</h1>
                          <div class="desc">
                            <p class=" productlist-ellipsis productlist-ellipsis2">{{item.Description}}</p>
                          </div>
                          <div class="price__wrapper">
                            <h1 class="price">{{item.Price}}</h1>
                            <button class="look-more">{{buttonName}} ></button>
                          </div>
                        </div>
                      </a>
                    </li>
                    {{/each}}
                  {{each listData item i}}
                  {{if i < pcReplenish && listData.length > percent }}
                  <li
                    class="list-item col-item{{percent}} col-md-item{{mobilePercent}} pc-invisible-blank slide-invisible-blank">
                  </li>
                  {{/if}}
                  {{/each}}
                  {{each listData item i}}
                  {{if i < percent && listData.length > percent}}
                  <li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}">
                    <div class="img--mask"></div>
                    <a href="product/{{if productDetailPageId}}{{productDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}"> 
                      <div class="imgview">
                        <img src="{{item.CoverUrl}}" alt="" class="object-fit--cover"   data-object-fit="cover">
                      </div>
                      <div class="list-content">
                        <h1 class="title ellipsis">{{item.Name}}</h1>
                        <div class="desc">
                          <p class=" productlist-ellipsis productlist-ellipsis2">{{item.Description}}</p>
                        </div>
                        <div class="price__wrapper">
                          <h1 class="price">{{item.Price}}</h1>
                          <button class="look-more">{{buttonName}} ></button>
                        </div>
                      </div>
                    </a>
                  </li>
                  {{/if}}
                  {{/each}}`
const INDICATORS_LIST = ` {{each listData item i}}
                          {{if i < pageCount}}
                            <li data-mode="pc" data-slide-to="{{i}}" class="pc-indicators {{if i==0 }}active{{/if }}">{{i}}{{pageCount}}{{mobilePageCount}}</li>
                          {{/if}}
                          {{if i < mobilePageCount}}
                            <li data-mode="mobile" data-slide-to="{{i}}" class="mobile-indicators {{if i==0 }}active{{/if }}"></li>
                          {{/if}}
                          {{/each}}`

const INNER_TEM = `
                    <ol class="carousel-indicators"> ${INDICATORS_LIST}</ol>
                    <ul class="product-list product-list-style2">${INNER_LIST}</ul>
                     `

templates[
  'style5'
] = `<div id="{{_Id}}" data-c-type="productlist" data-c-style="{{_Style}}" data-query='{{_Query}}'  data-pgrelId="pgn_{{_Id}}" data-ride="productlist"  data-conf='{ "pcReplenish":"{{pcReplenish}}", "mobileReplenish":"{{mobileReplenish}}", "percent":"{{percent}}", "buttonName":"{{buttonName}}", "pageCount":"{{pageCount}}", "mobilePageCount":"{{mobilePageCount}}" "target":"{{target}}","productDetailPageId":"{{productDetailPageId}}"}'>
                        <div class="productlist-wrap">
                            <div class="scroll-list">
                              ${INNER_TEM}
                            </div>
                        </div>
                    </div>`
export default class ProductListStyle5 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._control = $('#' + id)
    this._pgRelId = this._control.attr('data-pgrelId')
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._query = JSON.parse(this._control.attr('data-query'))
    this._style = style
    this._isPaused = false
    this.touchStartX = 0
    this.touchDeltaX = 0
    this._interval = null
    this._curIdx = 0
    this._config = $.extend({}, Default, options)
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
  }
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data._Style = this._style
    data._Query = JSON.stringify(data.query)
    const cacheKey = DATA_KEY + '_' + this._style
    this._renderInnerHtml(data)
    return template(cacheKey, templates[this._style], data)
  }
  refreshControl(data, callback) {
    this._dataConf.productDetailPageId = data.dataModel.productDetailPageId
    this._dataConf.percent = data.dataModel.percent
    this._dataConf.target = data.dataModel.target
    this._query = data.query
    this._control.attr('data-query', JSON.stringify(this._query))
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
    this._control.data(DATA_KEY, this)
    this.loadData(1, callback)
  }

  _renderInnerHtml(data) {
    data._Id = this._id
    const cacheKey = DATA_KEY + '_inner' + this._style
    data.pageCount = Math.ceil(data.listData.length / this._dataConf.percent)
    data.mobilePageCount = Math.ceil(
      data.listData.length / this._dataConf.mobilePercent
    )

    data.pcReplenish =
      data.listData.length % this._dataConf.percent == 0
        ? 0
        : this._dataConf.percent -
          (data.listData.length % this._dataConf.percent)
    data.mobileReplenish =
      data.listData.length % this._dataConf.mobilePercent == 0
        ? 0
        : this._dataConf.mobilePercent -
          (data.listData.length % this._dataConf.mobilePercent)

    this.totalPage = data.pageCount
    this.mobilePage = data.mobilePageCount
    if (
      window.smDesigner &&
      typeof window.smDesigner.getControlDataById === 'function'
    ) {
      let controlData = window.smDesigner.getControlDataById(this._id)
      controlData.dataModel['pageCount'] = data.pageCount
      controlData.dataModel['mobilePageCount'] = data.mobilePageCount
      controlData.dataModel['pcReplenish'] = data.pcReplenish
      controlData.dataModel['mobileReplenish'] = data.mobileReplenish
      this._dataConf.mobilePageCount = data.mobilePageCount
      this._dataConf.pageCount = data.pageCount
      this._dataConf.pcReplenish = data.pcReplenish
      this._dataConf.mobileReplenish = data.mobileReplenish
      this._control.attr('data-conf', JSON.stringify(this._dataConf))
    }
    let html = template(cacheKey, INNER_LIST, data)
    let html2 = template(cacheKey + this._id, INDICATORS_LIST, data)
    $('#' + this._id)
      .find('.carousel-indicators')
      .html(html2)
    if (!isDesign()) {
      this._init()
    }
    this.dispose()
    $('#' + this._id)
      .find('.product-list')
      .html(html)

    this._setPageTotal(data.pageCount)
  }

  _appendInnerHtml(data) {
    if (data.listData.length > 0) {
      data._Id = this._id
      const cacheKey = DATA_KEY + '_inner'
      data.pageCount = Math.ceil(data.listData.length / this._dataConf.percent)
      data.mobilePageCount = Math.ceil(
        data.listData.length / this._dataConf.mobilePercent
      )

      data.pcReplenish =
        data.listData.length % this._dataConf.percent == 0
          ? 0
          : this._dataConf.percent -
            (data.listData.length % this._dataConf.percent)
      data.mobileReplenish =
        data.listData.length % this._dataConf.mobilePercent == 0
          ? 0
          : this._dataConf.mobilePercent -
            (data.listData.length % this._dataConf.mobilePercent)

      this.totalPage = data.pageCount
      this.mobilePage = data.mobilePageCount
      if (
        window.smDesigner &&
        typeof window.smDesigner.getControlDataById === 'function'
      ) {
        let controlData = window.smDesigner.getControlDataById(this._id)
        controlData.dataModel['pageCount'] = data.pageCount
        controlData.dataModel['mobilePageCount'] = data.mobilePageCount
        controlData.dataModel['pcReplenish'] = data.pcReplenish
        controlData.dataModel['mobileReplenish'] = data.mobileReplenish
        this._dataConf.mobilePageCount = data.mobilePageCount
        this._dataConf.pageCount = data.pageCount
        this._dataConf.pcReplenish = data.pcReplenish
        this._dataConf.mobileReplenish = data.mobileReplenish
        this._control.attr('data-conf', JSON.stringify(this._dataConf))
      }
      let html = template(cacheKey, INNER_LIST, data)
      let html2 = template(cacheKey + this._id, INDICATORS_LIST, data)
      $('#' + this._id)
        .find('.carousel-indicators')
        .html(html2)
      $('#' + this._id)
        .find('.product-list')
        .html(html)
      if (!isDesign()) {
        this._init()
      }
      this.dispose()
    }
  }
  _init() {
    this._productList = this._control.find(Selector.PRODUCT_LIST)
    this._productListItems = this._productList.children().filter(function () {
      return $(this).css('display') != 'none'
    })
    this._total = this._productListItems.length
    this._realItemsCount = this._control
      .find(Selector.PRODUCT_LIST)
      .find(Selector.REAL_ITEM).length
    this.totalPage = Math.ceil(this._realItemsCount / this._dataConf.percent)
    this.mobilePage = Math.ceil(
      this._realItemsCount / this._dataConf.mobilePercent
    )
    // this.remainder = this._total % this._dataConf.percent;
    this._curIdx = 0
    this._addEventListeners()

    this._control.data(DATA_KEY, this)
  }
  _addEventListeners() {
    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners()
    } else {
      this.cycle()
      this._control
        .off(Event.MOUSEENTER)
        .on(Event.MOUSEENTER, $.proxy(this.pause, this))
      this._control
        .off(Event.MOUSELEAVE)
        .on(Event.MOUSELEAVE, $.proxy(this.cycle, this))
    }

    this._control
      .find('.carousel-indicators')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.indicatorsClick, this))
    $(window)
      .off(Event.RESIZE + this._id)
      .on(Event.RESIZE + this._id, $.proxy(this.resize, this))
  }
  /**
   * 改变PC端显示每行个数
   * @param { Object } data.percent 每行显示个数
   */
  changeProductlistRowWidth(data, dataModel) {
    this._control.attr('data-percent', data.percent)
    const productList = this._control.find('.product-list')
    const $listItem = productList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-item${data.percent}`)

    this._dataConf.percent = data.percent
    this._control.attr('data-conf', JSON.stringify(this._dataConf))

    dataModel.pageCount = Math.ceil(dataModel.listData.length / data.percent)
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html2 = template(cacheKey + this._id, INDICATORS_LIST, dataModel)
    $('#' + this._id)
      .find('.carousel-indicators')
      .html(html2)
  }

  /**
   * 改变移动端显示每行个数
   * @param { Object } data.mobilePercent 每行显示个数
   */
  changeMobileProductlistRowWidth(data, dataModel) {
    const productList = this._control.find('.product-list')
    const $listItem = productList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-md-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-md-item${data.mobilePercent}`)
    this._dataConf.mobilePercent = data.mobilePercent
    this._control.attr('data-conf', JSON.stringify(this._dataConf))

    dataModel.mobilePageCount = Math.ceil(
      dataModel.listData.length / data.mobilePercent
    )
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html2 = template(cacheKey + this._id, INDICATORS_LIST, dataModel)
    $('#' + this._id)
      .find('.carousel-indicators')
      .html(html2)
  }
  indicatorsClick(e) {
    let $target = $(e.target)

    if (e.target.tagName === 'LI') {
      let index = $target.attr('data-slide-to')
      if ($target.attr('data-mode') === 'pc') {
        $target
          .addClass('active')
          .siblings('.pc-indicators')
          .removeClass('active')
      } else {
        $target
          .addClass('active')
          .siblings('.mobile-indicators')
          .removeClass('active')
      }
      this._curIdx = index
      this.to(index)
    }
  }
  resize() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if ($(document.body).outerWidth(true) <= WIDTH) {
        this._curIdx = 0
        this.to(0)
      }

      clearTimeout(this.timer)
    }, 200)
  }
  pause() {
    this._interval = clearInterval(this._interval)
    return this
  }
  cycle(e) {
    e || (this._isPaused = false)

    if (this._touchSupported && this.mobilePage > 1) {
      this._interval && clearInterval(this._interval)
      this._config &&
        this._config.interval &&
        !this._isPaused &&
        (this._interval = setInterval(
          $.proxy(this.cycleNext, this),
          this._config.interval
        ))
    } else if (this.totalPage > 1) {
      this._interval && clearInterval(this._interval)
      this._config &&
        this._config.interval &&
        !this._isPaused &&
        (this._interval = setInterval(
          $.proxy(this.cycleNext, this),
          this._config.interval
        ))
    }

    return this
  }

  cycleNext() {
    let carouselCount = null
    if (this._touchSupported) {
      carouselCount = Math.floor(
        (this._total - 1) / this._dataConf.mobilePercent
      )
      if (this._curIdx == carouselCount) {
        this._curIdx = 0
        this._control.find(Selector.PRODUCT_LIST).css({
          marginLeft: '0%'
        })
      }
      this._curIdx = parseInt(this._curIdx) + 1
      this.to(this._curIdx)
    } else {
      carouselCount = Math.floor((this._total - 1) / this._dataConf.percent)
      if (this._curIdx == carouselCount) {
        this._curIdx = 0
        this._control.find(Selector.PRODUCT_LIST).css({
          marginLeft: '0%'
        })
      }
      this._curIdx = parseInt(this._curIdx) + 1
      this.to(this._curIdx)
    }
    if (this._touchSupported) {
      if (this._curIdx == carouselCount) {
        this._control
          .find('.carousel-indicators .mobile-indicators')
          .eq(0)
          .addClass('active')
          .siblings('.mobile-indicators')
          .removeClass('active')
      } else {
        this._control
          .find('.carousel-indicators .mobile-indicators')
          .eq(this._curIdx)
          .addClass('active')
          .siblings('.mobile-indicators')
          .removeClass('active')
      }
    } else {
      if (this._curIdx == carouselCount) {
        this._control
          .find('.carousel-indicators .pc-indicators')
          .eq(0)
          .addClass('active')
          .siblings('.pc-indicators')
          .removeClass('active')
      } else {
        this._control
          .find('.carousel-indicators .pc-indicators')
          .eq(this._curIdx)
          .addClass('active')
          .siblings('.pc-indicators')
          .removeClass('active')
      }
    }
  }
  dispose() {
    this._interval = null
    this._isPaused = false
    this.touchTimeout = null
    this.touchStartX = 0
    this.touchDeltaX = 0
    this._curIdx = 0
  }

  // Static

  static productlistInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)

    if (!data) {
      data = new ProductListStyle5($this.attr('id'), $this.attr('data-c-style'))
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
      ProductListStyle5.productlistInterface(this, config, args)
    })
  }
}
if ($) {
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = ProductListStyle5.jQueryInterface
  $.fn[NAME].Constructor = ProductListStyle5
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ProductListStyle5.jQueryInterface
  }
  $(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]()
  })
}
