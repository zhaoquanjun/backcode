import { downloadApiBase } from '../../env'
import HttpRequest from '../../util/httpRequest'
import { getjQuery} from '../../util'
const DATA_KEY = 'st.carousel'
const EVENT_KEY = `.${DATA_KEY}`
const ARROW_LEFT_KEYCODE = 37 // KeyboardEvent.which value for left arrow key
const ARROW_RIGHT_KEYCODE = 39 // KeyboardEvent.which value for right arrow key
const TOUCHEVENT_COMPAT_WAIT = 500 // Time for mouse compat events to fire after touch
const SWIPE_THRESHOLD = 40

const $ = getjQuery()
export const Default = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
}
export const Direction = {
  NEXT: 'next',
  PREV: 'prev',
  LEFT: 'left',
  RIGHT: 'right'
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
  RESIZE: `resize${EVENT_KEY}`
}
export const ClassName = {
  CAROUSEL: 'c-carousel',
  ACTIVE: 'active',
  SLIDE: 'slide',
  RIGHT: 'carousel-item-right',
  LEFT: 'carousel-item-left',
  NEXT: 'carousel-item-next',
  PREV: 'carousel-item-prev',
  ITEM: 'carousel-item',
  POINTER_EVENT: 'pointer-event'
}
export const Selector = {
  ACTIVE: '.active',
  CAROUSEL_LIST: '.carousel-list',
  LIST_ITEM: '.list-item',
  IMGSRC: '.imgSrc',
  ACTIVE_ITEM: '.active.carousel-item',
  ITEM: '.carousel-item',
  ITEM_IMG: '.carousel-item img',
  NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
  INDICATORS: '.carousel-indicators',
  DATA_SLIDE: '[data-slide], [data-slide-to]',
  DATA_RIDE: '[data-ride="carousel"]',
  LINK_AREA: '.linkArea'
}
const PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
}

class Base {
  constructor() {
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
    this._pointerEvent = false // Boolean(window.PointerEvent || window.MSPointerEvent)

    this._items = null
    this._interval = null
    this._activeElement = null
    this._isPaused = false
    this._isSliding = false
    this.touchTimeout = null
    this.touchStartX = 0
    this.touchDeltaX = 0
  }
  dispose() {
    this._items = null
    this._interval = null
    this._activeElement = null
    this._isPaused = false
    this._isSliding = false
    this.touchTimeout = null
    this.touchStartX = 0
    this.touchDeltaX = 0
    this._control.data(DATA_KEY, null)
  }
  pause(e) {
    e || (this._isPaused = true)

    if (this._control.find(Selector.NEXT_PREV).length && $.support.transition) {
      this._control.trigger($.support.transition.end)
      this.cycle(true)
    }
    this._interval = clearInterval(this._interval)
    return this
  }

  cycle(e) {
    e || (this._isPaused = false)

    this._interval && clearInterval(this._interval)

    this._config &&
      this._config.interval &&
      !this._isPaused &&
      (this._interval = setInterval(
        $.proxy(this.next, this),
        this._config.interval
      ))

    return this
  }
   _downloadFile(e) {
    const type = $(e.currentTarget).attr('data-type')
    if (type === 'file') {
      const url = downloadApiBase + $(e.currentTarget).attr('href')
      e.stopPropagation()
      e.preventDefault()
      HttpRequest.get(
        url,
        {},
        function(res) {
          if (res.isGetDownloadUrlSuccess) {
            var a = document.createElement('a')
            a.href = res.downloadUrl
            a.target = '_self'

            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          } else {
            let mode = {
              downloadUrl: url,
              Title: '请输入提取码：',
              ConfirmText: '提取文件'
            }
            let filedownload = new window.SmartUi.FileDownload(mode)
            filedownload._render()
          }
        },
        function(err) {
          console.log(err)
        }
      )
    }
  }
  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && this._control.is(':visible')) {
      this.next()
    }
  }
  to(pos) {
    var that = this
    var activeIndex = this.getItemIndex(
      (this.$active = this._control.find(Selector.ACTIVE_ITEM))
    )
    if (pos > this._items.length - 1 || pos < 0) return
    if (this._isSliding)
      return this._control.one(Event.SLID, function() {
        that.to(pos)
      }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()
    return this.slide(
      pos > activeIndex ? Direction.NEXT : Direction.PREV,
      this._items.eq(pos)
    )
  }
  getItemForDirection(direction, active) {
    const activeIndex = this.getItemIndex(active)
    const willWrap =
      (direction == Direction.PREV && activeIndex === 0) ||
      (direction == Direction.NEXT && activeIndex == this._items.length - 1)
    if (willWrap && !this._config.wrap) return active
    const delta = direction == Direction.PREV ? -1 : 1
    const itemIndex = (activeIndex + delta) % this._items.length
    return this._items.eq(itemIndex)
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
  _addTouchEventListeners() {
    const start = event => {
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

    const move = event => {
      // ensure swiping with one touch and not pinching
      if (event.touches && event.touches.length > 1) {
        this.touchDeltaX = 0
      } else {
        this.touchDeltaX = event.touches[0].clientX - this.touchStartX
      }
    }

    const end = event => {
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
      if (this._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause()
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout)
        }

        this.touchTimeout = setTimeout(
          event => this.cycle(event),
          TOUCHEVENT_COMPAT_WAIT + this._config.interval
        )
      }
    }

    //makeArray(SelectorEngine.find(Selector.ITEM_IMG, this._element)).forEach(itemImg => {
    //    EventHandler.on(itemImg, Event.DRAG_START, e => e.preventDefault())
    //})

    //if (this._pointerEvent) {
    //    this._control.on(Event.POINTERDOWN, $.proxy(start,this));
    //    this._control.on(Event.POINTERUP, $.proxy(end, this));
    //    this._control.addClass(ClassName.POINTER_EVENT)
    //} else {
    this._control
      .off(Event.TOUCHSTART)
      .on(Event.TOUCHSTART, $.proxy(start, this))
    this._control.off(Event.TOUCHMOVE).on(Event.TOUCHMOVE, $.proxy(move, this))
    this._control.off(Event.TOUCHEND).on(Event.TOUCHEND, $.proxy(end, this))
    //}
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
  _prevNextClick(e) {
    let $this = $(e.target)
    if (
      $this.hasClass('carousel-control-next-icon') ||
      $this.hasClass('carousel-control-prev-icon')
    ) {
      $this = $this.parent()
    }else if($this.hasClass('imgSrc') || $this.hasClass('title')){
      this.replaceLargeImage(e)
    }
    
    const direct = $this.attr('data-slide')
    if (direct) {
      if (direct == Direction.NEXT) {
        this.next()
      } else {
        this.prev()
      }
    } else {
      const slideIndex = $this.attr('data-slide-to')
      if (slideIndex) {
        //config.interval = false
        this.to(parseInt(slideIndex))
      }
    }
    e.preventDefault()
  }
  getItemIndex(item) {
    this._items = item.parent().children(Selector.ITEM)
    return this._items.index(item || this.$active)
  }
}
export default Base