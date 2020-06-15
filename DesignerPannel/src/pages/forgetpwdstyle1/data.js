const data = {
  dataModel: {
    Step: 0,
    AccountText: '手机号',
    SmsCodeText: '验证码',
    PwdText: '密码',
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
      '$themeStyle-bgColor': 'rgba(7, 102, 227, 1)',
      '$themeStyle-ftColor': 'rgba(38, 38, 38, 1)',
      $marginTop: '0px',
      $marginRight: '0px',
      $marginBottom: '0px',
      $marginLeft: '0px'
    }
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
