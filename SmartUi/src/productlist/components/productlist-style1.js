import Base, { $ } from '../base/base.js'

import template from '../../templateengine/index'
const NAME = 'productlist_style1'
const DATA_KEY = 'st.productlist_style1'
import { getSysClass } from '../../util'

const templates = {}
const INNER_LIST = `{{each listData item i}} 
                    <li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}">
                        <a href="product/{{if productDetailPageId}}{{productDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}"> 
                        <div class="imgview">
                          <img src="{{item.CoverUrl}}" alt=""  class="object-fit--cover" data-object-fit="cover">
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
const INNER_TEM = `<ul class="product-list product-list-style2">${INNER_LIST}</ul>
                    <div  class="pagination" data-ride="pagination" id="pgn_{{_Id}}" data-total="{{pageCount}}" data-relId="{{_Id}}" data-relType="productlist"></div>`

templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="productlist" data-c-style="{{_Style}}" data-query='{{_Query}}'  data-pgrelId="pgn_{{_Id}}" data-ride="productlist"  data-conf='{"percent":"{{percent}}","target":"{{target}}","productDetailPageId":"{{productDetailPageId}}"}'>
                        <div class="productlist-wrap">
                            ${INNER_TEM}
                        </div>
                    </div>`

export default class ProductListStyle1 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._control = $('#' + id)
    this._pgRelId = this._control.attr('data-pgrelId')
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._query = JSON.parse(this._control.attr('data-query'))
    this._total = this._control.attr('data-total')
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
    this._control.data(DATA_KEY, this)
  }

  // Static

  static productlistInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)

    if (!data) {
      data = new ProductListStyle1($this.attr('id'), $this.attr('data-c-style'))
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
      ProductListStyle1.productlistInterface(this, config, args)
    })
  }
}
if ($) {
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = ProductListStyle1.jQueryInterface
  $.fn[NAME].Constructor = ProductListStyle1
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ProductListStyle1.jQueryInterface
  }
  $(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]()
  })
}
