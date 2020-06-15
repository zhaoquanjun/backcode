/**
 * ----------------------------------------
 * SmartUi(v0.1):login.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import HttpRequest from '../util/httpRequest'
import {
  loginApiUrl,
  getWeChatLoginParams,
  getAlipayLoginParams
} from '../env/index'
import { getSysClass, getjQuery } from '../util'

const DATA_KEY = 'st.login'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'login'
const TO_LOGIN_KEYCODE = 13
const INNER_TEM = ` 
<div class="login-way">
    <div class="wechat_login" id="wechat_login" data-type="wechat"></div>
                  <div class="sign-wrap" data-type="password">
                            <div class="form-row row-select">
                                <span class="dropdown-select"><i class="iconfont iconicon-des-Arrow"></i><em
                                        class="text-select">+86</em><input type="hidden" name="regionCode" value="+86"></span>
                                <span class="ipt-wrap"><input type="tel" autocomplete="off" class="ipt ipt-phone signin-mobile" placeholder="{{ AccountText }}" name="account"></span>
                                <div class="dropdown-menu">
                                    <ul>
                                        {{each countryCode item i}} 
                                        <li data-val="{{item.label}}"><span class="num">{{item.label}}}</span>{{item.value}}</li>
                                        {{/each}}
                                    </ul>
                                </div>
                                <div class="tip-error tip-phone"></div>
                            </div>
                            <div class="form-row">
                                <span class="ipt-wrap"><i class="icon-sign-pwd"></i><input type="password" class="ipt ipt-pwd signin-password"  placeholder="{{ PwdText }}" name="password"></span>
                                <div class="tip-error tip-pwd"></div>
                            </div>
                            <div class="form-btn">
                                <button type="button" class="signin-btn">{{ SigninText }}</button>
                            </div>
                            <div class="text-tip">
                                <a href="/registe" class="left-tip link-register">{{ RegisterText }}</a>
                                <a href="/findpassword" class="right-tip  forgetpwd">{{ ForgetPwdText }}</a>
                            </div>
                        </div>
                        <div class="divider divider--horizontal">
                            <div class="divider__text">其他登录方式</div>
                        </div>
                        <div class="third-party">
                          <span class="wechat-login"></span>
                         <span class="alipay-login"></span>
                        </div>
                        <div class="layer-tip"></div>
                    `

const templates = {}
templates[
  'style1'
] = `<div class=" {{_SysClass}}" id="{{_Id}}" data-c-type="login">
        <div class="sign-tab from-row">
          <span class="link-wechat active" data-type="wechat">微信登录</span>
          <span class="link-signin" data-type="password">密码登录</span>
        </div>
  ${INNER_TEM}
  </div>`

const $ = getjQuery()

const Default = {
  keyboard: true
}
const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`,
  KEYDOWN: `keydown${EVENT_KEY}`,
  ONINPUT: `input propertychange${EVENT_KEY}`
}
const ClassName = {
  DROPDOWN_MENU_OPEN: 'dropdown-menu-open',
  DROPDOWN_ARROW_OPEN: 'dropdown-arrow-open'
}
const Selector = {
  TIP_MOBILEL: '.tip-phone',
  TIP_PWD: '.tip-pwd',

  DROPDOWN_SELECT: '.dropdown-select',
  DROPDOWN_MENU: '.dropdown-menu',
  DROPDOWN_ARROW: '.dropdown-arrow',
  SIGNIN_BNT: '.signin-btn',

  IPT_PHONE: '.ipt-phone',
  IPT_PWD: '.ipt-pwd',
  LAYER_TIP: '.layer-tip',
  SIGIN_TAB: '.sign-tab',
  WECHAT_SIGIN: '.wechat-login'
}

class Login {
  constructor(id, style, options) {
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, Default, options)
    this.state = {
      browser: this.isWeiXin()
    }
  }
  _init() {
    this._tipMoblie = this._control.find(Selector.TIP_MOBILEL)
    this._tipPwd = this._control.find(Selector.TIP_PWD)

    this._dropdownSelect = this._control.find(Selector.DROPDOWN_SELECT)
    this._dropdownMenu = this._control.find(Selector.DROPDOWN_MENU)
    this._dropdownArrow = this._control.find(Selector.DROPDOWN_ARROW)

    this._siginBtn = this._control.find(Selector.SIGNIN_BNT)
    this._iptPhone = this._control.find(Selector.IPT_PHONE)
    this._iptPwd = this._control.find(Selector.IPT_PWD)
    this._selectedCode = this._dropdownMenu.find('ul li')
    this._addEventListeners()
    this.state.browser == 2 && this.getBrowser()
    this._control.data(DATA_KEY, this)
    if (this.isWeiXin() === 0) {
      this._control.find('.alipay-login').css('display', 'none')
    }
  }
  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data._Style = this._style
    data._Query = JSON.stringify(data.query)
    const cacheKey = DATA_KEY + '_' + this._style

    return template(cacheKey, templates[this._style], data)
  }

  _addEventListeners() {
    if (this._config.keyboard) {
      this._control
        .off(Event.KEYDOWN)
        .on(Event.KEYDOWN, $.proxy(this._keydown, this))
    }
    this._siginBtn
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.toLogin, this))
    this._dropdownSelect
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.dropdownMenu, this))
    this._iptPhone
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._iptPwd
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._selectedCode
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.getCountryCode, this))

    this._control
      .find(Selector.WECHAT_SIGIN)
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.getBrowser, this))

    this._control
      .find('.alipay-login')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._getAlipayLoginParams, this))
    this._control
      .find(Selector.SIGIN_TAB)
      .find('span')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.handlerLoginWay, this))
  }

  /**
   * 点击登录
   */
  toLogin() {
    let mobile = this._iptPhone.val()
    let pwd = this._iptPwd.val()
    let isPhoneNumber = this.checkphone(mobile)
    if (!isPhoneNumber) return false
    if (!this.checkPwd(pwd)) return false
    let queryData = {
      Mobile: mobile,
      UPwd: pwd
    }
    let _this = this
    // 去调用接口
    HttpRequest.post(
      loginApiUrl,
      queryData,
      function (data) {
        if (data.isSuccess) {
          let returnUrl = _this.getUrlParams('returnUrl')

          if (returnUrl) {
            window.location.href = returnUrl
          } else {
            window.location.href = '/PersonalCenter/Index'
          }
        } else {
          _this._control
            .find(Selector.LAYER_TIP)
            .show()
            .html(data.message)
            .delay(2000)
            .fadeOut()
        }
      },
      function (error) {
        let data = error.responseJSON
        _this._control
          .find(Selector.LAYER_TIP)
          .show()
          .html(data.message)
          .delay(2000)
          .fadeOut()
      }
    )
  }
  /**
   * 获取url 参数
   * @param {String} name  returnUrl 的地址
   */

  getUrlParams(name) {
    // 不传name返回所有值，否则返回对应值
    let url = window.location.search
    if (url.indexOf('?') == 1) {
      return false
    }
    url = url.substr(1)
    url = url.split('&')
    let newname = name || ''
    let nameres
    // 获取全部参数及其值
    for (let i = 0; i < url.length; i++) {
      var info = url[i].split('=')
      var obj = {}
      obj[info[0]] = decodeURI(info[1])
      url[i] = obj
    }
    // 如果传入一个参数名称，就匹配其值
    if (newname) {
      for (let k = 0; k < url.length; k++) {
        for (const key in url[k]) {
          if (key == newname) {
            nameres = url[k][key]
          }
        }
      }
    } else {
      nameres = url
    }
    // 返回结果
    return nameres
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return
    }
    switch (event.which) {
      case TO_LOGIN_KEYCODE:
        event.preventDefault()
        this.toLogin()
        break

      default:
    }
  }

  /**
   * 获取国际代码 code
   */
  getCountryCode() {
    this.dropdownMenu()
  }
  dropdownMenu() {
    this._dropdownMenu.toggleClass(ClassName.DROPDOWN_MENU_OPEN)
    this._dropdownArrow.toggleClass(ClassName.DROPDOWN_ARROW_OPEN)
  }
  /**
   * 校验手机号
   * @param {Number} mobile 手机号
   */
  checkphone(mobile) {
    let isPhoneNumber = this.validateTel(mobile)
    if ($.trim(mobile) === '' && !isPhoneNumber) {
      this._tipMoblie.show().html('请输入手机号')
      return false
    } else if (!isPhoneNumber) {
      this._tipMoblie.show().html('手机号格式不正确')
      return false
    } else {
      return true
    }
  }
  /**
   * 校验密码
   * @param {*} pwd
   */
  checkPwd(pwd) {
    if ($.trim(pwd) === '') {
      this._tipPwd.show().html('请输入密码')
      return false
    }
    return true
  }
  /**
   * 校验手机号正则
   * @param {Number} tel  手机号
   */
  validateTel(tel) {
    var TEL_REGEXP = /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/
    if (TEL_REGEXP.test(tel)) {
      return true
    }
    return false
  }
  /**
   * 清除页面校验的错误信息
   */
  onInput() {
    this._control.find('.tip-error').hide()
  }
  getBrowser() {
    if (this.state.browser === 1) {
      window.location.href = '/PersonalCenter/UnWechatBrowser'
      return
    }
    this._getWeChatLoginParams(this.state.browser)
  }
  _getWeChatLoginParams(browser) {
    let _this = this
    const queryData = {
      browser: browser
    }
    HttpRequest.get(getWeChatLoginParams, queryData, function (data) {
      if (browser == 2) {
        _this.WeChatPCLogin(data)
      } else if (browser == 0) {
        _this.WeChatMobileLogin(data)
      }
    })
  }
  _getAlipayLoginParams() {
    const queryData = {
      browser: this.state.browser
    }
    var adPopup = window.open(
      'about:self',
      '_self',
      'width=' +
        window.screen.width +
        ',height=' +
        window.screen.height +
        ', ...'
    )
    HttpRequest.get(getAlipayLoginParams, queryData, (data) => {
      adPopup.blur()
      adPopup.opener.focus()
      adPopup.location = data.authorizationUrl
    })
  }
  WeChatMobileLogin(weChatParams) {
    var adPopup = window.open(
      'about:self',
      '_self',
      'width=' +
        window.screen.width +
        ',height=' +
        window.screen.height +
        ', ...'
    )
    adPopup.blur()
    adPopup.opener.focus()
    adPopup.location = weChatParams.mobileAuthorizationUrl
  }
  WeChatPCLogin(weChatParams) {
    $('#wechat_login').show()
    new window.WxLogin({
      self_redirect: false,
      id: 'wechat_login',
      appid: weChatParams.appId,
      scope: weChatParams.scope,
      redirect_uri: weChatParams.redirectUri,
      state: weChatParams.state, //"fcf7cc808c58eb3e8cd003e77817e1bc"
      style: '',
      href:
        'data:text/css;base64,LyogQGNoYXJzZXQgIlVURi04IjsKLmltcG93ZXJCb3ggewogIGJhY2tncm91bmQ6ICNmZmY7Cn0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgd2lkdGg6IDIwMHB4Owp9Ci5pbXBvd2VyQm94IC50aXRsZSB7CiAgdGV4dC1hbGlnbjogbGVmdDsKICBmb250LXNpemU6IDE2cHg7Cn0KLmltcG93ZXJCb3ggLmluZm8gewogIHdpZHRoOiAyMDBweDsKICBjb2xvcjogcmdiYSgxNTksIDE1OSwgMTU5LCAxKTsKfQouc3RhdHVzX2ljb24gewogIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnN0YXR1cyB7CiAgdGV4dC1hbGlnbjogY2VudGVyOwp9ICovCgovKiBsb2dpbiAqLwpAY2hhcnNldCAiVVRGLTgiOwouaW1wb3dlckJveCB7CiAgYmFja2dyb3VuZDogI2ZmZjsKfQouaW1wb3dlckJveCAucXJjb2RlIHsKICB3aWR0aDogMTUwcHg7Cn0KLmltcG93ZXJCb3ggLnRpdGxlIHsKICBkaXNwbGF5OiBub25lOwp9Ci5pbXBvd2VyQm94IC5pbmZvIHsKICB3aWR0aDogMjQwcHg7Cn0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgbWFyZ2luLXRvcDogMDsKfQouc3RhdHVzX2ljb24gewogIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnN0YXR1cyB7CiAgdGV4dC1hbGlnbjogY2VudGVyOwp9Cg=='
    })
  }
  //判断是否是微信浏览器的函数
  isWeiXin() {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent
        return {
          //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        }
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    if (browser.versions.mobile) {
      //判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase() //获取判断用的对象
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return 0
      } else {
        return 1
      }
    } else {
      //否则就是PC浏览器打开
      return 2
    }
  }
  handlerLoginWay(e) {
    let mode = $(e.target).attr('data-type')
    $(e.target).addClass('active').siblings().removeClass('active')
    if (mode === 'wechat') {
      this._control.find('.wechat_login').show()
      this._control.find('.sign-wrap').hide()
    } else if (mode === 'password') {
      this._control.find('.wechat_login').hide()
      this._control.find('.sign-wrap').show()
    }
  }
  // Static

  static loginInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Login($this.attr('id'), $this.attr('data-c-style'))
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
      Login.loginInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Login.jQueryInterface
$.fn[NAME].Constructor = Login
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Login.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default Login
