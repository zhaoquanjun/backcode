/**
 * ----------------------------------------
 * SmartUi(v0.1):msgboard.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import HttpRequest from '../util/httpRequest'
import { leavewordUrl } from '../env/index'
import { getSysClass, getjQuery } from '../util'
import { isDesign } from '../env/index'
const DATA_KEY = 'st.msgboard'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'msgboard'
const TO_LOGIN_KEYCODE = 13
const INNER_TEM = ` 
                    <div class="sign-wrap">
                      <div class="form-row form-title">
                      <div class="ipt-wrap">
                        <input type="text"  class="ipt user-title" placeholder="{{Title}}" maxlength="50">
                      </div>
                      <div class="tip-error tip-title"></div>
                      </div>
                  <div class="form-row form-phone">
                    <div class="ipt-wrap">
                      <input type="text" class="ipt user-phone" placeholder="{{Phone}}">
                    </div>
                    <div class="tip-error tip-phone"></div>
                  </div>
                  <div class="form-row form-email">
                    <div class="ipt-wrap">
                      <input type="email" class="ipt user-email" placeholder="{{Email}}">
                    </div>
                    <div class="tip-error tip-email"></div>
                  </div>
                  <div class="form-row form-content">
                  <div class="ipt-wrap">
                    <textarea type="text" class="ipt ipt-textarea leave-content" placeholder="{{Content}}" maxlength="200"></textarea>
                  </div>
                  <div class="tip-error tip-content"></div>
                </div>
                  <div class="form-row" id="box" onselectstart="return false;">
                  <div value="default" class="verify-item verify-default handler-verification">
                    <div>
                      <i></i>
                      <p>点此进行验证</p>
                    </div>
                  </div>
                  <div class="verify-item verify-refresh">
                    <div>点击旋转图块复原图片</div>
                  </div>
                  <div class="verify-item verify-failed">
                    <div>
                      <i></i>
                      <p>验证失败，请重试</p>
                    </div>
                  </div>
                  <div class="verify-item verify-success">
                    <div>
                      <i></i>
                      <p>验证成功</p>
                    </div>
                  </div>
                  <div class="captcha-content">
                    <div class="captcha-top">
                      <span class="title">请完成验证</span>
                      <span class="close" value="close"></span>
                      <span class="refresh" value="refresh"></span>
                    </div>
                    <div id="captchaBox">
            
                    </div>
                  </div>
                  <div class="tip-error tip-code"></div>
                </div>
                      <div class="form-btn">
                        <button type="button" class="submit-btn ellipsis">{{SubmitBtn}}</button>
                      </div>
                    </div>
                    <div class="layer-tip"></div>`

const templates = {}
templates[
  'style1'
] = `<div class="c-msgboard  {{_ThemeClasses[0]}} {{_SysClass}}" id="{{_Id}}" data-c-type="msgboard"  data-pageTitle="{{Title}}">${INNER_TEM}</div>`

const $ = getjQuery()

const Default = {
  keyboard: true
}
const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`,
  KEYDOWN: `keydown${EVENT_KEY}`,
  ONINPUT: `input propertychange${EVENT_KEY}`
}

const Selector = {
  TIP_CODE: '.tip-code',
  TIP_EMAIL: '.tip-email',
  TIP_MOBILE: '.tip-phone',
  TIP_TITLE: '.tip-title',
  TIP_CONTENT: '.tip-content',
  SUBMIT_BNT: '.submit-btn',
  USER_CODE: '.user-code',
  USER_PHONE: '.user-phone',
  USER_EMAIL: '.user-email',
  USER_TITLE: '.user-title',
  LEADVE_CONTENT: '.leave-content',
  LAYER_TIP: '.layer-tip',
  CODE: '.code'
}

class MsgBoard {
  constructor(id, style, options) {
    this._id = id
    this._style = style
    this._control = $('#' + id)
    this._config = $.extend({}, Default, options)

    this.isSuccess = false
  }
  _init() {
    this._tipCode = this._control.find(Selector.TIP_CODE)
    this._tipEmail = this._control.find(Selector.TIP_EMAIL)
    this._tipMoblie = this._control.find(Selector.TIP_MOBILE)
    this._tipTitle = this._control.find(Selector.TIP_TITLE)
    this._tipContent = this._control.find(Selector.TIP_CONTENT)

    this._userPhone = this._control.find(Selector.USER_PHONE)
    this._userEmail = this._control.find(Selector.USER_EMAIL)
    this._userTitle = this._control.find(Selector.USER_TITLE)
    this._leadveContent = this._control.find(Selector.LEADVE_CONTENT)
    this._submitBtn = this._control.find(Selector.SUBMIT_BNT)
    this._addEventListeners()
    if (isDesign) {
      if (
        window.smDesigner &&
        typeof window.smDesigner.getControlDataById === 'function'
      ) {
        let controlData = window.smDesigner.getControlDataById(this._id)
        controlData.dataModel['PageTitle'] = sessionStorage.getItem('title')
        this._control.attr('data-pagetitle', sessionStorage.getItem('title'))
      }
    }

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
    this._control
      .find('.handler-verification,.close,.refresh')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this.verifyTips, this))
    let submit = this.debounce(this.toSubmit, 2000, true)
    this._submitBtn
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(submit, this))

    this._userTitle
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))

    this._userEmail
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._userPhone
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
    this._leadveContent
      .off(Event.ONINPUT)
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
  }
  throttle() {
    var lastTime = 0
    let wait = 1000
    let that = this
    return function () {
      var nowTime = new Date().getTime()

      if (nowTime - lastTime > wait) {
        that.toSubmit.apply(this, arguments)
        lastTime = nowTime
      }
    }
  }
  /**
   * 点击提交留言
   */
  toSubmit() {
    let title = this._userTitle.val()
    let content = this._leadveContent.val()
    let phone = this._userPhone.val()
    let email = this._userEmail.val()
    // let code = this._code.val()
    let emailLabel = this._userEmail.parents('.form-row').css('display')
    let phoneLabel = this._userPhone.parents('.form-row').css('display')

    if ($.trim(title) === '') {
      this._tipTitle.show().html('请输入留言标题')
      return
    }

    if (phoneLabel === 'block') {
      this._userEmail.val('')
      let isPhoneNumber = this.checkphone(phone)

      if (!isPhoneNumber) return false
    }
    if (emailLabel === 'block') {
      this._userPhone.val('')
      let isEmail = this.checkEmail(email)
      if (!isEmail) return false
    }
    if ($.trim(content) === '') {
      this._tipContent.show().html('请输入留言内容')
      return
    }
    if (this.isSuccess === false) {
      this._tipCode.show().html('请先完成验证')
      return false
    }
    let queryData = {
      LeavewordTitle: title,
      PageTitle: this._control.attr('data-pageTitle'),
      ContactNumber: phone,
      ContactEmail: email,
      LeavewordContent: content
    }
    let _this = this
    // 去调用接口
    this._submitBtn.attr('disabled')
    HttpRequest.post(
      leavewordUrl,
      queryData,
      function (data) {
        if (data) {
          _this._control
            .find(Selector.LAYER_TIP)
            .show()
            .html('留言成功')
            .delay(2000)
            .fadeOut()
          _this._userTitle.val('')
          _this._leadveContent.val('')
          _this._userPhone.val('')
          _this._userEmail.val('')
          _this.verifyTips('close')
          _this.isSuccess = false
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
        _this._submitBtn.removeAttr('disabled')
      }
    )
  }
  /*
    debounce 函数防抖
  */
  debounce(func, wait, immediate) {
    let result = null,
      timeout = null
    return function (...args) {
      let context = this
      let now = immediate && !timeout
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        timeout = null
        if (!immediate) result = func.call(context, ...args)
      }, wait)
      if (now) {
        result = func.call(context, ...args)
      }
      return result
    }
  }
  verifyTips(e) {
    var value
    if (typeof e === 'string') {
      value = e
    } else {
      value = $(e.currentTarget).attr('value')
    }

    this._control
      .find(
        '.verify-failed,.verify-success,.verify-default,.verify-refresh,.captcha-content'
      )
      .hide()

    this.isSuccess = false
    if (value == 'default') {
      this._control.find('.verify-refresh,.captcha-content').show()
      this.captchaCore().Get()
    } else if (value == 'close') {
      this._control.find('.verify-default').show()
      this._control.find('.captcha-content').hide()
    } else if (value == 'refresh') {
      this._control.find('.verify-refresh').show()
      this._control.find('.captcha-content').show()
      this.captchaCore().Get()
    } else if (value == 'failed') {
      this._control.find('.verify-failed').show()
      this._control.find('.captcha-content').show()
    } else if (value == 'success') {
      this._control.find('.verify-success').show()
      this._control.find('.captcha-content').hide()
      this._control.find('#box').find('.tip-error').hide()
      this.isSuccess = true
    }
  }
  captchaCore() {
    let _this = this
    var captchaCore = {
      RotateFlipTypeList: [
        {
          FlipType: 0,
          StrVal: 'none'
        },
        {
          FlipType: 1,
          StrVal: 'rotate(270deg)'
        }
        //{ FlipType: 2, StrVal: "rotate(180deg)" },
        //{ FlipType: 3, StrVal: "rotate(90deg)" },
        //{ FlipType: 4, StrVal: "rotateY(180deg)" },
        //{ FlipType: 6, StrVal: "rotateX(180deg)" }
      ],
      CaptchaData: {},
      CaptchaDataBackUp: {},
      InitImgArr: function (data) {
        var size = 50
        captchaCore.CaptchaResult = {}
        captchaCore.CaptchaDataBackUp = JSON.parse(JSON.stringify(data))
        captchaCore.CaptchaData = data
        var captchaBox = _this._control.find('#captchaBox')
        captchaBox.css(
          'width',
          captchaCore.CaptchaData.WidthSlice * size + size - 1
        )
        var captchaBoxHtml = ''
        for (var i in captchaCore.CaptchaData.PicList) {
          var pic = captchaCore.CaptchaData.PicList[i]
          captchaBoxHtml += `<img
            class="captcha-img"
          style="float: left;
    width:${size}px;
    margin-right:${captchaCore.CaptchaData.BlankPixel}px;margin-bottom:${captchaCore.CaptchaData.BlankPixel}px;transform:rotate(0deg)"  src="${pic.PicBase64Url}"/>`
        }

        captchaBox.html(captchaBoxHtml)
        let captchaImgList = _this._control.find('.captcha-img')
        for (let j = 0; j < captchaImgList.length; j++) {
          let captchaImg = captchaImgList[j]
          $(captchaImg).click(function () {
            captchaCore.Transform(this, j)
          })
        }
      },
      Get: function () {
        $.ajax({
          url: '/captcha/get',
          dataType: 'json',
          success: (r) => {
            captchaCore.InitImgArr(r)
          }
        })
      },
      Transform: function (element, index) {
        var img = captchaCore.CaptchaData.PicList[index]
        img.FlipIndex = img.FlipIndex || 0
        img.FlipIndex = ++img.FlipIndex % captchaCore.RotateFlipTypeList.length
        if (img.FlipIndex === 0) {
          $(element).css('filter', 'brightness(1)')
        } else {
          $(element).css(
            'filter',
            `brightness(${1 / captchaCore.CaptchaData.Brightness})`
          )
        }
        $(element).css(
          'transform',
          captchaCore.RotateFlipTypeList[img.FlipIndex].StrVal
        )
        captchaCore.Verify()
      },
      IsPassed: function () {
        return !!captchaCore.CaptchaResult.Token
      },
      CaptchaResult: {},
      Verify: function () {
        var code = ''
        for (var i in captchaCore.CaptchaData.PicList) {
          var img = captchaCore.CaptchaData.PicList[i]
          if (img.FlipIndex) {
            code += `${
              code === '' ? '' : captchaCore.CaptchaData.SplitFlag
            }${i}${captchaCore.CaptchaData.SplitFlag}${
              captchaCore.RotateFlipTypeList[img.FlipIndex].FlipType
            }`
          }
        }
        if (code) {
          $.ajax({
            url: `/captcha/verify?challenge=${captchaCore.CaptchaData.Challenge}&code=${code}`,
            dataType: 'json',
            success: (r) => {
              console.log(r)
              //alert(r.Msg);
              switch (r.Action) {
                case 0: {
                  //刷新
                  setTimeout(function () {
                    captchaCore.Get()
                  }, 1000)
                  _this.verifyTips('failed')
                  break
                }
                case 1: {
                  //成功
                  captchaCore.CaptchaResult = {
                    Token: r.Token,
                    Challenge: captchaCore.CaptchaData.Challenge
                  }
                  _this.verifyTips('success')
                  break
                }
                case 2: {
                  //重置
                  setTimeout(function () {
                    captchaCore.InitImgArr(captchaCore.CaptchaDataBackUp)
                  }, 1000)
                  _this.verifyTips('failed')
                  break
                }
              }
            }
          })
        } else {
          _this.verifyTips('default')
        }
      }
    }
    return captchaCore
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return
    }
    switch (event.which) {
      case TO_LOGIN_KEYCODE:
        event.preventDefault()
        this.toSubmit()
        break

      default:
    }
  }

  checkEmail(value) {
    let isEmail = this.validateEmail(value)
    if ($.trim(value) === '' && !isEmail) {
      this._tipEmail.show().html('请输入您的联系邮箱')
      return false
    } else if (!isEmail) {
      this._tipEmail.show().html('邮箱格式不正确')
      return false
    } else {
      return true
    }
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

  validateEmail(value) {
    var reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
    )
    if (!reg.test(value)) {
      return false
    }
    return true
  }
  /**
   * 清除页面校验的错误信息
   */
  onInput() {
    this._control.find('.tip-error').hide()

    // let $target = $(event.target)
    // let val = event.srcElement.value
    // if ($target.hasClass('user-phone')) {
    //   let value = event.srcElement.value.substring(0, 11)
    //   this._control.find(Selector.USER_PHONE).val(value)
    // }
    // if ($target.hasClass('user-title')) {
    //   if (val.length > 50) {
    //     let value = val.substring(0, 50)
    //     this._control.find(Selector.USER_TITLE).val(value)
    //   }

    // }
    // if ($target.hasClass('ipt-textarea')) {
    //   if (val.length > 200) {
    //     let value = val.substring(0, 200)
    //     this._control.find(Selector.LEADVE_CONTENT).val(value)
    //   }

    // }
    // if ($target.hasClass('user-email')) {

    //   let value = event.srcElement.value.substring(0, 50)
    //   this._control.find(Selector.USER_EMAIL).val(value)
    // }
  }
  // Static

  static MsgBoardInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new MsgBoard($this.attr('id'), $this.attr('data-c-style'))
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
      MsgBoard.MsgBoardInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = MsgBoard.jQueryInterface
$.fn[NAME].Constructor = MsgBoard
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return MsgBoard.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default MsgBoard
