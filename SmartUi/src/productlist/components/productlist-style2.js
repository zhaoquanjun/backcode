import Base, { $, Selector, Event, Default } from '../base/base.js'

import template from '../../templateengine/index'
const NAME = 'productlist_style2'
const DATA_KEY = 'st.productlist_style2'
import { getSysClass } from '../../util'
const Direction = {
  NEXT: 'next',
  PREV: 'prev'
}
const templates = {}
const INNER_LIST = `{{each listData item i}} 
                    <li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}">
                        <a href="product/{{if productDetailPageId}}{{productDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}"> 
                        <div class="imgview">
                          <img src="{{item.CoverUrl}}" alt="" class="object-fit--cover"   data-object-fit="cover">
                        </div>
                        <div class="list-content">
                          <h1 class="title ellipsis">{{item.Name}}</h1>
                          <div class="desc">
                            <p class=" productlist-ellipsis productlist-ellipsis2">{{item.Description}}</p>
                          </div>
                        </div>
                        </a>
                    </li>
                  {{/each}}`
const INNER_TEM2 = `<ul class="product-list product-list-style2">${INNER_LIST}</ul>`
templates[
  'style2'
] = `<div id="{{_Id}}" data-c-type="productlist" data-c-style="{{_Style}}" data-query='{{_Query}}' data-pgrelId="pgn_{{_Id}}" data-ride="productlist"  data-conf='{"percent":"{{percent}}","target":"{{target}}","productDetailPageId":"{{productDetailPageId}}"}'>
                      <div class="productlist-wrap">
                          <button class="slider-btn prev" data-slide="prev"><i class="iconfont iconicon-des-Arrowleft1"></i></button>
                              <div class="scroll-list">
                                  ${INNER_TEM2}
                              </div>
                          <button class="slider-btn next" data-slide="next">  <i class="iconfont iconicon-des-Arrowleft1"></i></button>
                      </div>
                  </div>`
export default class ProductListStyle2 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._control = $('#' + id)
    this._pgRelId = this._control.attr('data-pgrelId')
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._query = JSON.parse(this._control.attr('data-query'))
    this._style = style
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
    let html = template(cacheKey, INNER_LIST, data)
    $('#' + this._id)
      .find('.product-list')
      .html(html)

    this._setPageTotal(data.pageCount)
    this._init()
  }

  _appendInnerHtml(data) {
    if (data.listData.length > 0) {
      data._Id = this._id
      const cacheKey = DATA_KEY + '_inner'
      let html = template(cacheKey, INNER_LIST, data)
      $('#' + this._id)
        .find('.product-list')
        .append(html)
      this._setPageTotal(data.pageCount)
      this._init()
    }
  }
  _init() {
    this._addEventListeners()
    this._curIdx = 0
    this._realItemsCount = this._control
      .find(Selector.PRODUCT_LIST)
      .find(Selector.LIST_ITEM).length
    this.totalPage = Math.ceil(this._realItemsCount / this._dataConf.percent)
    this.mobilePage = Math.ceil(
      this._realItemsCount / this._dataConf.mobilePercent
    )
    this._control.data(DATA_KEY, this)
  }
  _addEventListeners() {
    this._control
      .find(Selector.SLIDE_BNT)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._prevNextClick, this))
    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners()
    }
  }
  _prevNextClick(e) {
    let $this = $(e.currentTarget)
    const direct = $this.attr('data-slide')
    direct === Direction.NEXT ? this.next() : this.prev()
  }

  // Static

  static productlistInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)

    if (!data) {
      data = new ProductListStyle2($this.attr('id'), $this.attr('data-c-style'))
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
      ProductListStyle2.productlistInterface(this, config, args)
    })
  }
}
if ($) {
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = ProductListStyle2.jQueryInterface
  $.fn[NAME].Constructor = ProductListStyle2
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ProductListStyle2.jQueryInterface
  }
  $(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]()
  })
}
