/**
 * ----------------------------------------
 * SmartUi(v0.1):columns.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
import { isDesign } from '../env'
// import { isDesign } from '../env/index'
const INNER_TEM = `<div class="tab-header__section clearfix">
        <ul class="tab-header__container clearfix">
            {{each childArea item i}}
                {{if selectedAreaId == item.Id}}
                    <li class="tab-header__item selected" id="header_{{item.Id}}_{{_Id}}">{{item.Title}}</li>
                {{else}}
                    <li class="tab-header__item" id="header_{{item.Id}}_{{_Id}}">{{item.Title}}</li>
                {{/if}}
            {{/each}}
        </ul>
    </div>
    {{each childArea item i}}
        {{if selectedAreaId == item.Id}}
                <div class="tab-content__section Area {{if item.Html==''}}sm-empty{{/if}} fmcontrol selected" data-title="{{item.Area}}"
                id="{{item.Id}}_{{_Id}}">{{@item.Html}}</div>
            {{else}}
                <div class="tab-content__section Area {{if item.Html==''}}sm-empty{{/if}} fmcontrol" data-title="{{item.Area}}" id="{{item.Id}}_{{_Id}}">{{@item.Html}}</div>
        {{/if}}
    {{/each}}
    `

const NAME = 'tab'
const DATA_KEY = `st.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const Event = {
  CLICK: `click${EVENT_KEY}`,
  LOAD: `load${EVENT_KEY}`,
  TOUCHSTART: `touchstart${EVENT_KEY}`,
  TOUCHMOVE: `touchmove${EVENT_KEY}`,
  TOUCHEND: `touchend${EVENT_KEY}`
}

const PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
}

const templates = {}
templates[
  'style1'
] = `<div id="{{_Id}}" data-c-type="tab" class="c-tab {{_SysClass}}" >
        ${INNER_TEM}
</div>`
const $ = getjQuery()

class Tab {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + id)
    this._style = style
    this.touchStartX = 0
    this.touchDeltaX = 0
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
    this._pointerEvent = false // Boolean(window.PointerEvent || window.MSPointerEvent)
  }

  _init() {
    this._tabHeaderContainer = this._control.find('.tab-header__section')
    this._tabHeaderItems = this._control
      .find('.tab-header__section')
      .find('.tab-header__item')
    this._tabContentItems = this._control.find('.tab-content__section')
    this._addEventListener()
    this._control.data(DATA_KEY, this)
  }

  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  addEmptyArea(data, callback) {
    const areas = data.childArea
    const childLen = areas.length
    for (let i = 0; i < childLen; i++) {
      const areaId = areas[i].Id + '_' + this._id
      const $area = $('#' + areaId)
      const area = areas[i].Area
      if ($area.length == 0) {
        this._addSingleArea(areaId, areas[i], data.index)
      } else {
        const areaChildLen = $area.children().length
        if (areaChildLen > 0) {
          if ($area.hasClass('selected')) {
            $area.attr('class', 'tab-content__section Area fmcontrol selected')
          } else {
            $area.attr('class', 'tab-content__section Area fmcontrol')
          }
        } else {
          if ($area.hasClass('selected')) {
            $area.attr(
              'class',
              'tab-content__section Area sm-empty  fmcontrol selected'
            )
          } else {
            $area.attr('class', 'tab-content__section Area sm-empty  fmcontrol')
          }
        }
        $area.attr('data-title', area)
      }
    }
    this._init()
    if (typeof callback == 'function') {
      callback()
    }
  }
  removeEmptyArea(data) {
    const areas = data.childArea
    const childLen = areas.length
    const areaIdDic = {}
    for (let i = 0; i < childLen; i++) {
      areaIdDic[areas[i].Id + '_' + this._id] = areas[i].Id
    }
    const waitDeleteAreaId = []
    this._control.find('.tab-content__section').each(function() {
      let $this = $(this)
      const id = $this.attr('id')
      const title = this.Title
      const areaChildLen = $this.children().length
      if (!areaIdDic[id]) {
        waitDeleteAreaId.push(id)
      }
      if (areaChildLen > 0) {
        if ($this.hasClass('selected')) {
          $this.attr('class', 'tab-content__section Area fmcontrol selected')
        } else {
          $this.attr('class', 'tab-content__section Area fmcontrol')
        }
      } else {
        if ($this.hasClass('selected')) {
          $this.attr(
            'class',
            'tab-content__section Area sm-empty fmcontrol selected'
          )
        } else {
          $this.attr('class', 'tab-content__section Area sm-empty fmcontrol')
        }
      }
      $this.attr('data-title', title)
    })
    for (let k = 0; k < waitDeleteAreaId.length; k++) {
      $('#' + waitDeleteAreaId[k]).remove()
      $('#header_' + waitDeleteAreaId[k]).remove()
    }
    var flag = this._control.find('.tab-content__section').hasClass('selected')
    if (!flag) {
      this._control
        .find('.tab-content__section')
        .eq(0)
        .addClass('selected')
      this._control
        .find('.tab-header__container')
        .children()
        .eq(0)
        .addClass('selected')
    }
  }
  editArea(data) {
    var $header = this._control.find(
      '#' + 'header_' + data.item.Id + '_' + this._id
    )
    $header.html(data.item.Title)
  }
  changeSelected(id, callback) {
    const $tabItem = $('#header_' + id + '_' + this._id)
    const $tabHeader = $tabItem.parent()
    let offset = $tabItem.offset()
    let parentSectionWidth = $tabHeader.parent('.tab-header__section').width()
    let index = $tabItem.index()
    let sliderLeft = $tabItem.width() * (index + 1) + index
    let sliderRight = index != 0 ? $tabItem.width() * index + index - 1 : 0
    let dis = sliderLeft - parentSectionWidth
    if (dis > 0) {
      $tabItem.parent().css({
        transform: `translate(-${dis}px)`
      })
    }
    if (offset.left < 0) {
      $tabHeader.css({
        transform: `translate(${-sliderRight}px)`
      })
    }
    if (typeof callback == 'function') callback()
  }
  _addEventListener() {
    this._tabHeaderItems
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._clickEvent, this))
    if (this._touchSupported && this._style === 'style1') {
      this._addTouchEventListeners()
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
      if (Math.abs(this.touchDeltaX) > 50) {
        var tabHeader = this._control.find('.tab-header__container')
        var headerW = tabHeader.width()
        var transX =
          tabHeader.css('transform') !== 'none'
            ? Math.abs(
                parseInt(
                  tabHeader
                    .css('transform')
                    .slice(7, 26)
                    .split(',')[4]
                )
              )
            : 0
        var winW = $(window).width()
        var ratio = 1.2
        var slideDis = winW * ratio
        var newTransX = 0
        if (this.touchDeltaX < 0) {
          newTransX =
            headerW - transX - winW >= slideDis
              ? -(transX + slideDis)
              : winW - headerW
        }
        if (this.touchDeltaX > 0) {
          newTransX = transX - winW > slideDis ? slideDis - transX : 0
        }
        tabHeader.css({
          transform: `translateX(${newTransX}px)`
        })
      }
    }
    this._control
      .off(Event.TOUCHSTART)
      .on(Event.TOUCHSTART, $.proxy(start, this))
    this._control.off(Event.TOUCHMOVE).on(Event.TOUCHMOVE, $.proxy(move, this))
    this._control.off(Event.TOUCHEND).on(Event.TOUCHEND, $.proxy(end, this))
  }
  _clickEvent(e) {
    let ele = $(e.target)
    if (!isDesign()) {
      e.stopPropagation()
    }
    let index = ele.index()
    ele
      .addClass('selected')
      .siblings()
      .removeClass('selected')
    this._tabContentItems
      .eq(index)
      .addClass('selected')
      .siblings()
      .removeClass('selected')
    if (isDesign() && window.parent.smSite) {
      let oid = ele.attr('id');
      let cid = oid.split('_')[1]
      window.parent.smSite.setControlCurrentSelectedItem && window.parent.smSite.setControlCurrentSelectedItem(cid)
    }
  }
  _addSingleArea(id, item) {
    const tabHeader = `<li class="tab-header__item" id="header_${id}">${item.Title}</li>`
    const tabContent = `<div class="tab-content__section Area sm-empty fmcontrol" data-title="${item.Area}" id="${id}"></div>`
    const $header = $(tabHeader)
    const $content = $(tabContent)
    this._control.find('.tab-header__container').append($header)
    this._control.append($content)
  }
  refreshControl(data, callback) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_inner'
    const html = template(cacheKey, INNER_TEM, data)
    document.getElementById(this._id).innerHTML = html
    this._control.data(DATA_KEY, this)
    this._init()
    if (typeof callback === 'function') {
      callback(this._id)
    }
  }

  // Static
  static tabInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Tab($this.attr('id'), 'style1')
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
    return this.each(function() {
      Tab.tabInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Tab.jQueryInterface
$.fn[NAME].Constructor = Tab
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Tab.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default Tab
