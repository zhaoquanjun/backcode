const baseServerUrl =
  window.location.hostname.indexOf('clouddream.net') === -1
    ? 'console.wezhan.cn'
    : 'clouddream.net'
import * as ajaxRequest from './ajaxRequest'
export const getNewsList = options => {
  return ajaxRequest.post(
    `//api.contentquery.${baseServerUrl}/api/v1/Query/general`,
    options
  )
}
