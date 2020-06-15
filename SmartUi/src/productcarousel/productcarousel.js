/**
 * ----------------------------------------
 * SmartUi(v0.1):productcarousel.js
 * ----------------------------------------
 */
import template from '../templateengine/index';
import { getSysClass, getjQuery } from '../util'
const DATA_KEY = 'st.productcarousel'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'productcarousel'
//const DATA_API_KEY = '.data-api'
const ARROW_LEFT_KEYCODE = 37 // KeyboardEvent.which value for left arrow key
const ARROW_RIGHT_KEYCODE = 39 // KeyboardEvent.which value for right arrow key
const TOUCHEVENT_COMPAT_WAIT = 500 // Time for mouse compat events to fire after touch
const SWIPE_THRESHOLD = 40
//const TRANSITION_END = 'transitionend'
const INNER_TEM = `<ol class="productcarousel-indicators">
                    {{each imgList item i}}
                        <li data-slide-to="{{i}}" class="{{if i==0}}active{{/if}}"></li>
                    {{/each}}
                    </ol>
                    <div class="productcarousel-inner">
                    {{each imgList item i}}
                        <div class="productcarousel-item {{if i==0}}active{{/if}}">
                            <a href="{{item.Href}}" target="_blank">
                                <img src="{{item.Src}}" class="" alt="{{item.Alt}}" onload="if (this.naturalWidth > this.parentNode.clientWidth && this.naturalHeight > this.parentNode.clientHeight){if (this.naturalWidth / this.naturalHeight > this.parentNode.clientWidth / this.parentNode.clientHeight){this.style.maxHeight = '100%'; this.style.maxWidth = 'none';} else {this.style.maxWidth = '100%'; this.style.maxHeight = 'none';}}console.log(this.naturalWidth, this.naturalHeight, this.parentNode.clientWidth)">
                            </a>    
                        </div>
                    {{/each}}
                    </div>
                    <a class="productcarousel-control-prev" href="#productcarouselExampleControls" role="button" data-slide="prev">
                        <span class="productcarousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="productcarousel-control-next" href="#productcarouselExampleControls" role="button" data-slide="next">
                        <span class="productcarousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>`;
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="productcarousel" class="productcarousel slide {{_SysClass}}" >
    ${INNER_TEM}
</div>`;
const $ = getjQuery()
const Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
}
const Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
}
const Event = {
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
    CLICK_DATA_API: `click${EVENT_KEY}`
}
const ClassName = {
    CAROUSEL: 'productcarousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'productcarousel-item-right',
    LEFT: 'productcarousel-item-left',
    NEXT: 'productcarousel-item-next',
    PREV: 'productcarousel-item-prev',
    ITEM: 'productcarousel-item',
    POINTER_EVENT: 'pointer-event'
}
const Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.productcarousel-item',
    ITEM: '.productcarousel-item',
    ITEM_IMG: '.productcarousel-item img',
    NEXT_PREV: '.productcarousel-item-next, .productcarousel-item-prev',
    INDICATORS: '.productcarousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="productcarousel"]'
}
const PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
}
class ProductCarousel {
    constructor(id, style, options) {
        this._id = id
        this._control = $('#' + id);
        this._type = 'productcarousel'
        this._style = style;
        this._items = null
        this._interval = null
        this._activeElement = null
        this._isPaused = false
        this._isSliding = false
        this.touchTimeout = null
        this.touchStartX = 0
        this.touchDeltaX = 0

        this._config = $.extend({}, Default, options)
        this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
        this._pointerEvent = false;// Boolean(window.PointerEvent || window.MSPointerEvent)
    }
    _init() {
        this._indicatorsElement = this._control.find(Selector.INDICATORS);
        this._addEventListeners();
        $.data(this._control, DATA_KEY, this)
    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }


    refreshControl(data, callback) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_inner';
        const html = template(cacheKey, INNER_TEM, data);
        document.getElementById(this._id).innerHTML = html;
        this.dispose();
        this._init();
        if (typeof callback === 'function') {
            callback(this._id);
        }
    }


    nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the productcarousel or its parent isn't visible
        if (!document.hidden && this._control.is(':visible')) {
            this.next()
        }
    }
    next() {

        if (this._isSliding) return;
        return this.slide(Direction.NEXT)
    }
    prev() {
        if (this._isSliding) return
        return this.slide(Direction.PREV)
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

        this._config && this._config.interval
            && !this._isPaused
            && (this._interval = setInterval($.proxy(this.next, this), this._config.interval))

        return this
    }
    to(pos) {
        var that = this
        var activeIndex = this.getItemIndex(this.$active = this._control.find(Selector.ACTIVE_ITEM))
        console.log(this._items, '--------');
        if (pos > (this._items.length - 1) || pos < 0) return
        console.log(this._isSliding, '=======');

        if (this._isSliding) return this._control.one(Event.SLID, function () { that.to(pos) }) // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle()

        return this.slide(pos > activeIndex ? Direction.NEXT : Direction.PREV, this._items.eq(pos))
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
        $.data(this._control, DATA_KEY, null)
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
            this._indicatorsElement.find('.' + ClassName.ACTIVE).removeClass(ClassName.ACTIVE)
            var $nextIndicator = $(this._indicatorsElement.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass(ClassName.ACTIVE)
        }

        var slidEvent = $.Event(Event.SLID, { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
        if ($.support.transition && this._control.hasClass(ClassName.SLIDE)) {
            $next.addClass(orderClassName)
            if (typeof $next === 'object' && $next.length) {
                $next[0].offsetWidth // force reflow
            }
            $active.addClass(directionClass)
            $next.addClass(directionClass)
            $active
                .one('bsTransitionEnd', function () {
                    $next.removeClass([orderClassName, directionClass].join(' ')).addClass(ClassName.ACTIVE)
                    $active.removeClass([ClassName.ACTIVE, directionClass].join(' '))
                    that._isSliding = false
                    setTimeout(function () {
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
    getItemForDirection(direction, active) {
        const activeIndex = this.getItemIndex(active)
        const willWrap = (direction == Direction.PREV && activeIndex === 0)
            || (direction == Direction.NEXT && activeIndex == (this._items.length - 1))
        if (willWrap && !this._config.wrap) return active
        const delta = direction == Direction.PREV ? -1 : 1
        const itemIndex = (activeIndex + delta) % this._items.length
        return this._items.eq(itemIndex)
    }



    _addEventListeners() {
        if (this._config.keyboard) {
            this._control.off(Event.KEYDOWN).on(Event.KEYDOWN, $.proxy(this._keydown, this));

        }

        if (this._config.pause === 'hover') {
            this._control.off(Event.MOUSEENTER).on(Event.MOUSEENTER, $.proxy(this.pause, this));
            this._control.off(Event.MOUSELEAVE).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
        }
        

        this._control.off(Event.CLICK_DATA_API).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, $.proxy(this._prevNextClick, this));
        this._control.off(Event.MOUSEENTER).on(Event.MOUSEENTER, Selector.DATA_SLIDE, $.proxy(this._onMouseEnter, this));
        if (this._config.touch && this._touchSupported) {
            this._addTouchEventListeners()
        }
    }

    _addTouchEventListeners() {
        const start = event => {
            if (this._pointerEvent && event.pointerType && PointerType[event.pointerType.toUpperCase()]) {
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
            if (this._pointerEvent && event.pointerType && PointerType[event.pointerType.toUpperCase()]) {
                this.touchDeltaX = event.clientX - this.touchStartX
            }
            if (event.touches && event.touches.length == 1) {
                this.touchDeltaX = event.touches[0].clientX - this.touchStartX
            }
            this._handleSwipe()
            if (this._config.pause === 'hover') {
                // If it's a touch-enabled device, mouseenter/leave are fired as
                // part of the mouse compatibility events on first tap - the productcarousel
                // would stop cycling until user tapped out of it;
                // here, we listen for touchend, explicitly pause the productcarousel
                // (as if it's the second time we tap on it, mouseenter compat event
                // is NOT fired) and after a timeout (to allow for mouse compatibility
                // events to fire) we explicitly restart cycling

                this.pause()
                if (this.touchTimeout) {
                    clearTimeout(this.touchTimeout)
                }

                this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval)
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
        this._control.off(Event.TOUCHSTART).on(Event.TOUCHSTART, $.proxy(start, this));
        this._control.off(Event.TOUCHMOVE).on(Event.TOUCHMOVE, $.proxy(move, this));
        this._control.off(Event.TOUCHEND).on(Event.TOUCHEND, $.proxy(end, this));
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
        let $this = $(e.target);
        if ($this.hasClass('productcarousel-control-next-icon') || $this.hasClass('productcarousel-control-prev-icon')) {
            $this = $this.parent();
        }
        const direct = $this.attr('data-slide');
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
                this.to(parseInt(slideIndex));
            }
        }
        e.preventDefault()
    }
    _onMouseEnter(e) {
        let $this = $(e.target);
        const slideIndex = $this.attr('data-slide-to')
        if (slideIndex) {
            //config.interval = false
            this.to(parseInt(slideIndex));
        }
        e.preventDefault()
    }
    getItemIndex(item) {
        this._items = item.parent().children(Selector.ITEM)
        return this._items.index(item || this.$active)
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


    // Static

    static productcarouselInterface(element, config) {
        const $this = $(element);
        let data = $this.data(DATA_KEY)
        let _config = Default;

        if (typeof config === 'object') {
            _config = $.extend({}, ProductCarousel.DEFAULTS, config);
        }

        const action = typeof config === 'string' ? config : _config.slide

        if (!data) {
            data = new ProductCarousel($this.attr('id'), 'style1')
            data._init();
        }

        if (typeof config === 'number') {
            data.to(config)
        } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
                throw new TypeError(`No method named "${action}"`)
            }

            data[action]()
        } else if (_config.interval) {
            data.pause()
            data.cycle()
        }
    }

    static jQueryInterface(config) {
        return this.each(function () {
            ProductCarousel.productcarouselInterface(this, config)
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
            return { end: transEndEventNames[name] }
        }
    }

    return false // explicit for ie8 (  ._.)
}
if ($) {
    // https://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    $(function () {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })
    const JQUERY_NO_CONFLICT = $.fn[NAME]
    $.fn[NAME] = ProductCarousel.jQueryInterface
    $.fn[NAME].Constructor = ProductCarousel
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return ProductCarousel.jQueryInterface
    }
    $(window).on('load', function () {
        $('[data-ride="productcarousel"]')[NAME]();
    })
}
export default ProductCarousel