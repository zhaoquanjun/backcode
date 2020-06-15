/**
 * ----------------------------------------
 * SmartUi(v0.1):navigation.js
 * ----------------------------------------
 */

import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
import HttpRequest from '../util/httpRequest'
import {
  getNavigationList,
  getSettedNavigationList,
  getPubNavigationList,
  runtimeMode
} from '../env/index'
import { isDesign } from '../env/index'
const DATA_KEY = 'st.navigation'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'navigation'
const WIDTH = 992
const MORE_WIDTH = 80
const $ = getjQuery()

const templates = {}
const INNER_TEM = `
                {{each listData item i}}
                    <li class="nav-item sup-item"  data-id="{{item.id}}" data-href="{{item.url}}" data-displayOrder="{{item.displayOrder}}">
                        <div class="item-link-view">
                            <a href="{{item.url}}" class="item-content {{if item.childs && item.childs.length>0 }}dropdown-select{{ /if }}" > 
                                <span class="ellipsis" >{{item.title}}</span>
                                {{if item.childs && item.childs.length > 0  }}
                                <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                {{/if}}
                            </a>
                            {{if item.childs && item.childs.length>0  }}
                            <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                            {{/if}}
                        </div>
                    {{if item.childs && item.childs.length>0 }}
                        <ul class="nav-list  sub-list sub-menu">
                            {{each item.childs child }}
                            <li class="nav-item" data-id="{{child.id}}">
                                <a class="ellipsis item-content" href="{{child.url}}">{{child.title}}</a>
                            </li>
                            {{/each}}
                        </ul>
                    {{/if}}    

                    </li>
                  
                {{/each}}
               
               
`

templates[
  'style1'
] = `<div class="navigation {{_SysClass}}" id="{{_Id}}" data-c-type="navigation" data-query='{{_Query}}' >
                            <div class="container">
                                <div class="nav-wrap">
                                    <ul class="nav-list menu-list">
                                    ${INNER_TEM}
                                    </ul>
                                    <ul class="nav-list check-more">
                                        <li class="nav-item sup-item ">
                                            <div class="item-link-view">
                                                <a href="javascript:;" class="item-content dropdown-select"> 
                                                    <span class="ellipsis more-text">{{ MoreText }}</span>
                                                    <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                                </a>
                                             </div>
                                            <ul class="nav-list nav-list-more" ></ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-nav-icon">
                                <i class="iconfont iconicon-dash-Navigationmore"></i>
                            </div>
                            <div class="header-mask"></div>
                        </div>`

const INNER_TEM2 = `
                        {{each listData item i}}
                            <li class="nav-item sup-item"  data-id="{{item.id}}" data-href="{{item.url}}">
                                <div class="item-link-view">
                                    <a href="{{item.url}}" class="item-content {{if item.childs && item.childs.length>0 }}dropdown-select{{ /if }}" > 
                                        <span class="ellipsis" >{{item.title}}</span>
                                        {{if item.childs && item.childs.length > 0  }}
                                        <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                        {{/if}}
                                    </a>
                                    {{if item.childs && item.childs.length>0  }}
                                    <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                    {{/if}}
                                </div>
                                <div class="sliding"></div>
                            {{if item.childs && item.childs.length>0 }}
                                <ul class="nav-list  sub-list sub-menu">
                                    {{each item.childs child }}
                                    <li class="nav-item" data-id="{{child.id}}">
                                        <a class="ellipsis item-content " href="{{child.url}}">{{child.title}}</a>
                                    </li>
                                    {{/each}}
                                </ul>
                            {{/if}}    
        
                            </li>
                          
                        {{/each}}
                       
                       
        `
templates[
  'style2'
] = `<div class="navigation {{_SysClass}}" id="{{_Id}}" data-c-type="navigation" data-query='{{_Query}}' >
                        <div class="container">
                            <div class="nav-wrap">
                                <ul class="nav-list menu-list">
                                ${INNER_TEM2}
                                
                                </ul>
                                <ul class="nav-list check-more">
                                    <li class="nav-item sup-item ">
                                        <div class="item-link-view">
                                            <a href="javascript:;" class="item-content dropdown-select"> 
                                                <span class="ellipsis more-text">{{ MoreText }}</span>
                                                <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                            </a>
                                         </div>
                                        <ul class="nav-list nav-list-more" ></ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="mb-nav-icon">
                            <i class="iconfont iconicon-dash-Navigationmore"></i>
                        </div>
                        <div class="header-mask"></div>
                    </div>`

const INNER_TEM3 = `
                    {{each listData item i}}
                        <li class="nav-item sup-item"  data-id="{{item.id}}" data-href="{{item.url}}">
                        <div class="item-warp">
                            <div class="item-link-view">
                                <a href="{{item.url}}" class="item-content  {{if item.childs && item.childs.length>0 }}dropdown-select{{ /if }}" > 
                                    <span class="ellipsis" >{{item.title}}</span>
                                    {{if item.childs && item.childs.length > 0  }}
                                    <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                    {{/if}}
                                </a>
                                {{if item.childs && item.childs.length>0  }}
                                <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                {{/if}}
                            </div>
                            <div class="item-link-view hover">
                                <a href="{{item.url}}" class="item-content  {{if item.childs && item.childs.length>0 }}dropdown-select{{ /if }}" > 
                                    <span class="ellipsis" >{{item.title}}</span>
                                    {{if item.childs && item.childs.length > 0  }}
                                    <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                    {{/if}}
                                </a>
                                {{if item.childs && item.childs.length>0  }}
                                <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                {{/if}}
                            </div>
                        
                        </div>  
                        {{if item.childs && item.childs.length>0 }}
                            <ul class="nav-list  sub-list sub-menu">
                                {{each item.childs child }}
                                <li class="nav-item" data-id="{{child.id}}">
                                    <a class="ellipsis item-content " href="{{child.url}}">{{child.title}}</a>
                                </li>
                                {{/each}}
                            </ul>
                        {{/if}}    
    
                        </li>
                      
                    {{/each}}
                   
                   
    `
templates[
  'style3'
] = `<div class="navigation {{_SysClass}}" id="{{_Id}}" data-c-type="navigation" data-query='{{_Query}}' >
                            <div class="container">
                                <div class="nav-wrap">
                                    <ul class="nav-list menu-list">
                                    ${INNER_TEM3}
                                    
                                    </ul>
                                    <ul class="nav-list check-more">
                                        <li class="nav-item sup-item ">
                                            <div class="item-link-view">
                                                <a href="javascript:;" class="item-content dropdown-select"> 
                                                    <span class="ellipsis more-text">{{ MoreText }}</span>
                                                    <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                                </a>
                                             </div>
                                            <ul class="nav-list nav-list-more" ></ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-nav-icon">
                                <i class="iconfont iconicon-dash-Navigationmore"></i>
                            </div>
                            <div class="header-mask"></div>
                        </div>`

const Selector = {
  DROPDOWN_SELECT: '.dropdown-select',
  DROPDOWN_ARROW: '.dropdown-arrow',
  MENU_LIST: '.menu-list',
  NAV_LIST: '.nav-list',
  SUB_LIST: '.sub-list',
  SUB_MENU: 'sub-menu',
  MOBILE_MENU: '.mb-nav-icon',

  ACTIVE: '.active',
  NAV_ITEM: '.nav-item'
}

const ClassName = {
  ACTIVE: 'active',
  DROPDOWN_ARROW_OPEN: 'dropdown-arrow-open',
  SUB_MENU_HEIGHT: 'subMenuHeight'
}

const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`,
  HOVER: `hover${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`
}
class Navigation {
  constructor(id, style, options) {
    this._id = id
    this._control = $('#' + id)
    this._style = style
    this._config = $.extend({}, options)

    this._query = JSON.parse(this._control.attr('data-query'))

    //去pc的hover
    document.body.addEventListener('touchstart', function () {})
  }
  _init() {
    this._dropdownSelect = this._control.find(Selector.DROPDOWN_SELECT)
    this._dropdownArrow = this._control.find(Selector.DROPDOWN_ARROW)
    this._menuList = this._control.find(Selector.MENU_LIST)

    this._control.data(DATA_KEY, this)

    this._addEventListeners()
    this._curItemActive()
  }
  //public methods

  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data._Style = this._style
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  _renderInnerHtml(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)

    const cacheKey = DATA_KEY + '_inner' + this._style
    let html = null

    if (this._style == 'style1') {
      html = template(cacheKey, INNER_TEM, data)
    } else if (this._style == 'style2') {
      html = template(cacheKey, INNER_TEM2, data)
    } else if (this._style == 'style3') {
      html = template(cacheKey, INNER_TEM3, data)
    }
    this._control.find(Selector.MENU_LIST).html(html)

    this._init()
    this._refresInnerHtml()
  }

  _addEventListeners() {
    this._control
      .find(Selector.MOBILE_MENU)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.showMobileMenu, this))

    this._control
      .find(Selector.DROPDOWN_ARROW)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.showSubMenu, this))
    this._control
      .find('.nav-list-more')
      .off(Event.MOUSEENTER)
      .on(Event.MOUSEENTER, $.proxy(this.hover_moreListItem, this))
    if (isDesign()) {
      this.stopPropagation()
    }
  }
  hover_moreListItem() {
    this._control.find('.nav-list-more .sub-list').css({
      left: this._control.find('.nav-list-more').width()
    })
  }
  stopPropagation() {
    this._control
      .find(Selector.NAV_ITEM)
      .find('a')
      .click(function (e) {
        e.preventDefault()
      })
    this._control.find(Selector.MOBILE_MENU).mouseover(function (e) {
      e.stopPropagation()
      e.preventDefault()
    })
    this._control.find(Selector.MOBILE_MENU).click(function (e) {
      e.stopPropagation()
      e.preventDefault()
    })
  }
  /**
   * 设置当前选中的导航
   */
  _curItemActive() {
    let pathname = window.location.pathname.split('/')
    let lastPathname = '/' + pathname[pathname.length - 1]
    let navItem = this._control.find(Selector.MENU_LIST).find(Selector.NAV_ITEM)
    if (runtimeMode === 'design') {
      $(navItem).eq(0).addClass(ClassName.ACTIVE)
    }
    for (let i = 0; i < navItem.length; i++) {
      let curItem = navItem[i]
      if (curItem.getAttribute('data-href') == lastPathname) {
        $(curItem)
          .addClass(ClassName.ACTIVE)
          .siblings()
          .removeClass(ClassName.ACTIVE)
      }
    }
  }

  /**
   * 请求导航数据
   * @param {*} callback
   */
  loadData(callback) {
    let queryUrl = ''
    switch (runtimeMode) {
      case 'design':
        queryUrl = getNavigationList
        break
      case 'preview':
        queryUrl = getSettedNavigationList
        break
      case 'publish':
        queryUrl = getPubNavigationList
        break
    }

    let queryData = this._query
    const _this = this
    HttpRequest.post(
      queryUrl,
      queryData,
      function (data) {
        let model = {}
        let jsonData = data.data
        model.listData = jsonData
        _this._renderInnerHtml(model)
        if (typeof callback === 'function') {
          callback(_this._id, data)
        }
      },
      function () {}
    )
  }
  resize() {
    clearTimeout(timer)
    let timer = setTimeout(() => {
      this.computedNavWidth()
      clearTimeout(timer)
    }, 200)
  }

  /**
   * 实时计算导航宽度 宽度不足 增加更多
   */
  computedNavWidth() {
    // 导航父容器的宽度  80px为更多的固定宽度
    let navContainerWidth = parseInt(this._control.width())

    let $moreNavList = this._control.find('.nav-list-more')
    // outCurIndex => 当一级导航的宽度大于 导航父容器的宽度 存储的index
    let outCurIndex = -1
    // 一级导航的元素
    let navItem = this._control
      .find(Selector.MENU_LIST)
      .children(Selector.NAV_ITEM)
      .filter(function () {
        return $(this).css('display') != 'none'
      })
    // 更多中显示的一级导航元素
    let moreNavItem = this._control
      .find('.nav-list-more')
      .children(Selector.NAV_ITEM)
    moreNavItem = Array.prototype.slice.call(moreNavItem).sort(function (a, b) {
      return (
        parseInt($(b).attr('data-displayOrder')) -
        parseInt($(a).attr('data-displayOrder'))
      )
    })
    let itemAllWidth = moreNavItem.length > 0 ? MORE_WIDTH : 0
    if ($(document.body).outerWidth(true) <= WIDTH) {
      this._control.find('.check-more').hide()

      if (moreNavItem.length <= 0) {
        return
      }
      for (let j = 0; j < moreNavItem.length; j++) {
        let curItem = moreNavItem[j]
        this._control.find(Selector.MENU_LIST).append(curItem)
      }
      return
    }

    for (let i = 0; i < navItem.length; i++) {
      let curItem = navItem[i]
      let curItemWidth = $(curItem).outerWidth()
      itemAllWidth += curItemWidth

      if (itemAllWidth > navContainerWidth) {
        if (outCurIndex < 0) {
          outCurIndex = i
          if (itemAllWidth - curItemWidth + MORE_WIDTH > navContainerWidth) {
            outCurIndex = outCurIndex - 1
            outCurIndex = outCurIndex < 0 ? 0 : outCurIndex
            if (i > 0) {
              moreNavItem.push(navItem[i - 1])
            }
          }
          moreNavItem.push(curItem)
          this._control.find('.check-more').show()
        } else {
          moreNavItem.push(curItem)
        }
      }
      if (i == navItem.length - 1) {
        this._control.find('.nav-list-more').empty()
        moreNavItem = moreNavItem.sort(function (a, b) {
          return (
            parseInt($(a).attr('data-displayOrder')) -
            parseInt($(b).attr('data-displayOrder'))
          )
        })
        moreNavItem.forEach(function (item) {
          $moreNavList.append(item)
        })
      }
    }

    if (itemAllWidth < navContainerWidth) {
      if (moreNavItem.length > 0) {
        for (let k = moreNavItem.length - 1; k >= 0; k--) {
          let curItem = moreNavItem[k]
          let dataWidth = $(curItem).outerWidth()
          let moreWidth = MORE_WIDTH
          if (k == 0) {
            moreWidth = 0
          }
          if (itemAllWidth + dataWidth + moreWidth < navContainerWidth) {
            itemAllWidth += parseInt(dataWidth)
            this._control.find(Selector.MENU_LIST).append(curItem)
            let navItem = this._control.find('.nav-list-more').children()
            if (navItem.length <= 0) {
              this._control.find('.check-more').hide()
              return
            }
          } else {
            break
          }
        }
      }
    }
  }
  /**
   * 移动端展示二级菜单
   * @param {*} e 事件源 event
   */
  showSubMenu(e) {
    e.stopPropagation()
    let $target = $(e.target)
    $target.toggleClass(ClassName.DROPDOWN_ARROW_OPEN)
    $target.parent().next().toggleClass(ClassName.SUB_MENU_HEIGHT)
    let $parentsLi = $target.parent().parent()
    $parentsLi
      .siblings('li')
      .find('.sub-menu')
      .removeClass(ClassName.SUB_MENU_HEIGHT)
    $parentsLi
      .siblings('li')
      .find(Selector.DROPDOWN_ARROW)
      .removeClass(ClassName.DROPDOWN_ARROW_OPEN)
    return false
  }

  /**
   * 显示移动端菜单 (设计端右侧面板 需要控制移动端的时候显示隐藏菜单)
   * @param {String} val  val 是显示showor隐藏hide
   */
  showMobileMenu(val) {
    // window.event.stopPropagation();
    let navcontainer = this._control.parent().parent()
    let area3 = navcontainer.children('div:last-child')
    let dataTitle = area3.attr('data-title')
    let navcontainerBgColor = navcontainer.css('backgroundColor')
    let $iconfont = this._control.find(Selector.MOBILE_MENU).find('.iconfont')

    if (val.isShow == 'show' || val.isShow == 'hide') {
      if (val.isShow == 'show') {
        this._control.find('.container').addClass('active')
        this._control.find(Selector.MOBILE_MENU).addClass('active')
        this._control.find('.header-mask').addClass('active')
        if ($iconfont.hasClass('iconguanbi')) {
          $iconfont
            .removeClass('iconguanbi')
            .addClass('iconicon-dash-Navigationmore')
        } else {
          $iconfont
            .removeClass('iconicon-dash-Navigationmore')
            .addClass('iconguanbi')
        }
      } else {
        this._control.find('.container').removeClass('active')
        this._control.find(Selector.MOBILE_MENU).removeClass('active')
        this._control.find('.header-mask').removeClass('active')
        if ($iconfont.hasClass('iconguanbi')) {
          $iconfont
            .addClass('iconguanbi')
            .removeClass('iconicon-dash-Navigationmore')
        } else {
          $iconfont
            .addClass('iconicon-dash-Navigationmore')
            .removeClass('iconguanbi')
        }
      }
    } else {
      this._control.find('.container').toggleClass('active')
      this._control.find(Selector.MOBILE_MENU).toggleClass('active')
      this._control.find('.header-mask').toggleClass('active')
      if (dataTitle == 'area3') {
        $(area3).toggleClass('navcontainer-area--show')
      }
      if ($iconfont.hasClass('iconguanbi')) {
        $('body').css('overflow', 'visible')
        $iconfont
          .removeClass('iconguanbi')
          .addClass('iconicon-dash-Navigationmore')
        if ($('.container').hasClass('moble--mask')) {
          this._control.find('.container').removeClass('moble--mask')
        }
        if (window.parent.smSite) {
          window.parent.smSite.showClickSelectArea()
        }
      } else {
        $('body').css('overflow', 'hidden')
        $iconfont
          .removeClass('iconicon-dash-Navigationmore')
          .addClass('iconguanbi')
        if (navcontainerBgColor == 'rgba(0, 0, 0, 0)') {
          this._control.find('.container').addClass('moble--mask')
        }
        if (window.parent.smSite) {
          setTimeout(function () {
            window.parent.smSite.hideClickSelectArea()
          }, 300)
        }
      }
    }
    return false
  }

  /**
   * 右侧面板 显示隐藏的导航
   * @param {String} val
   */
  changeItemShow(val) {
    this.changeNavItemShowOrHide(val, 'block')
  }
  /**
   * 右侧面板 隐藏导航
   * @param {Number} val  当前导航路由的 ID
   */
  changeItemHide(val) {
    this.changeNavItemShowOrHide(val, 'none')
  }

  changeNavItemShowOrHide(val, flag) {
    let navItem = this._control.find(Selector.NAV_ITEM)
    for (let i = 0; i < navItem.length; i++) {
      let curItem = navItem[i]
      if (curItem.getAttribute('data-id') == val.current) {
        curItem.style.display = flag
      }
    }
  }

  /** 修改controlData 的query
   * @method changeValueId
   * @param {object} val
   * @param {function} callback
   */
  changeValueId(val, callback) {
    this._control.attr('data-query', JSON.stringify(val))
    if (typeof callback == 'function') {
      callback(val)
    }
  }

  /**刷新浏览器后 根据右侧面板设置的隐藏Id, 隐藏对应的菜单
   * @method _refresInnerHtml
   */
  _refresInnerHtml() {
    let navItem = this._control.find(Selector.NAV_LIST).find(Selector.NAV_ITEM)
    let queryId = ''
    if (this._query.filters) {
      queryId = this._query.filters[0].value.split(',')
    }
    for (let i = 0; i < navItem.length; i++) {
      let curItem = navItem[i]
      // $(curItem).attr('data-displayOrder', Math.ceil($(curItem).outerWidth()))
      let dataId = curItem.getAttribute('data-id')
      if (queryId.indexOf(dataId) > -1) {
        curItem.style.display = 'none'
      }
    }
    this.computedNavWidth()

    $(window)
      .off(Event.RESIZE + this._id)
      .on(Event.RESIZE + this._id, $.proxy(this.resize, this))
  }

  // Static

  static navigationInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Navigation($this.attr('id'), $this.attr('data-c-style'))
      data.loadData(null)
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
      Navigation.navigationInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Navigation.jQueryInterface
$.fn[NAME].Constructor = Navigation
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Navigation.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})
export default Navigation
