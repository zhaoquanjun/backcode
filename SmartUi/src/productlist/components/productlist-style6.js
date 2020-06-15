import Base, { $ } from '../base/base.js'

import template from '../../templateengine/index'
const NAME = 'productlist_style6'
const DATA_KEY = 'st.productlist_style6'
import { getSysClass } from '../../util'
const templates = {}
const INNER_LIST = `{{each listData item i}} 
                    <div class="list-item">
                      <a href="product/{{if productDetailPageId}}{{productDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}"> 
                        <dl class="container">
                          <dt class="productlist__content">
                            <h3 class="productlist__title title ellipsis">{{item.Name}}</h3>
                            <div class="desc-wrap"><p class="productlist__desc desc productlist-ellipsis2">{{item.Description}}</p></div>
                            <div class="price__wrapper">
                              <span class="price ellipsis">
                             {{item.Price}}
                              </span>
                              <span class="submit__btn">
                                <button class="look-more">{{buttonName}}</button>
                                <span>
                                  <i class="iconfont iconicon-des-Arrow"></i>
                                </span>
                              </span>
                            </div>
                          </dt>
                          <dd class="productlist--image__wrapper">
                            <div class="imgview"><img src="{{item.CoverUrl}}" alt="" class="object-fit--cover"   data-object-fit="cover"></div>
                          </dd>
                        </dl>
                      </a>
                    </div>
                    {{/each}}`
const INNER_TEM = `<div class="productlist-wrap">${INNER_LIST}</div>`

templates[
  'style6'
] = `<div id="{{_Id}}" data-c-type="productlist" data-c-style="{{_Style}}" data-query='{{_Query}}'  data-pgrelId="pgn_{{_Id}}" data-ride="productlist"  data-conf='{"percent":"{{percent}}", "buttonName":"{{buttonName}}", "pageCount":"{{pageCount}}",  "target":"{{target}}","productDetailPageId":"{{productDetailPageId}}"}'>
   ${INNER_TEM}
</div>`
export default class ProductListStyle6 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._control = $('#' + id)
    this._pgRelId = this._control.attr('data-pgrelId')
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._query = JSON.parse(this._control.attr('data-query'))
    this._style = style
    this._config = $.extend({}, options)
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
      .find('.productlist-wrap')
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
        .find('.productlist-wrap')
        .html(html)
      this._init()
    }
  }
  _init() {
    this._control.data(DATA_KEY, this)
  }

  // Static

  static productlistInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)

    if (!data) {
      data = new ProductListStyle6($this.attr('id'), $this.attr('data-c-style'))
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
      ProductListStyle6.productlistInterface(this, config, args)
    })
  }
}
if ($) {
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = ProductListStyle6.jQueryInterface
  $.fn[NAME].Constructor = ProductListStyle6
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ProductListStyle6.jQueryInterface
  }
  $(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]()
  })
}
