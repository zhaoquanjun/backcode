/**
 * ----------------------------------------
 * SmartUi(v0.1):atlas.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'

import HttpRequest from '../util/httpRequest'
import { registerApiUrl, smsApiUrl } from '../env/index'
const DATA_KEY = 'st.register'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'register'
const TO_LOGIN_KEYCODE = 13
var TIME_COUNT = 60 //倒计时时间
const INNER_TEM = ` <div class="sign-wrap">
                            <div class="form-row row-select">
                                <span class="dropdown-select">
                                    <i class="iconfont iconicon-des-Arrow dropdown-arrow"></i>
                                    <em class="text-select">+86</em>
                                    <input type="hidden" name="regionCode" value="+86">
                                </span>
                                <span class="ipt-wrap"><input type="tel" autocomplete="off" class="ipt ipt-phone " placeholder="{{ AccountText }}"
                                        name="account"></span>
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
                                <span class="ipt-wrap">
                                    <input type="text" autocomplete="off" class="ipt ipt-sms"  placeholder="{{ SmsCodeText }}" name="phoneCode" >
                                    <button type="button" class="btn btn-sms">{{ SendSmsText }}</button>
                                </span>
                                <div class="tip-error tip-sms"></div>
                            </div>
                            <div class="form-row">
                                <span class="ipt-wrap">
                                    <input type="password" class="ipt ipt-pwd" placeholder="{{ PwdText }}" name="password">
                                 </span>
                                <div class="tip-error tip-pwd"></div>
                            </div>
                            <div class="form-row">
                                <span class="ipt-wrap"><input type="password" class="ipt ipt-confirm-pwd"
                                        placeholder="{{ ConfirmPwdText }}" name="password"></span>
                                <div class="tip-error tip-confirm-pwd"></div>
                            </div>
                            <div class="form-btn">
                                <button type="submit" class="signin-btn register">{{ RegisterText }}</button>
                            </div>
                            <div class="form-btn">
                            <button type="submit" class="signin-btn login"><a style="display: block;" href="/login"> {{ SigninText }}</a></button>
                            </div>

                            </div>

                            <div class="layer-tip"></div>`

const templates = {}
templates[
  'style1'
] = `<div class=" {{_SysClass}}" id="{{_Id}}" data-c-type="register">${INNER_TEM}</div>`

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
  TIP_PHONE: '.tip-phone',
  TIP_SMS: '.tip-sms',
  TIP_PWD: '.tip-pwd',
  TIP_CONFIRM_PWD: '.tip-confirm-pwd',

  DROPDOWN_SELECT: '.dropdown-select',
  DROPDOWN_MENU: '.dropdown-menu',
  DROPDOWN_ARROW: '.dropdown-arrow',
  REGISTER: '.register',
  LOGIN: '.login',

  IPT_PHONE: '.ipt-phone',
  IPT_SMS: '.ipt-sms',
  IPT_PWD: '.ipt-pwd',
  IPT_CONFIRM_PWD: '.ipt-confirm-pwd',

  SMS_BTN: '.btn-sms',
  LAYER_TIP: '.layer-tip'
}

class Register {
  constructor(id, style, options) {
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, Default, options)

    this.timer = null
  }
  _init() {
    this._tipPhone = this._control.find(Selector.TIP_PHONE)
    this._tipSms = this._control.find(Selector.TIP_SMS)
    this._tipPwd = this._control.find(Selector.TIP_PWD)
    this._tipConfirmPwd = this._control.find(Selector.TIP_CONFIRM_PWD)

    this._dropdownSelect = this._control.find(Selector.DROPDOWN_SELECT)
    this._dropdownMenu = this._control.find(Selector.DROPDOWN_MENU)
    this._dropdownArrow = this._control.find(Selector.DROPDOWN_ARROW)

    this._toRegister = this._control.find(Selector.REGISTER)

    this._iptPhone = this._control.find(Selector.IPT_PHONE)
    this._iptSms = this._control.find(Selector.IPT_SMS)
    this._iptPwd = this._control.find(Selector.IPT_PWD)
    this._iptConfirmPwd = this._control.find(Selector.IPT_CONFIRM_PWD)

    this._smsBtn = this._control.find(Selector.SMS_BTN)
    this._selectedCode = this._dropdownMenu.find('ul li')
    this._addEventListeners()
    // $.data(this._control, DATA_KEY, this);
    this._control.data(DATA_KEY, this)
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
    this._toRegister
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.toRegister, this))
    this._dropdownSelect
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.dropdownMenu, this))

    this._iptPhone
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._iptSms
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._iptPwd
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._iptConfirmPwd
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))

    this._smsBtn
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.getSmsCode, this))

    this._selectedCode
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.getCountryCode, this))
  }
  onInput() {
    this._control.find('.tip-error').hide()
  }
  /**
   * 注册接口
   */
  toRegister() {
    let phone = this._iptPhone.val()
    let smsCode = this._iptSms.val()
    let pwd = this._iptPwd.val()
    let comfirmPwd = this._iptConfirmPwd.val()

    if (!this.checkphone(phone)) return false
    if (!this.checkSms(smsCode)) return false
    if (!this.checkPwd(pwd)) return false
    if (!this.checkConfrimPwd(pwd, comfirmPwd)) return false

    let queryData = {
      Mobile: phone,
      VerificationCode: smsCode,
      Password: comfirmPwd
    }
    let _this = this
    // 手机号 验证码正确 去调用接口

    HttpRequest.post(
      registerApiUrl,
      queryData,
      function(data) {
        if (data.isSuccess) {
          window.location.href = '/login'
        } else {
          _this._control
            .find(Selector.LAYER_TIP)
            .show()
            .html(data.message)
            .delay(2000)
            .fadeOut()
        }
      },
      function(error) {
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
   * 获取验证码
   */
  getSmsCode() {
    let phone = this._iptPhone.val()
    if (!this.checkphone(phone)) return false
    let queryData = {
      mobile: phone,
      Type: 'Register'
    }
    let _this = this
    HttpRequest.post(
      smsApiUrl,
      queryData,
      function(data) {
        if (data.isSuccess) {
          _this.countdown()
        } else {
          _this._control
            .find(Selector.LAYER_TIP)
            .show()
            .html(data.message)
            .delay(2000)
            .fadeOut()
        }
      },
      function(error) {
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
   * 验证码倒计时
   */
  countdown() {
    let smsBtn = this._control.find(Selector.SMS_BTN)
    smsBtn.text('正在发送')
    if (!this.timer) {
      let count = TIME_COUNT
      this.timer = setInterval(() => {
        if (count > 0 && count <= TIME_COUNT) {
          count--
          smsBtn.attr('disabled', true)
          smsBtn.text(count + 's')
          if (count <= 0) {
            clearInterval(this.timer) // 清除定时器
            this.timer = null
            smsBtn.attr('disabled', false)
            smsBtn.text('发送验证码')
          }
        }
      }, 1000)
    }
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
   *获取国际代码code
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
   * @param {Number} phoneNum
   * @return {Boolean} true 为Ok
   */
  checkphone(phoneNum) {
    let isPhoneNumber = this.validateTel(phoneNum)
    if ($.trim(phoneNum) === '' && !isPhoneNumber) {
      this._tipPhone.show().html('请输入手机号')
      return false
    } else if (!isPhoneNumber) {
      this._tipPhone.show().html('手机号格式不正确')
      return false
    }
    return true
  }
  /**
   *  校验验证码
   * @param {*} sms
   */
  checkSms(sms) {
    if ($.trim(sms) === '') {
      this._tipSms.show().html('请输入验证码')
      return false
    }
    return true
  }

  /**
   * 校验密码是否符合规则
   * @param {*} pwd
   */
  checkPwd(pwd) {
    let pwdReg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
    if (pwd === '') {
      this._tipPwd.show().html('请输入密码')
      return false
    }
    if (pwd.length < 6 || pwd.length > 16) {
      this._tipPwd.show().html('密码长度必须为6-16位')
      return false
    }
    if (!pwdReg.test(pwd)) {
      this._tipPwd.show().html('必须包含数字、字母、标点符号的其中两项')
      return false
    }
    return true
  }
  /**
   * 校验确认密码
   * @param {*} pwd  新密码
   * @param {*} confirmPwd 确认密码
   */
  checkConfrimPwd(pwd, confirmPwd) {
    if ($.trim(confirmPwd) === '') {
      this._tipConfirmPwd.show().html('请输入确认密码')
      return false
    }
    if (pwd !== confirmPwd) {
      this._tipConfirmPwd.show().html('两次输入密码不一致,请重新输入')
      return false
    }
    return true
  }
  /**
   * 手机号正则
   * @param {Number} tel
   */
  validateTel(tel) {
    var TEL_REGEXP = /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/
    if (TEL_REGEXP.test(tel)) {
      return true
    }
    return false
  }
  // Static

  static registerInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new Register($this.attr('id'), $this.attr('data-c-style'))
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
      Register.registerInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Register.jQueryInterface
$.fn[NAME].Constructor = Register
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Register.jQueryInterface
}
$(window).on('load', function() {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default Register
