/**
 * ----------------------------------------
 * SmartUi(v0.1):loginstatus.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
// import { getLocal } from "../util/local.js"
import HttpRequest from '../util/httpRequest'
import { loginInfoUrl } from '../env/index'
const DATA_KEY = 'st.loginstatus'
// const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'loginstatus'
const INNER_TEM = `
                    <div class="site-nav-sign">
                        <a href="/registe"><button class="btn register-btn">{{ Model.RegisterBtnText }}</button></a>
                        <a href="/login"><button class="btn login-btn">{{ Model.LoginBtnText }}</button></a>
                    </div>
                    <div class="site-nav-use">
                        <div class="login-info">
                            <a  class="user-wrap" href="/personalcenter/index">
                                <span class="iconfont iconicon-dengluzhuangtai"></span>
                                <span class="mobile">1300000000</span>
                                <span class="iconfont iconicon-des-Arrow dropdown-arrow"></span>
                            </a>
                        </div>
                        <div class="dropdown-menu">
                            <a href="/personalcenter/index"><span>账号信息</span></a>
                            <a class="logout" href="/personalcenter/logout"><span>退出登录</span></a>
                        </div>
                    </div>`
const templates = {}
templates[
  'style1'
] = `<div class="login-status {{_SysClass}}" id="{{_Id}}" data-c-type="loginstatus">${INNER_TEM}</div>`

const $ = getjQuery()

const Selector = {
  USER_MOBILE: '.mobile',
  SITE_NAV_SIGN: '.site-nav-sign',
  SITE_NAV_USER: '.site-nav-use'
}

class LoginStatus {
  constructor(id, style, options) {
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, options)
  }
  _init() {
    this._siteNavSign = this._control.find(Selector.SITE_NAV_SIGN)
    this._siteNavUser = this._control.find(Selector.SITE_NAV_USER)
    this._control.data(DATA_KEY, this)

    // this.getLoginStatus()
    this.getUserInfo()
    this._addEventListeners()
  }
  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data._Style = this._style
    const cacheKey = DATA_KEY + '_' + this._style
    return template(cacheKey, templates[this._style], data)
  }
  _addEventListeners() {
    // this._siginBtn.off(Event.CLICK_DATA_API).on(Event.CLICK_DATA_API, $.proxy(this.getLoginStatus,this));
  }

  /**
   * 获取当前用户是否登录
   */
  getUserInfo() {
    let _this = this
    HttpRequest.get(
      loginInfoUrl,
      null,
      function(data) {
        if (!data) {
          _this._siteNavSign.css({
            display: 'inline-block'
          })
          _this._siteNavUser.css({
            display: 'none'
          })
        } else {
          _this._siteNavSign.css({
            display: 'none'
          })
          _this._siteNavUser.css({
            display: 'inline-block'
          })
          _this._control
            .find(Selector.USER_MOBILE)
            .html(
              data.mobile.substring(0, 3) +
                '****' +
                data.mobile.substring(8, 11)
            )
        }
      },
      function(error) {
        console.log(error)
      }
    )
  }

  // getLoginStatus(){
  //     let data = getLocal("userInfo");
  //     let isLogin = data.isSuccess;
  //     if(!isLogin){
  //         this._siteNavSign.css({"display":"inline-block"});
  //         this._siteNavUser.css({"display":"none"});
  //     }else{
  //         this._siteNavSign.css({"display":"none"});
  //         this._siteNavUser.css({"display":"inline-block"})
  //     }
  // }

  // Static

  static loginStatusInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new LoginStatus($this.attr('id'), $this.attr('data-c-style'))
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
      LoginStatus.loginStatusInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = LoginStatus.jQueryInterface
$.fn[NAME].Constructor = LoginStatus
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return LoginStatus.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default LoginStatus
