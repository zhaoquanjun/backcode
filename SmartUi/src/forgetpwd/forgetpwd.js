    /**
 * ----------------------------------------
 * SmartUi(v0.1):login.js
 * ----------------------------------------
 */
import template from '../templateengine/index';
import {
    getSysClass,
    getjQuery
} from '../util'
import HttpRequest from '../util/httpRequest';

import {
    sendCodeByPhone,
    getTokenByCode,
    resetPwdByToken
} from '../env/index';

const DATA_KEY = 'st.forgetpwd'
const EVENT_KEY = `.${DATA_KEY}`
const NAME = 'forgetpwd';
const TO_LOGIN_KEYCODE = 13;

const INNER_TEM = ` <div class="flow-box">
                            <header class="header">
                                <h3 class="title">{{ PageTitleText }}</h3>
                            </header>
                            <nav class="nav">
                                <ul class="nav-list">
                                    <li class="nav-item selected"><b></b></li>
                                    <li class="nav-item"><i></i><b></b></li>
                                    <li class="nav-item"><i></i><b></b></li>
                                </ul>
                                <ul class="nav-list nav-list-text">
                                    <li class="nav-item title-text1 selected"> {{ TitleText1 }} </li>
                                    <li class="nav-item title-text2"> {{ TitleText2 }} </li>
                                    <li class="nav-item title-text3"> {{ TitleText3 }} </li>
                                </ul>
                            </nav>
                            <section class="flow-list">
                            <div class="flow-item form-row row-select selected">
                            <span class="dropdown-select"><i class="iconfont dropdown-arrow"></i><em
                                    class="text-select">+86</em><input type="hidden" name="regionCode" value="+86"></span>
                            <span class="ipt-wrap"><input type="tel" autocomplete="off" class="ipt ipt-phone required" placeholder="{{ AccountText }}"
                                    name="account"></span>
                            <div class="dropdown-menu">
                                <ul>
                                   {% for item in countryCode %}
                                    <li data-val="+86"><span class="num">{{ item.label }}</span>{{ item.value }}</li>
                                   {% endfor %}
                                </ul>
                            </div>
                            <div class="tip-error tip-phone"></div>
                            <div class="form-row">
                                    <div class=" form-btn" style="width: 100%;margin-top: 30px;">
                                           
                                        </div>
                            </div>
                            <span class="ipt-wrap form-row">
                                    <input type="text" autocomplete="off" class="ipt ipt-sms" ka="signup-sms" placeholder="{{ SmsCodeText }}" name="phoneCode"
                                        maxlength="6">
                            
                                    <button type="button" class="btn btn-sms">{{ SendSmsText }}</button>
                            </span>
                            <div class="tip-error tip-sms"></div>
                        </div>
                        <div class="flow-item form-row row-pwd">
                            <div class="form-row">
                                <span class="ipt-wrap"><input type="password" class="ipt ipt-pwd" placeholder="{{ PwdText }}"
                                        name="password"></span>
                                <div class="tip-error tip-pwd"></div>
                            </div>
                            <div class="form-row row-comfirm-pwd">
                                <span class="ipt-wrap"><input type="password" class="ipt ipt-confirm-pwd" placeholder="{{ ConfirmPwdText }}"
                                        name="password"></span>
                                <div class="tip-error tip-comfirm-pwd"></div>
                            </div>
                        </div>
                        <div class="flow-item form-row">
                            <div class="reset-success">
                                <span class="reset-img"><img
                                        src="http://img.andni.cn/Picture/823EB3BD-93F4-4655-B833-D604A6EF2032/Bewcs4_Yd0y6m7aB4YfRnQ.png
                                        alt=""></span>
                                <div class="reset-text">{{ ResetSuccessText }}</div>
                            </div>
                        </div>
                            </section>
                            <div class="form-btn next-btn-wrap">
                               
                                <button type="button" class="next-btn signin-btn selected"> {{ NextStepText }}</button>
                                <button type="button" class="reset-btn signin-btn">{{ ResetPwdText }}</button>
                                <button type="button" class="login-now-btn signin-btn">{{ LoginNowText }}</button>
                              
                            </div>
                            <div class="text-tip">
                                 <a href="/login" class="left-tip back-login">{{ BackLoginText }}</a>
                             </div>
                        </div>
                        <div class="layer-tip"></div>
                        `;
const templates = {}
templates['style1'] = `<div class="forgetpwd-wrap {{_SysClass}}" id="{{_Id}}" data-c-type="forgetpwd">${INNER_TEM}</div>`

const $ = getjQuery();

let STEP = 0;
var TIME_COUNT = 60; //倒计时时间

const Default = {
    keyboard: true,
}
const Event = {
    CLICK_DATA_API: `click${EVENT_KEY}`,
    KEYDOWN: `keydown${EVENT_KEY}`,
    ONINPUT: `input propertychange${EVENT_KEY}`
}

const Selector = {
    TIP_PHONE: '.tip-phone',
    TIP_SMS: '.tip-sms',
    TIP_PWD: '.tip-pwd',
    TIP_CONFIRM_PWD: '.tip-comfirm-pwd',
   
    SMS_BTN: '.btn-sms',

    DROPDOWN_SELECT: '.dropdown-select',
    DROPDOWN_MENU: '.dropdown-menu',
    DROPDOWN_ARROW: '.dropdown-arrow',

    FORM_BTN: '.next-btn-wrap',
    NEXT_BTN: '.signin-btn',

    IPT_PHONE: '.ipt-phone',
    IPT_SMS: '.ipt-sms',
    IPT_PWD: '.ipt-pwd',
    IPT_CONFIRM_PWD: '.ipt-confirm-pwd',
    LAYER_TIP: '.layer-tip',

    NAV_LIST: '.nav-list',
    NAV_ITEM: '.nav-item',
    NAV_LIST_TEXT: '.nav-list-text',
    FLOW_LIST: '.flow-list',
    FLOW_ITEM: '.flow-item',

    TEXT_TIP: '.text-tip',


}

const ClassName = {
    SELECTED: "selected",
    DROPDOWN_MENU_OPEN: 'dropdown-menu-open',
    DROPDOWN_ARROW_OPEN: 'dropdown-arrow-open'

}

class ForgetPwd {
    constructor(id, style, options) {
        this._id = id;
        this._style = style;
        this._control = $('#' + id);
        this._config = $.extend({}, Default, options);

        this.timer = null;
        this.verifyToken = null;
        this.phone = null;

    }
    _init() {
        this._tipPhone = this._control.find(Selector.TIP_PHONE);
        this._tipSms = this._control.find(Selector.TIP_SMS);
        this._tipPwd = this._control.find(Selector.TIP_PWD);
        this._tipConfirmPwd = this._control.find(Selector.TIP_CONFIRM_PWD);


        this._dropdownSelect = this._control.find(Selector.DROPDOWN_SELECT);
        this._dropdownMenu = this._control.find(Selector.DROPDOWN_MENU);
        this._dropdownArrow = this._control.find(Selector.DROPDOWN_ARROW);


        this._iptPhone = this._control.find(Selector.IPT_PHONE);
        this._iptSms = this._control.find(Selector.IPT_SMS);
        this._iptPwd = this._control.find(Selector.IPT_PWD);
        this._iptConfirmPwd = this._control.find(Selector.IPT_CONFIRM_PWD);

        this._nextBtn = this._control.find(Selector.NEXT_BTN);
        this._smsBtn = this._control.find(Selector.SMS_BTN);

        this._addEventListeners();
        // $.data(this._control, DATA_KEY, this);
        this._control.data(DATA_KEY, this);

    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        data._Style = this._style;
        data._Query = JSON.stringify(data.query);
        const cacheKey = DATA_KEY + '_' + this._style;

        return template(cacheKey, templates[this._style], data);
    }

    _addEventListeners() {
        if (this._config.keyboard) {
            this._control.off(Event.KEYDOWN).on(Event.KEYDOWN, $.proxy(this._keydown, this));

        }
        this._nextBtn.off(Event.CLICK_DATA_API).on(Event.CLICK_DATA_API, $.proxy(this.checkNext, this));
        this._dropdownSelect.off(Event.CLICK_DATA_API).on(Event.CLICK_DATA_API, $.proxy(this.dropdownMenu, this));

        this._iptPhone.off(Event.ONINPUT).on(Event.ONINPUT, $.proxy(this.onInput, this));
        this._iptSms.off(Event.ONINPUT).on(Event.ONINPUT, $.proxy(this.onInput, this));
        this._iptPwd.off(Event.ONINPUT).on(Event.ONINPUT, $.proxy(this.onInput, this));
        this._iptConfirmPwd.off(Event.ONINPUT).on(Event.ONINPUT, $.proxy(this.onInput, this));

        this._smsBtn.off(Event.CLICK_DATA_API).on(Event.CLICK_DATA_API, $.proxy(this.getSmsCode, this));
    }
   

    /**
     * 每一步的校验
     */
    checkNext() {
        if (STEP > 3) return;
        switch (parseFloat(STEP)) {
            case 0:
                var phone = this._iptPhone.val();
                this.phone = phone
                var smsCode = this._iptSms.val();
                if (!this.checkphone(phone)) {
                    return false
                } else if (!this.checkSms(smsCode)) {
                    return false
                }
                this._getTokenByCode(phone, smsCode)
                break
            case 1:
                var pwd = this._iptPwd.val();
                var comfirmPwd = this._iptConfirmPwd.val();
                if (!this.checkPwd(pwd)) {
                    return false
                } else if (!this.checkConfrimPwd(pwd, comfirmPwd)) {
                    return false
                }
                this._resetPwdByToken(this.phone, comfirmPwd)
                break
            case 2:
                // var newWindow = window.open();
                window.location.href = "/login";
                break
            default:
                break
        }


    }

    /**
     * 点击下一步
     * @param { Number } val.Step  第几步
     */
    changeStep(val) {
        this._control.find(Selector.NAV_LIST).find(Selector.NAV_ITEM).eq(val.Step).addClass(ClassName.SELECTED).prevAll().addClass(ClassName.SELECTED);
        this._control.find(Selector.NAV_LIST_TEXT).find(Selector.NAV_ITEM).eq(val.Step).addClass(ClassName.SELECTED).prevAll().addClass(ClassName.SELECTED);
        this._control.find(Selector.FLOW_LIST).find(Selector.FLOW_ITEM).eq(val.Step).addClass(ClassName.SELECTED).siblings().removeClass(ClassName.SELECTED);
        this._control.find(Selector.FORM_BTN).find(Selector.NEXT_BTN).eq(val.Step).addClass(ClassName.SELECTED).siblings().removeClass(ClassName.SELECTED);
        let textTip = this._control.find(Selector.TEXT_TIP);
        val.Step < 2 ? textTip.show() : textTip.hide()

    }

    /**
     * 获取 verifyToken 
     * @param {*} phone 手机号
     * @param {*} smsCode 验证码
     */
    _getTokenByCode(phone, smsCode) {
        let queryData = {
            mobile: phone,
            verificationCode: smsCode
        };
        let _this = this;
        HttpRequest.get(getTokenByCode, queryData, function (data) {
            if(data.isVerifyPassed){
                ++STEP;
                _this.verifyToken = data.verifyToken
                _this.changeStep({
                    Step: STEP
                })
            }else{
                _this._control.find(Selector.LAYER_TIP).show().html("验证码错误").delay(2000).fadeOut();
            }

        }, function (error) {
            let data = error.responseJSON
            _this._control.find(Selector.LAYER_TIP).show().html(data.message).delay(2000).fadeOut();
        });
    }
    /**
     * 找回密码接口校验
     * @param {*} phone 手机号
     * @param {*} newPwd 新密码
     * @param { String } verifyToken 
     */
    _resetPwdByToken(phone, newPwd) {
        let queryData = {
            token: this.verifyToken,
            mobile: phone,
            newPwd: newPwd
        };
        let _this = this;
        HttpRequest.put(resetPwdByToken, queryData, function () {
                ++STEP;
                _this.changeStep({
                    Step: STEP
                })
        }, function (error) {
            let data = error.responseJSON
            _this._control.find(Selector.LAYER_TIP).show().html(data.message).delay(2000).fadeOut();
        });
    }
    /**
     * 获取验证码
     */
    getSmsCode() {
        let phone = this._iptPhone.val();
        if (!this.checkphone(phone)) return false;
        let queryData = {
            mobile: phone,
            captcha: "YouWillNeverKnow"
        };
        let _this = this;
        HttpRequest.post(sendCodeByPhone, queryData, function () {
            _this.countdown()
        }, function (error) {
            let data = error.responseJSON
            _this._control.find(Selector.LAYER_TIP).show().html(data.message).delay(2000).fadeOut();
        });
    }
    /**
     * 验证码倒计时
     */
    countdown() {
        let smsBtn = this._control.find(Selector.SMS_BTN);
        smsBtn.text("正在发送");
        if (!this.timer) {
            let count = TIME_COUNT;
            this.timer = setInterval(() => {
                if (count > 0 && count <= TIME_COUNT) {
                    count--;
                    smsBtn.attr("disabled", true);
                    smsBtn.text(count + "s");
                    if (count <= 0) {
                        clearInterval(this.timer); // 清除定时器
                        this.timer = null;
                        smsBtn.attr("disabled", false);
                        smsBtn.text("发送验证码");
                    }
                }
            }, 1000);
        }
    }

    _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
            return
        }
        switch (event.which) {
            case TO_LOGIN_KEYCODE:
                event.preventDefault()
                this.checkNext()
                break

            default:
        }
    }

    /**
     *  国际代码 
     */
    dropdownMenu() {
        this._dropdownMenu.toggleClass(ClassName.DROPDOWN_MENU_OPEN)
        this._dropdownArrow.toggleClass(ClassName.DROPDOWN_ARROW_OPEN)
    }
    /**
     * 校验手机号
     * @param { Number } phoneNum  手机号
     */
    checkphone(phoneNum) {
        let isPhoneNumber = this.validateTel(phoneNum);
        if ($.trim(phoneNum) === "" && !isPhoneNumber) {
            this._tipPhone.show().html("请输入手机号")
            return false;
        } else if (!isPhoneNumber) {
            this._tipPhone.show().html("手机号格式不正确")
            return false;
        }
        return true

    }
    /**
     * 校验验证码
     * @param {*} sms 验证码 
     */
    checkSms(sms) {
        if ($.trim(sms) === "") {
            this._tipSms.show().html("请输入验证码")
            return false
        }
        return true
    }

    /**
     * 校验密码 是否符合规则
     * @param {*} pwd 
     */
    checkPwd(pwd) {

        let pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/
        if ($.trim(pwd) === "") {
            
            this._tipPwd.show().html("请输入密码")
            return false
        }
        if (pwd.length < 6 || pwd.length > 16) {
            this._tipPwd.show().html("密码长度必须为6-16位")
            return false
        }
        if (!pwdReg.test(pwd)) {
            this._tipPwd.show().html("必须包含数字、字母、标点符号的其中两项")
            return false
        }
        return true
    }
    /**
     * 校验确认密码
     * @param {*} pwd  密码 
     * @param {*} confirmPwd  确认密码
     */
    checkConfrimPwd(pwd, confirmPwd) {
        if ($.trim(confirmPwd) === "") {
            this._tipConfirmPwd.show().html("请输入确认密码")
            return false
        }
        if (pwd !== confirmPwd) {
            this._tipConfirmPwd.show().html("两次输入密码不一致,请重新输入")
            return false
        }
        return true
    }
    /**
     * 手机号规则
     * @param { Number } tel  手机号
     */
    validateTel(tel) {
        var TEL_REGEXP =
            /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/
        if (TEL_REGEXP.test(tel)) {
            return true;
        }
        return false;
    }
    /**
     * 移除页面校验的错误信息
     */
    onInput() {
        this._control.find(".tip-error").hide()
    }
    // Static

    static forgetpwdInterface(element, options, args) {
        const $this = $(element);
        let data = $this.data(DATA_KEY)
        if (!data) {
            data = new ForgetPwd($this.attr('id'), $this.attr('data-c-style'));
            data._init();
        }
        if (typeof options === 'string') {
            if (typeof data[options] === 'undefined') {
                throw new TypeError(`No method named "${options}"`)
            }
            data[options].apply(data, args);
        }
    }

    static jQueryInterface(config) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            ForgetPwd.forgetpwdInterface(this, config, args)
        })
    }
}

const JQUERY_NO_CONFLICT = $.fn[NAME];
$.fn[NAME] = ForgetPwd.jQueryInterface
$.fn[NAME].Constructor = ForgetPwd;
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ForgetPwd.jQueryInterface
}
$(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]();
})

export default ForgetPwd;