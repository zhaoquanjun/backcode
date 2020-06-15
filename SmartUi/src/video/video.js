/**
 * ----------------------------------------
 * SmartUi(v0.1):video.js
 * ----------------------------------------
 */
import HttpRequest from '../util/httpRequest'
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
import { contentUrl, isDesign } from '../env/index'
const NAME = 'video'
const DATA_KEY = `st.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const Event = {
  CLICK: `click${EVENT_KEY}`,
  ENDED: `ended${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`
}

const INNER_TEM = `<video class="{ if Source == 1 } c-video-show { else } c-video-hide { /if }" muted src="{{UploadSrc}}" poster="{{Cover}}"  videoId="{{Id}}"></video>
    <div class="video-mask"></div>
    <div class="c-video-disabled c-video-hide">
    <div class="c-video-icon"></div>
    <p class="c-video__disabled--tips">该视频无法播放</p>
    </div>
    <div class="c-video-replay c-video-hide">
    <div class="c-video__replay--icon"></div>
    </div>
    <iframe  frameborder="0" class="{ if Source == 0 } c-video-show c-video-mh { else } c-video-hide { /if }" allowfullscreen="true" autoplay="{{Autoplay}}" scrolling="no" src="{{OutsideSrc}}"></iframe>`

const templates = {}
templates[
  'style1'
] = `<div class="c-video fmcontrol {{_SysClass}} { if Model.Source == 0 } c-video-mh { /if }" id="{{_Id}}" data-autoplay="{{Autoplay}}" data-source="{{Source}}" data-videoId="{{Id}}"  data-c-type="{{_Name}}" data-ride="video">
        ${INNER_TEM}
</div>`

const $ = getjQuery()
class Video {
  constructor(id, style) {
    this._id = id
    this._control = $('#' + id)
    this._style = style
  }

  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  _init() {
    this._control.data(DATA_KEY, this)
    if (isDesign()) {
      this._divideEnvironmentPlay()
      this._designAddEventListener()
    } else {
      this._publishAddEventListener()
      this._checkVideoAutoplay()
    }
    this._initIframeSize(0.5)
    this._initWindowResizeEvent()
  }
  _divideEnvironmentPlay() {
    if (this._control.attr('data-source') == 1) {
      this._control.find('video')[0].pause()
    }
    return false
  }
  _checkVideoAutoplay() {
    let autoplay = this._control.attr('data-autoplay')
    if (autoplay == 'true') {
      let _this = this
      this._checkVideoCanPlay(
        function(res) {
          console.log(res)
          if (res.isGetDownloadUrlSuccess) {
            _this._control.find('video').attr('src', res.downloadUrl)
            _this._control.find('video')[0].play()
          }
        },
        function() {
          _this._control.find('video').attr('src', '')
          _this._control
            .find('.c-video-disabled')
            .removeClass('c-video-hide')
            .css({
              display: 'flex'
            })
        }
      )
    }
  }
  _checkVideoCanPlay(successcallback, failcallback) {
    let id = this._control.attr('data-videoId')
    let url = contentUrl + '/video/' + id
    if (id) {
      HttpRequest.get(
        url,
        {},
        function(res) {
          successcallback(res)
        },
        function(err) {
          failcallback(err)
        }
      )
    }
  }

  _mouseenterEvent() {
    if (!isDesign()) this._control.find('video').attr('controls', 'controls')
  }
  _mouseleaveEvent() {
    this._control.find('video').removeAttr('controls')
  }
  _getPrevOrParentEle() {
    var prevEle = null
    var isPrev = true
    if (this._control.prev().legnth > 0) {
      prevEle = this._control.prev()
    } else {
      prevEle = this._control.parent()
      isPrev = false
    }
    return {
      prevEle,
      isPrev
    }
  }
  changeTab(val) {
    let type = val.Source
    if (type == 1) {
      this.changeSrcAndCover(val)
    }
    if (type == 0) {
      this.changeOutsideSrc(val)
    }
  }
  deleteCover(controlData) {
    if (controlData.dataModel.Source == 1) {
      this._control
        .find('video')
        .attr('poster', controlData.dataModel.DefaultCover)
    }
  }
  changeCover(val) {
    this._control.find('video').attr('poster', val.Cover)
  }
  changeAutoplay(val) {
    this._control.attr('data-autoplay', val.Autoplay)
  }
  changeSrcAndCover(val, callback) {
    this._control.find('video').attr('poster', val.Cover)
    this._control.find('video').attr('src', val.UploadSrc)
    this._control.attr('data-source', val.Source)
    this._control
      .find('video')
      .addClass('c-video-show')
      .removeClass('c-video-hide')
    this._control
      .find('iframe')
      .addClass('c-video-hide')
      .removeClass('c-video-show')
    this._control.attr('data-videoid', val.Id)
    this._divideEnvironmentPlay()
    if (typeof callback == 'function') callback()
  }
  changeOutsideSrc(val, callback) {
    let iframeSrc = val.OutsideSrc
    this._control.attr('data-source', val.Source)
    this._control.find('iframe').attr('src', iframeSrc)
    this._control
      .find('video')
      .addClass('c-video-hide')
      .removeClass('c-video-show')
    this._control
      .find('iframe')
      .addClass('c-video-show')
      .removeClass('c-video-hide')
    this._initIframeSize(0.5)
    if (typeof callback == 'function') callback()
  }
  _publishAddEventListener() {
    this._control
      .find('video')
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._videoClickEvent, this))
    this._control
      .find('c-video-disabled')
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._videoDisabledClickEvent, this))
    this._control.find('video')[0].removeEventListener('ended', function() {})
    this._control
      .find('video')[0]
      .addEventListener('ended', this._videoEndedEvent)
    this._control
      .find('.c-video-replay')
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._videoReplayEvent, this))
    this._control
      .off(Event.MOUSEENTER)
      .on(Event.MOUSEENTER, $.proxy(this._mouseenterEvent, this))
    this._control
      .off(Event.MOUSELEAVE)
      .on(Event.MOUSELEAVE, $.proxy(this._mouseleaveEvent, this))
  }
  _designAddEventListener() {
    this._control
      .off(Event.MOUSEENTER)
      .on(Event.MOUSEENTER, $.proxy(this._mouseenterEvent, this))
    this._control
      .off(Event.MOUSEENTER)
      .on(Event.MOUSEENTER, $.proxy(this._mouseenterEvent, this))
    this._control
      .off(Event.CLICK)
      .on(Event.CLICK, $.proxy(this._designerClickEvent, this))
  }
  _designerClickEvent(e) {
    e.stopPropagation()
    return false
  }
  _videoClickEvent(e) {
    e.stopPropagation()
    let ele = this._control
    let status = ele.find('video')[0].paused
    if (status) {
      var autoplay = this._control.attr('data-autoplay')
      if (!autoplay) {
        if (this._checkVideoCanPlay()) {
          ele.find('video')[0].play()
          ele
            .find('.c-video-replay')
            .addClass('c-video-hide')
            .removeClass('c-video-show')
        } else {
          ele
            .find('.c-video-disabled')
            .addClass('c-video-show')
            .removeClass('c-video-hide')
        }
      } else {
        ele.find('video')[0].play()
      }
    } else {
      ele.find('video')[0].pause()
    }
    return false
  }
  _videoReplayEvent(e) {
    e.stopPropagation()
    this._control.find('video')[0].play()
    this._control
      .find('.c-video-replay')
      .addClass('c-video-hide')
      .removeClass('c-video-show')
  }
  _videoDisabledClickEvent(e) {
    e.stopPropagation()
    return false
  }
  _initWindowResizeEvent() {
    let _this = this
    $(window).resize(function() {
      let ele = _this._control
      let ratio = ele.height() / ele.width()
      let height =
        ele.attr('data-source') == 0 ? ele.width() * ratio + 'px' : ''
      ele.css({
        height: height
      })
    })
  }
  _initIframeSize(ratio) {
    if (this._control.attr('data-source') == 0) {
      var ele = $('#' + this._id)
      var width = ele.width()
      var height = width * ratio
      ele.css({
        height: height + 'px'
      })
    }
  }
  _videoEndedEvent(e) {
    e.stopPropagation()
    let ele = $(this)
      .parent()
      .find('.c-video-replay')
    ele.removeClass('c-video-hide').addClass('c-video-show')
  }

  // Static
  static videoInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Video($this.attr('id'), 'style1')
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
      Video.videoInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Video.jQueryInterface
$.fn[NAME].Constructor = Video
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Video.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default Video
