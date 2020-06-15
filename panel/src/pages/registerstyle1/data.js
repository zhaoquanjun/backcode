const data = {
  dataModel: {
    AccountText: '手机号',
    SmsCodeText: '验证码',
    PwdText: '密码',
    SendSmsText: '发送验证码',
    ConfirmPwdText: '确认密码',
    RegisterText: '注册',
    SigninText: '已有账号 去登录',
    countryCode: [
      {
        label: '+86',
        value: '中国'
      }
    ],
    SelectValue: '中国'
  },
  styleModel: {
    cssvars: {
      $width: 'auto',
      $height: 'auto',
      $display: 'inline-block',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px',
      $bgColor: 'rgba(255, 255, 255, 1)',
      $hov_bgColor: 'rgba(255, 255, 255, 1)',
      $bdWidth: '0px',
      $bdStyle: 'solid',
      $bdColor: 'rgba(255, 255, 255, 1)',
      $hov_bdColor: 'rgba(255, 255, 255, 1)',
      $bdRadius: '0px',
      $fontFamily: 'inherit',
      $fontSize: '12px',
      $color: 'rgba(255, 255, 255, 1)',
      $hov_color: 'rgba(255, 255, 255, 1)',
      $gradientstartcolor: 'none',
      $gradientendcolor: 'none',
      $hov_gradientstartcolor: 'none',
      $hov_gradientendcolor: 'none',
      $violet: '0deg',
      $hov_violet: '0deg',
      $bgImage: '',
      $hov_bgImage: '',
      $bgSize: 'cover',
      $bgRepeat: 'no-repeat',
      $hov_bgSize: 'cover',
      $bgPosition: '0 0',
      $hov_bgPosition: '0 0',
      $fontWeight: 'normal',
      $fontStyle: 'normal',
      $textDecoration: 'none',
      $hov_fontWeight: 'normal',
      $hov_fontStyle: 'normal',
      $hov_textDecoration: 'none'
    },
    width: null,
    height: null,
    left: null,
    top: null,
    right: null,
    bottom: null,
    fixedOffsetX: 0,
    fixedOffsetY: 0,
    unit: 'Px',
    position: 'Static',
    fixedPosition: 'None',
    visible: true,
    zIndex: null
  }
}
const dataWrapper = {
  data: data
}
import formatData from '@utils/formatData'
if (window.smSite) {
  formatData(dataWrapper)
}

export default dataWrapper
