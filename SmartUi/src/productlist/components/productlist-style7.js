import Base, { $, Selector, Event } from '../base/base.js'
import { isDesign } from '../../env/index'
import template from '../../templateengine/index'
const NAME = 'productlist_style7'
const DATA_KEY = 'st.productlist_style7'
import { getSysClass } from '../../util'
const templates = {}
const INNER_LIST = `{{each listData item i}} 
                    <li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}">
                      <a href="product/{{if productDetailPageId}}{{productDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}"> 
                        <div class="imgWaterfall">
                          <img src="{{item.CoverUrl}}" alt="" class="imgItem">
                        </div>
                        <div class="list-content">
                          <h1 class="title ellipsis">{{item.Name}}</h1>
                          {{if item.Description}}
                          <div class="desc">
                            <p class="productlist-ellipsis2">{{item.Description}}</p>
                          </div>
                          {{/if}}
                          <div class="price__wrapper">
                            <h1 class="price ellipsis">{{item.Price}}</h1>
                          </div>
                        </div>
                      </a>
                    </li>
                    {{/each}}`
const INNER_TEM = `<ul class="product-list product-list-style2">${INNER_LIST}</ul>
                    <div  class="pagination" data-ride="pagination" id="pgn_{{_Id}}" data-total="{{pageCount}}" data-relId="{{_Id}}" data-relType="productlist" data-c-style="style9"></div>`

templates[
  'style7'
] = `<div id="{{_Id}}" data-c-type="productlist" data-c-style="{{_Style}}" data-query='{{_Query}}'  data-pgrelId="pgn_{{_Id}}" data-ride="productlist"  data-conf='{"percent":"{{percent}}", "buttonName":"{{Model.buttonName}}", "target":"{{target}}","productDetailPageId":"{{productDetailPageId}}"}'>
                      <div class="productlist-wrap">
                        ${INNER_TEM}
                      </div>
                    </div>`
export default class ProductListStyle7 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._control = $('#' + id)
    this._pgRelId = this._control.attr('data-pgrelId')
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._query = JSON.parse(this._control.attr('data-query'))
    this._style = style
    this._loadCount = 1
    this._loadStatus = true
    this._pageCount = 1

    this._curIdx = 0
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
    const listLen = this._control.find('.product-list').children().length
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html = template(cacheKey, INNER_LIST, data)
    $('#' + this._id)
      .find('.product-list')
      .html(html)

    this._setPageTotal(data.pageCount)
    this._loopforWaterfallListStyle(listLen)
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
      if (this._loadCount < data.pageCount) {
        this._loadCount++
      }
      this._init()
    }
  }
  _init() {
    this._addEventListeners()
    this._control.data(DATA_KEY, this)
    this.listWaterfall()

    let $imgs = this._control.find(Selector.IMGITEM)
    let num = $imgs.length
    $imgs.on('load', () => {
      num--
      if (num > 0) {
        return
      }
      this.listWaterfall()
    })
  }
  _addEventListeners() {
    $(window)
      .off(Event.RESIZE + this._id)
      .on(Event.RESIZE + this._id, $.proxy(this.resize, this))
      .off(Event.SCROLL + this._id)
      .on(Event.SCROLL + this._id, $.proxy(this.scroll, this))
  }
  /**
   * 改变PC端显示每行个数
   * @param { Object } data.percent 每行显示个数
   */
  changeProductlistRowWidth(data) {
    this._control.attr('data-percent', data.percent)
    const productList = this._control.find('.product-list')
    const $listItem = productList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-item${data.percent}`)

    this._dataConf.percent = data.percent
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
    this.listWaterfall(data.percent)
  }

  /**
   * 改变移动端显示每行个数
   * @param { Object } data.mobilePercent 每行显示个数
   */
  changeMobileProductlistRowWidth(data) {
    const productList = this._control.find('.product-list')
    const $listItem = productList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-md-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-md-item${data.mobilePercent}`)
    this._dataConf.mobilePercent = data.mobilePercent
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
    this.listWaterfall(2)
  }
  //public methods
  scroll() {
    let scrollTop = $(document).scrollTop()
    let windowHeight = $(window).height()
    let productList = this._control.find(Selector.PRODUCT_LIST)
    let listHeight = parseFloat($(productList).css('height'))
    let listTop = parseFloat($(productList).offset().top)
    if (!isDesign()) {
      if (listTop + listHeight < scrollTop + windowHeight + 200) {
        if (this._loadCount <= 5) {
          this._loadStatus &&
            this.loadData(this._loadCount + 1, function () {}, 'mobile')
        } else {
          this._control
            .find('.pagination')
            .attr('data-pageIndex', this._loadCount)
          if (this._loadCount < this._pageCount) {
            $('.pc-pagination').hide()
            $('.mb-pagination').show()
          } else {
            $('.mb-pagination').hide()
          }
        }
      }
    }
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
  listWaterfall(percent, callback) {
    let imgs = this._control.find(Selector.IMGITEM)
    let imgWaterfall = this._control.find(Selector.IMGWATERFALL)
    let listItem = this._control.find(Selector.LIST_ITEM)
    let listContent = this._control.find(Selector.LIST_CONTENT)
    let productList = this._control.find(Selector.PRODUCT_LIST)
    let imgWidth
    let imgHeight
    let listContentHeight
    let hArr = []
    let padding
    let space
    percent =
      percent || this._control.attr('data-percent') || this._dataConf.percent
    if (parseFloat($(productList).css('width')) < 375) {
      percent = 2
      space = 1
    } else {
      space = 2
    }
    imgWaterfall.each(function (index, el) {
      imgWidth = $(el).css('width')
    })
    imgs.each(function (index, el) {
      listContentHeight = $(listContent[index]).css('height')
      $(el).css('width', imgWidth)
      imgHeight = $(el).css('height')
      $(imgWaterfall[index]).css('height', imgHeight)
      padding = $(listItem[index]).css('padding')
      $(listItem[index]).css(
        'height',
        parseFloat(imgHeight) +
          listContentHeight +
          parseFloat(padding) * 2 +
          'px'
      )
    })
    for (let i = 0; i < imgs.length; i++) {
      $(listItem[i]).css('position', 'absolute')
      if (i < percent) {
        hArr.push(parseFloat($(listItem[i]).css('height')) + 5)
        $(listItem[i]).css({
          top: '0',
          left: (parseFloat(imgWidth) + parseFloat(padding) * 2) * i + 'px'
        })
      } else {
        let minH = Math.min.apply(null, hArr)
        let MinIndex = this.getHeightIndex(hArr, minH)
        $(listItem[i]).css({
          top: minH + parseFloat(padding) * space + 'px',
          left: $(listItem[MinIndex]).css('left')
        })
        hArr[MinIndex] += parseFloat($(listItem[i]).css('height')) + 5
      }
      $(productList).css(
        'height',
        Math.max.apply(null, hArr) + parseFloat(padding) * 2 + 'px'
      )
    }
    typeof callback === 'function' && callback()
  }
  _loopforWaterfallListStyle(len) {
    const _this = this
    timer && clearInterval(timer)
    const timer = setInterval(function () {
      if (_this._control.find('.product-list').children().length > len) {
        clearInterval(timer)
        _this.listWaterfall(
          0,
          function () {
            if (!_this._loadStatus) {
              _this._loadStatus = true
            }
            setTimeout(function () {
              if (isDesign()) {
                window.parent.smSite &&
                  window.parent.smSite.showClickSelectArea()
              }
            }, 500)
          },
          200
        )
      } else {
        _this._loopforWaterfallListStyle(len)
      }
    }, 300)
  }
  resize() {
    clearTimeout(timer)
    let timer = setTimeout(() => {
        this.listWaterfall()
      clearTimeout(timer)
    }, 200)
  }

  // Static

  static productlistInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)

    if (!data) {
      data = new ProductListStyle7($this.attr('id'), $this.attr('data-c-style'))
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
      ProductListStyle7.productlistInterface(this, config, args)
    })
  }
}
if ($) {
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = ProductListStyle7.jQueryInterface
  $.fn[NAME].Constructor = ProductListStyle7
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ProductListStyle7.jQueryInterface
  }
  $(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]()
  })
}
