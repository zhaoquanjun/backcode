import { downloadApiBase } from '../../env'
import HttpRequest from '../../util/httpRequest'
import template from '../../templateengine/index'
import { getjQuery, getSysClass } from '../../util'
const DATA_KEY = 'st.atlas'
const EVENT_KEY = `.${DATA_KEY}`
const $ = getjQuery()
export const Direction = {
  NEXT: 'next',
  PREV: 'prev'
}

export const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`,
  KEYDOWN: `keydown${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`,
  TOUCHSTART: `touchstart${EVENT_KEY}`,
  TOUCHMOVE: `touchmove${EVENT_KEY}`,
  TOUCHEND: `touchend${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`
}
const SWIPE_THRESHOLD = 40
const WIDTH = 992
const THUMBS_INNER_TEM = `{{each imgList item i}}   
                                <li>
                                    <div class='gallery-item' data-slide-to="{{i}}">
                                        <img alt="" src='{{item.Src}}' >
                                    </div>
                                </li>
                             {{/each}}`
export const PREVIEW_INNER_TEM = ` <div class="banner-slider">
                              <div class="swiper">
                                  <div class="image-wrap"><img class="previewSrc" width="auto" height="auto" src="" /></div>
                              </div>
                              <button class="slider-btn left-prev" data-slide="prev">
                                  <i class="iconfont iconicon-des-Arrow"></i>
                              </button>
                              <button class="slider-btn right-next" @click="next" data-slide="next">
                                  <i class="iconfont iconicon-des-Arrow"></i>
                              </button>
                              <button class="dialog-close">
                                  <i class="iconfont iconguanbi"></i>
                              </button>
                              <div class="lz-see-change">
                                  <a data-size="sm" href="javascript:;" class="see-change lz-see-change-sm mw-iconfont"><i  data-size="sm" class="iconfont iconsuoxiao"></i></a>
                                  <span class="lz-see-change-txt">100%</span>
                                  <a data-size="lg" href="javascript:;" class="see-change lz-see-change-lg mw-iconfont" ><i data-size="lg" class="iconfont iconfangda"></i></a>
                              </div>
                              </div>

                              <div class="gallery-thumbs">
                              <div class="gallery-wrap">
                                  <a href="javascript:;" class="spec-arrow arrow-prev " data-slide="prev" is-gallery="true"><i
                                          class="sprite-arrow-prev"></i></a>
                                  <a href="javascript:;" class="spec-arrow arrow-next" data-slide="next" is-gallery="true"><i
                                          class="sprite-arrow-next"></i></a>
                                  <div class="thumbs-wrap">
                                      <ul class="thumbs-list">${THUMBS_INNER_TEM}</ul>
                                  </div>
                              </div>
</div>`
export const Selector = {
  ATLAS_CONTAINER: '.atlas-container',
  ACTIVE_ITEM: '.linkArea',
  LIST_ITEM: '.list-item ',
  ATLAS_LIST: '.atlas-list',
  IMGVIEW: '.imgview',
  IMGSRC: '.imgSrc',
  LIST_PARENT: '.atlas-list__area',
  GALLERY_ITEM: '.gallery-item',
  THUMBS_LIST: '.thumbs-list',
  DIALOG_CLOSE_BTN: '.dialog-close',
  ATLAS_PREVIEW: '.atlas-preview',
  SLIDE_BNT: '.slider-btn',
  SPEC_ARROW: '.spec-arrow',
  SWIPER_BUTTON: '.swiper-button',
  PREVIEWSRC: '.previewSrc',
  MOVE_PREV: '.move-prev',
  MOVE_NEXT: '.move-next',
  PREVIEW_IMG_WRAP: '.atlas-preview .image-wrap'
}

const ClassName = {
  IMG_HOVER: 'img-hover'
}
const PointerType = {
  TOUCH: 'touch'
}
class Base {
  constructor() {
    this._touchSupported =
      'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
    this.status = {
      curClickPicIndex: 0,
      touchDeltaX: 0,
      imgwidth: 100
    }
  }
  _baseInit() {
    this.status.curClickPicIndex = 0
    this.status.touchDeltaX = 0
    this._thumbWrap = this._control.find(Selector.THUMBS_LIST)
    this._thumbList = this._thumbWrap.children()
    this._total = this._thumbList.length
  }
  baseRefreshControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    const thumbs_cacheKey = DATA_KEY + '_thumbs' + this._style
    const html2 = template(thumbs_cacheKey, THUMBS_INNER_TEM, data)
    this._control.find(Selector.THUMBS_LIST).html(html2)
  }

  //  初始化左右箭头
  _initOriginMl() {
    const len = this._control.find(Selector.ATLAS_LIST).children().length
    const winW = $(window).width()
    let percent =
      winW > WIDTH ? this._dataConf.percent : this._dataConf.mobilePercent

    if (len <= percent) {
      this._disabledPrevMoveBtn(Selector.MOVE_PREV)
      this._disabledNextMoveBtn(Selector.MOVE_NEXT)
    } else {
      this._enableNextMoveBtn(Selector.MOVE_NEXT)
    }
    this._control.find(Selector.ATLAS_LIST).find('li.list-item').eq(0).attr({
      ml: 0
    })
  }

  cloneItem() {
    const listContainer = this._control.find(Selector.ATLAS_LIST)
    const listLength = listContainer.children().length
    if (listLength >= 2) {
      let cloneItem = listContainer
        .children()
        .eq(0)
        .clone()
        .addClass('mobile-item ')
      listContainer.append(cloneItem)
    }
  }

  /** 点击图片 */
  _handleClickPic(e) {
    let $target = $(e.currentTarget)
    const href = $target.find('.linkArea').attr('href')
    const reg = /javascript/
    if (reg.test(href)) {
      this.status.curClickPicIndex = event.currentTarget.getAttribute(
        'data-slide-to'
      )
      this.atlasPreviewShow(this.status.curClickPicIndex)
      return false
    } else {
      this._downloadFile(e)
    }
  }
  /** 文件下载 */
  _downloadFile(e) {
    const type = $(e.currentTarget).attr('data-type')
    if (type === 'file') {
      const url = downloadApiBase + $(e.currentTarget).attr('href')
      e.stopPropagation()
      e.preventDefault()
      HttpRequest.get(
        url,
        {},
        function (res) {
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
        function (err) {
          console.log(err)
        }
      )
    }
  }
  /**
   * 改变PC显示每行个数
   * @param { Object } data.mobilePercent 每行显示个数
   */
  changeListItemWidth(data) {
    const $listItem = this._control.find('.list-item')
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
  changeMobilelistRowWidth(data) {
    const atlasList = this._control.find('.atlas-list')
    const $listItem = atlasList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-md-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-md-item${data.mobilePercent}`)
    this._dataConf.mobilePercent = data.mobilePercent
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }
  _disabledPrevMoveBtn(element = Selector.MOVE_PREV) {
    this._control.find(element).addClass('disabled')
    this._control.find(element).css('opacity', 0)
  }

  _disabledNextMoveBtn(element = Selector.MOVE_NEXT) {
    this._control.find(element).addClass('disabled')
    this._control.find(element).css('opacity', 0)
  }

  _enablePrevMoveBtn(element = Selector.MOVE_PREV) {
    this._control.find(element).removeClass('disabled')
    this._control.find(element).css('opacity', 1)
  }

  _enableNextMoveBtn(element = Selector.MOVE_NEXT) {
    this._control.find(element).removeClass('disabled')
    this._control.find(element).css('opacity', 1)
  }
  changeIconDisplay(data) {
    var display = data && data['iconDisplay'] ? data['iconDisplay'] : 'block'
    var icon = data && data['icon'] ? data['icon'] : ''
    this._control.find('i.iconfont').map((i, it) => {
      $(it).css({
        display: display
      })
      $(it)
        .removeClass()
        .addClass('iconfont ' + icon)
    })
    this._dataConf.icon = icon
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }

  /**-----preview begin--------- */
  /**
   * 预览大图 点击小图箭头
   */
  gallerySlide() {
    let $thumbsList = this._control.find(Selector.THUMBS_LIST)
    const item = this._thumbList.first()
    let imgWidth = item.outerWidth()
    let imgListWidth = this._total * imgWidth // 图片总宽度
    $thumbsList.css({
      width: imgListWidth
    })

    // 前三个正常显示
    if (parseInt(this.status.curClickPicIndex) < 2) {
      $thumbsList.css({
        left: 0
      })
      return
    }
    // 最后一个
    if (
      parseInt(this.status.curClickPicIndex) + 1 >= this._total &&
      this.status.curClickPicIndex >= 5 &&
      this._total > 5
    ) {
      $thumbsList.css({
        left: -(this.status.curClickPicIndex - 4) * imgWidth + 'px'
      })
      return
    }
    // 倒数第二个
    if (
      parseInt(this.status.curClickPicIndex) + 2 >= this._total &&
      this.status.curClickPicIndex >= 4 &&
      this._total > 5
    ) {
      $thumbsList.css({
        left: -(this.status.curClickPicIndex - 3) * imgWidth + 'px'
      })
      return
    }
    // 其他情况
    if (this.status.curClickPicIndex > 2 && this._total > 5) {
      $thumbsList.css({
        left: -imgWidth * (this.status.curClickPicIndex - 2) + 'px'
      })
    }
  }
  atlasPreviewShow(index) {
    this._control.find(Selector.ATLAS_PREVIEW).show()
    this.to(index)
    this.gallerySlide()
  }
  /**
   * 关闭预览大图
   */
  closePreview() {
    this._control.find(Selector.ATLAS_PREVIEW).hide()
  }

  changeThumbSelected(e) {
    let index = $(e.currentTarget).attr('data-slide-to')
    this.status.curClickPicIndex = index
    this.to(index)
  }
  /**
   * 预览大图时 点击 + - 缩放图片
   * @param {*} e event
   */
  scaling(e) {
    let dataSize = e.target.getAttribute('data-size')
    let width = this._control.find(Selector.PREVIEWSRC).innerWidth()
    if (dataSize === 'sm') {
      if (this.status.imgwidth <= 10) return
      this._control.find(Selector.PREVIEWSRC).css({
        width: width - width * 0.05 + 'px',
        maxHeight: '100%'
      })
      this.status.imgwidth -= 5
    } else {
      if (this.status.imgwidth >= 500) return
      this._control.find(Selector.PREVIEWSRC).css({
        width: width + width * 0.05 + 'px',
        maxHeight: 'none'
      })
      this.status.imgwidth += 5
    }
    this._control.find('.lz-see-change-txt').html(this.status.imgwidth + '%')
  }

  to(index) {
    const item = this._thumbList.eq(index)
    //设置预览大图地址

    this._control
      .find(Selector.PREVIEWSRC)
      .attr('src', item.children().children().attr('src'))
    this._control
      .find(Selector.GALLERY_ITEM)
      .eq(index)
      .addClass(ClassName.IMG_HOVER)
      .parent()
      .siblings()
      .children()
      .removeClass(ClassName.IMG_HOVER)
    this._control.find(Selector.PREVIEWSRC).css({
      width: 'auto',
      maxHeight: '100%'
    })
  }

  next() {
    return this.slide(Direction.NEXT)
  }
  prev() {
    return this.slide(Direction.PREV)
  }
  _prevNextClick(e) {
    let $this = $(e.currentTarget)
    const direct = $this.attr('data-slide')
    direct === Direction.NEXT ? this.next() : this.prev()
    this.gallerySlide(direct)
  }
  slide(type) {
    if (type === Direction.NEXT) {
      this.status.curClickPicIndex = parseInt(this.status.curClickPicIndex) + 1
      if (this.status.curClickPicIndex >= this._total)
        this.status.curClickPicIndex = 0
    } else {
      --this.status.curClickPicIndex
      if (this.status.curClickPicIndex < 0)
        this.status.curClickPicIndex = this._total - 1
    }
    this.to(this.status.curClickPicIndex)
  }
  _addTouchPrevSwiperEvent() {
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
      .find(Selector.PREVIEW_IMG_WRAP)
      .off(Event.TOUCHSTART)
      .on(Event.TOUCHSTART, $.proxy(start, this))
    this._control
      .find(Selector.PREVIEW_IMG_WRAP)
      .off(Event.TOUCHMOVE)
      .on(Event.TOUCHMOVE, $.proxy(move, this))
    this._control
      .find(Selector.PREVIEW_IMG_WRAP)
      .off(Event.TOUCHEND)
      .on(Event.TOUCHEND, $.proxy(end, this))
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
  /**-----preview end--------- */

  /** 判断当前常态下左右按钮的显示状态 */
  _checkPrevAndNextBtnStatus() {
    const listContainer = this._control.find(Selector.ATLAS_LIST)
    const atlasLen = listContainer.children().length
    const winW = $(window).width()
    let percent =
      winW > WIDTH ? this._dataConf.percent : this._dataConf.mobilePercent
    if (percent >= atlasLen) {
      this._disabledNextMoveBtn(Selector.MOVE_NEXT)
      this._disabledPrevMoveBtn(Selector.MOVE_PREV)
    }
  }

  _moveNext() {
    const listContainer = this._control.find(Selector.ATLAS_LIST)
    const firstItem = listContainer.find('li.list-item').eq(0)
    this.swiperIndex = parseInt(firstItem.attr('ml'))
    const atlasLen = listContainer.children().length
    const winW = $(window).width()
    let percent =
      winW > WIDTH
        ? parseInt(this._dataConf.percent)
        : parseInt(this._dataConf.mobilePercent)

    if (this.swiperIndex + percent * 2 <= atlasLen) {
      this.swiperIndex += percent

      firstItem
        .css({
          marginLeft: -(100 / percent) * this.swiperIndex + '%'
        })
        .attr({
          ml: this.swiperIndex
        })
      this._enablePrevMoveBtn()
      if (this.swiperIndex + percent == atlasLen)
        this._disabledNextMoveBtn(Selector.MOVE_NEXT)
    } else if (
      this.swiperIndex + percent < atlasLen &&
      this.swiperIndex + percent * 2 > atlasLen
    ) {
      this.swiperIndex += atlasLen - this.swiperIndex - percent
      firstItem
        .css({
          marginLeft: -(100 / percent) * this.swiperIndex + '%'
        })
        .attr({
          ml: this.swiperIndex
        })
      this._enablePrevMoveBtn(Selector.MOVE_PREV)
      this._disabledNextMoveBtn(Selector.MOVE_NEXT)
    } else {
      this._disabledNextMoveBtn(Selector.MOVE_NEXT)
    }
  }

  _movePrev() {
    const listContainer = this._control.find(Selector.ATLAS_LIST)
    const firstItem = listContainer.find('li.list-item').eq(0)
    this.swiperIndex = parseInt(firstItem.attr('ml'))
    const winW = $(window).width()
    let percent =
      winW > WIDTH
        ? parseInt(this._dataConf.percent)
        : parseInt(this._dataConf.mobilePercent)
    if (this.swiperIndex >= percent) {
      this.swiperIndex -= percent
      firstItem
        .css({
          marginLeft: -(100 / percent) * this.swiperIndex + '%'
        })
        .attr({
          ml: this.swiperIndex
        })
      if (this.swiperIndex == 0) this._disabledPrevMoveBtn(Selector.MOVE_PREV)
      this._enableNextMoveBtn(Selector.MOVE_NEXT)
    } else if (this.swiperIndex > 0 && this.swiperIndex < percent) {
      this.swiperIndex = 0
      firstItem
        .css({
          marginLeft: 0
        })
        .attr({
          ml: this.swiperIndex
        })
      this._disabledPrevMoveBtn(Selector.MOVE_PREV)
      this._enableNextMoveBtn(Selector.MOVE_NEXT)
    } else {
      this._disabledPrevMoveBtn(Selector.MOVE_PREV)
    }
  }
  _addTouchSwiperEvent() {
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

      if (Math.abs(this.touchDeltaX) > 50) {
        const listContainer = this._control.find(Selector.ATLAS_LIST)
        const listLength = listContainer.children().length
        const firstItem = listContainer.find('li.list-item').eq(0)
        this.swiperIndex = parseInt(firstItem.attr('ml'))
        let percent = parseInt(this._dataConf.mobilePercent)
        let count = parseInt(this._dataConf.mobilePercent)
        if (this.touchDeltaX < 0 && listLength > 1) {
          this.swiperIndex += percent
          if (this.swiperIndex >= listLength) {
            this.touchDeltaX = 0
            firstItem.css({ marginLeft: 0 })
            this.swiperIndex = 1
          }
          firstItem
            .stop()
            .animate({ marginLeft: -(100 / percent) * this.swiperIndex + '%' })

          firstItem.attr({ ml: this.swiperIndex })
          this.autoFocus()
        }
        if (this.touchDeltaX > 0 && listLength > 1) {
          console.log('2')
          this.swiperIndex -= count
          if (this.swiperIndex < 0) {
            this.touchDeltaX = 0
            firstItem.css({
              marginLeft: -(100 / percent) * (listLength - 1) + '%'
            })
            this.swiperIndex = listLength - 2
          }
          firstItem.stop().animate({
            marginLeft: -(100 / percent) * this.swiperIndex + '%'
          })
          firstItem.attr({
            ml: this.swiperIndex
          })
          this.autoFocus()
        }
      }
      this.touchDeltaX = 0
    }
    this._control
      .off(Event.TOUCHSTART)
      .on(Event.TOUCHSTART, $.proxy(start, this))
    this._control.off(Event.TOUCHMOVE).on(Event.TOUCHMOVE, $.proxy(move, this))
    this._control.off(Event.TOUCHEND).on(Event.TOUCHEND, $.proxy(end, this))
  }
  autoFocus() {
    const listContainer = this._control.find(Selector.ATLAS_LIST)
    const listLength = listContainer.children().length
    let step = this.swiperIndex
    step == listLength - 1 ? (step = 0) : null
    this._control
      .find('.carousel-indicators .mobile-indicators')
      .eq(step)
      .addClass('active')
      .siblings('.mobile-indicators')
      .removeClass('active')
  }
}
export default Base
