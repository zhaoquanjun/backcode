import Base, { Default, Direction, Event, ClassName, Selector } from '../base/base.js'
import { isDesign } from '../../env/index'
import template from '../../templateengine/index'
const NAME = 'carousel_style1'
const DATA_KEY = 'st.carouselstyle1'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()

const INNER_TEM_Style1 = `<ol class="carousel-indicators">
                          {{each imgList item i}}
                              <li data-slide-to="{{i}}" class="{{if i==0}}active{{/if}}"></li>
                          {{/each}}
                          </ol>
                          <div class="carousel-inner">
                          {{each imgList item i}}
                              <div class="carousel-item {{if i==0}}active{{/if}}">
                                  <a class="linkArea" href="{{item.Href}}" target="_blank" data-type="{{item.Ctype}}">
                                      <img src="{{item.Src}}" class="object-fit--cover" data-object-fit="cover" alt="{{item.Alt}}"  >
                                  </a>    
                              </div>
                          {{/each}}
                          </div>
                          <a class="carousel-control-prev carousel-control" href="#carouselExampleControls" role="button" data-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="sr-only">Previous</span>
                          </a>
                          <a class="carousel-control-next carousel-control" href="#carouselExampleControls" role="button" data-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="sr-only">Next</span>
                          </a>`
const templates = {}
templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="carousel" class="c-carousel slide {{_SysClass}}">
    ${INNER_TEM_Style1}
</div>`

class CarouselStyle1 extends Base {
  constructor(id, style, options) {
    super()
    this._id = id
    this._style = style 
    this._control = $('#' + id)
    this._config = $.extend({}, Default, options)
  }
  _init() {
    this._indicatorsElement = this._control.find(Selector.INDICATORS)
    this._addEventListeners()
    this._control.data(DATA_KEY, this)
  }
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style

    return template(cacheKey, templates[this._style], data)
  }

  refreshControl(data, callback) {
    this.dispose()
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html = template(cacheKey, INNER_TEM_Style1, data)
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
  }
  slide(type, next) {
    var $active = this._control.find(Selector.ACTIVE_ITEM)
    var $next = next || this.getItemForDirection(type, $active)
    var isCycling = this._interval
    let direction
    let directionClass
    let orderClassName
    if (type == Direction.NEXT) {
      direction = Direction.LEFT
      directionClass = ClassName.LEFT
      orderClassName = ClassName.NEXT
    } else {
      direction = Direction.RIGHT
      directionClass = ClassName.RIGHT
      orderClassName = ClassName.PREV
    }
    var that = this

    if ($next.hasClass(ClassName.ACTIVE)) return (this._isSliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event(Event.SLIDE, {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this._control.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this._isSliding = true

    isCycling && this.pause()

    if (this._indicatorsElement.length) {
      this._indicatorsElement
        .find('.' + ClassName.ACTIVE)
        .removeClass(ClassName.ACTIVE)
      var $nextIndicator = $(
        this._indicatorsElement.children()[this.getItemIndex($next)]
      )
      $nextIndicator && $nextIndicator.addClass(ClassName.ACTIVE)
    }
    var slidEvent = $.Event(Event.SLID, {
      relatedTarget: relatedTarget,
      direction: direction
    }) // yes, "slid"
    if ($.support.transition && this._control.hasClass(ClassName.SLIDE)) {
      $next.addClass(orderClassName)
      if (typeof $next === 'object' && $next.length) {
        $next[0].offsetWidth // force reflow
      }
      $active.addClass(directionClass)
      $next.addClass(directionClass)
      $active
        .one('bsTransitionEnd', function() {
          $next
            .removeClass([orderClassName, directionClass].join(' '))
            .addClass(ClassName.ACTIVE)
          $active.removeClass([ClassName.ACTIVE, directionClass].join(' '))
          that._isSliding = false
          setTimeout(function() {
            that._control.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      $active.removeClass(ClassName.ACTIVE)
      $next.addClass(ClassName.ACTIVE)
      this._isSliding = false
      this._control.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }
  next() {
    if (this._isSliding) return
    return this.slide(Direction.NEXT)
  }
  prev() {
    if (this._isSliding) return
    return this.slide(Direction.PREV)
  }

  // Static
  static carouselInterface (element, config, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    let _config = Default

    if (typeof config === 'object') {
      _config = $.extend({}, CarouselStyle1.DEFAULTS, config)
    }

    const action = typeof config === 'string' ? config : _config.slide

    if (!data) {
      data = new CarouselStyle1($this.attr('id'), $this.attr('data-c-style'))
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
    return this.each(function() {
      CarouselStyle1.carouselInterface(this, config, args)
    })
  }
}

// CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
// ============================================================

function transitionEnd() {
  var el = document.createElement('bootstrap')

  var transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  }

  for (var name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return {
        end: transEndEventNames[name]
      }
    }
  }

  return false // explicit for ie8 (  ._.)
}
if ($) {
  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function() {
      called = true
    })
    var callback = function() {
      if (!called) $($el).trigger($.support.transition.end)
    }
    setTimeout(callback, duration)
    return this
  }

  $(function() {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function(e) {
        if ($(e.target).is(this))
          return e.handleObj.handler.apply(this, arguments)
      }
    }
  })
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  $.fn[NAME] = CarouselStyle1.jQueryInterface
  $.fn[NAME].Constructor = CarouselStyle1
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return CarouselStyle1.jQueryInterface
  }
  $(window).on('load', function() {
    $(`[data-ride="${NAME}"]`)[NAME]()
  })
}
export default CarouselStyle1