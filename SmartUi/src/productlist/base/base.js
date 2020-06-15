import { contentQueryUrl } from '../../env/index'
import HttpRequest from '../../util/httpRequest'
import { getjQuery } from '../../util'
const NAME = 'productlist'
const DATA_KEY = `st.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
export const WIDTH = 992

export const $ = getjQuery()
const Direction = {
  NEXT: 'next',
  PREV: 'prev'
}
export const Default = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
}
const SWIPE_THRESHOLD = 40
const ARROW_LEFT_KEYCODE = 37 // KeyboardEvent.which value for left arrow key
const ARROW_RIGHT_KEYCODE = 39 // KeyboardEvent.which value for right arrow key
export const Selector = {
  PRODUCT_LIST: '.product-list',
  LIST_ITEM: '.list-item',
  REAL_ITEM: '.real-item',
  IMGWATERFALL: '.imgWaterfall',
  LIST_CONTENT: '.list-content',
  IMGITEM: '.imgItem',
  SLIDE_BNT: '.slider-btn'
}

export const Event = {
  SLIDE: `slide${EVENT_KEY}`,
  SLID: `slid${EVENT_KEY}`,
  KEYDOWN: `keydown${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`,
  TOUCHSTART: `touchstart${EVENT_KEY}`,
  TOUCHMOVE: `touchmove${EVENT_KEY}`,
  TOUCHEND: `touchend${EVENT_KEY}`,
  POINTERDOWN: `pointerdown${EVENT_KEY}`,
  POINTERUP: `pointerup${EVENT_KEY}`,
  DRAG_START: `dragstart${EVENT_KEY}`,
  CLICK_DATA_API: `click${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`,
  SCROLL: `scroll${EVENT_KEY}`
}
const PointerType = {
  TOUCH: 'touch'
}
export default class Base {
  constructor() {
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
  }
  _setPageTotal(pageCount) {
    this._control.attr('data-total', pageCount)
    $('#' + this._pgRelId).attr('data-total', pageCount)
    $('#' + this._pgRelId).pagination('setTotal', pageCount)
  }
  changeProductDetailPageId(data) {
    this._dataConf.productDetailPageId = data.productDetailPageId
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }
  changePageNumberLimit(data) {
    let pageCount = Math.ceil(data.listData / data.pageCount)
    this._setPageTotal(pageCount)
    this._query.limit = data.limit
    this._control.attr('data-query', JSON.stringify(this._query))
  }
  changeproductlistTarget(data) {
    let eles = $('#' + this._id).find('.list-item')
    for (var i = 0; i < eles.length; i++) {
      $(eles[i]).find('a').attr('target', data.target)
    }
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
  }
  changeIconDisplay(data) {
    var icon = data && data['icon'] ? data['icon'] : ''
    this._control.find('.list-item i.iconfont').map((i, it) => {
      $(it)
        .removeClass()
        .addClass('iconfont ' + icon)
    })
  }
  /**
   * 请求产品列表数据
   * @param { Number } pageIndex   分页页码
   * @param { func } callback
   * @param { String } mode  模式 mobile or pc
   */
  loadData(pageIndex, callback, mode) {
    if (pageIndex < 1) {
      throw new Error('pageIndex incorrect')
    }
    const _this = this
    let queryData = this._query
    const paginationId = this._pgRelId
    queryData.skip = pageIndex - 1
    // let dataBasic = this._dataConf;
    this._loadStatus = false
    HttpRequest.post(
      contentQueryUrl,
      queryData,
      function (data) {
        _this._pageCount = data.pageCount
        if (
          data.data != null &&
          data.data.length > 0 &&
          pageIndex <= data.pageCount
        ) {
          let model = _this._dataConf
          model.listData = data.data
          model.pageCount = data.pageCount
          _this._dataConf = model
          mode == 'mobile' || _this.style === 'style7'
            ? _this._appendInnerHtml(model)
            : _this._renderInnerHtml(model)

          if (typeof callback === 'function') {
            callback(_this._id, data)
          }
        } else {
          $('#' + paginationId).pagination('setTotal', data.pageCount)
        }
      },
      function () {
        // data
        // alert(data);
      },
      function () {
        setTimeout(function () {
          if (!_this._loadStatus) {
            _this._loadStatus = true
          }
        }, 2000)
      }
    )
  }
  changeMobileMoreBtnName(value) {
    this._control.find('.mb-pagination').text(value.paginationName)
  }
  to(index) {
    this._control
      .find(Selector.PRODUCT_LIST)
      .stop()
      .animate({
        marginLeft: -(100 * index) + '%'
      })
    if (this._touchSupported && this._style == 'style5') {
      this._cycleNext()
    }
  }
  _cycleNext() {
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
    }
  }
  _addTouchEventListeners() {
    const start = (event) => {
      if (
        this._pointerEvent &&
        event.pointerType &&
        PointerType[event.pointerType.toUpperCase()]
      ) {
        this.touchStartX = event.clientX
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX
      }
    }

    const move = (event) => {
      // ensure swiping with one touch and not pinching
      if (event.touches && event.touches.length > 1) {
        this.touchDeltaX = 0
      } else {
        this.touchDeltaX = event.touches[0].clientX - this.touchStartX
      }
    }

    const end = (event) => {
      if (
        this._pointerEvent &&
        event.pointerType &&
        PointerType[event.pointerType.toUpperCase()]
      ) {
        this.touchDeltaX = event.clientX - this.touchStartX
      }
      if (event.touches && event.touches.length == 1) {
        this.touchDeltaX = event.touches[0].clientX - this.touchStartX
      }
      this._handleSwipe()
    }

    this._control
      .off(Event.TOUCHSTART)
      .on(Event.TOUCHSTART, $.proxy(start, this))
    this._control.off(Event.TOUCHMOVE).on(Event.TOUCHMOVE, $.proxy(move, this))
    this._control.off(Event.TOUCHEND).on(Event.TOUCHEND, $.proxy(end, this))
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return
    }

    switch (event.which) {
      case ARROW_LEFT_KEYCODE:
        event.preventDefault()
        this.prev()
        break
      case ARROW_RIGHT_KEYCODE:
        event.preventDefault()
        this.next()
        break
      default:
    }
  }
  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX)

    if (absDeltax <= SWIPE_THRESHOLD) {
      return
    }

    const direction = absDeltax / this.touchDeltaX

    this.touchDeltaX = 0

    // swipe left
    if (direction > 0) {
      this.prev()
    }

    // swipe right
    if (direction < 0) {
      this.next()
    }
  }
  next() {
    return this.slide(Direction.NEXT)
  }
  prev() {
    return this.slide(Direction.PREV)
  }
  slide(type) {
    if (type === Direction.NEXT) {
      if (this._touchSupported) {
        if (this._curIdx + 1 >= this.mobilePage) {
          return
        } else {
          this._curIdx = parseInt(this._curIdx) + 1
        }
      } else {
        if (this._curIdx + 1 >= this.totalPage) {
          this._control.find('.next').attr('disabled', true)
          return
        } else {
          this._curIdx = parseInt(this._curIdx) + 1
        }
      }
      this._control.find('.prev').removeAttr('disabled')
    } else {
      if (this._curIdx <= 0) {
        this._control.find('.prev').attr('disabled', true)
        return
      } else {
        --this._curIdx
      }
      this._control.find('.next').removeAttr('disabled')
    }
    this.to(this._curIdx)
  }
}
