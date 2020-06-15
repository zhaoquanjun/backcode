const baseServerUrl =
  window.location.hostname.indexOf('clouddream.net') == -1
    ? 'console.wezhan.cn'
    : 'clouddream.net'

let runtimeMode = 'design'

let contentQueryBase = '//api.contentquery'
let contentQueryUrl = `${contentQueryBase}.${baseServerUrl}/api/v1/Query/general`
let contentUrl = `${contentQueryBase}.${baseServerUrl}/api/v1/Download`
let contentQueryNewsUrl = `${contentQueryBase}.${baseServerUrl}/api/v1/News/`
let contentQueryProductUrl = `${contentQueryBase}.${baseServerUrl}/api/v1/Product/`
let downloadApiBase = `${contentQueryBase}.${baseServerUrl}/`

const loginApiUrl = '/api/v1/account/Login'
const registerApiUrl = '/api/v1/account/register'
const loginInfoUrl = '/api/v1/account/LoginInfo'
const smsApiUrl = '/api/v1/sms/SendVerificationCode'
const getTokenByCode = '/api/v1/account/GetTokenByCode'
const resetPwdByToken = '/api/v1/account/ResetPwdByToken'
const sendCodeByPhone = '/api/v1/account/SendCodeByPhone'
const leavewordUrl = '/api/v1/leaveword/add'
const getWeChatLoginParams = `/api/v1/login/GetWeChatLoginParams`
const getAlipayLoginParams = `/api/v1/login/GetAlipayLoginParams`
// 全
const getNavigationList = `${contentQueryBase}.${baseServerUrl}/api/v1/Page/GetNavigationList`
// 预览
const getSettedNavigationList = `${contentQueryBase}.${baseServerUrl}/api/v1/Page/GetSettedNavigationList`
// 发布
const getPubNavigationList = '/api/v1/Page/GetNavigationList'

const changeEnv = (env) => {
  runtimeMode = env
}

const isDesign = () => {
  return runtimeMode == 'design' ? true : false
}
const hostname = window.location.hostname
const curRuntimeMode =
  hostname.indexOf('clouddream.net') !== -1
    ? 'pub'
    : hostname.indexOf('console.wezhan.cn') !== -1
    ? 'pre'
    : 'design'

export {
  curRuntimeMode,
  runtimeMode,
  downloadApiBase,
  contentQueryUrl,
  contentUrl,
  loginApiUrl,
  registerApiUrl,
  smsApiUrl,
  loginInfoUrl,
  sendCodeByPhone,
  getTokenByCode,
  resetPwdByToken,
  changeEnv,
  isDesign,
  getNavigationList,
  getSettedNavigationList,
  getPubNavigationList,
  contentQueryNewsUrl,
  contentQueryProductUrl,
  leavewordUrl,
  getWeChatLoginParams,
  getAlipayLoginParams
}
