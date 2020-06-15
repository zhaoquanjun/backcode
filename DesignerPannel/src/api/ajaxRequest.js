/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import qs from 'qs'
import { Notification } from 'element-ui'
// 请求超时时间
axios.defaults.timeout = 15000

// post请求�
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

axios.defaults.headers.put['Content-Type'] =
  'application/json-patch+json;charset=UTF-8'

axios.defaults.withCredentials = true

// 请求拦截�
axios.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === 'production') {
      config.headers['X-XSRF-TOKEN'] = window.smSite.getXsrfToken()
      const token = _getJwtToken()
      token && (config.headers.Authorization = 'Bearer ' + token)
    } else {
      const token =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6Ii1HYXRmMVdvVUF4N0JqZDh2dDdaWkEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1ODA4ODI0MzcsImV4cCI6MTU4MjE3ODQzNywiaXNzIjoiaHR0cDovL2xvZ2luLmNvbnNvbGUud2V6aGFuLmNuIiwiYXVkIjpbImRlc2lnbmVyLmFwaSIsImNvbnRlbnQuYXBpIiwiZGFzaGJvYXJkLmFwaSIsInByb2R1Y2UuYXBpIl0sImNsaWVudF9pZCI6ImRldi5kZXNpZ25lci5hcHAiLCJzdWIiOiJDRDFBMjNENS0zOUJCLTQzQTEtODEyNS1DNDZGMjBDNkREQTIiLCJhdXRoX3RpbWUiOjE1ODA4ODI0MzYsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMTM1MjAzMDMxNTYiLCJwaG9uZV9udW1iZXIiOiIxMzUyMDMwMzE1NiIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwicm9sZSI6Ing2ajNQYWlYRWtHQ0UtUUVaMGNPT2ciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ4NmozUGFpWEVrR0NFLVFFWjBjT09nIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImRlc2lnbmVyLmFwaSIsImNvbnRlbnQuYXBpIiwiZGFzaGJvYXJkLmFwaSIsInByb2R1Y2UuYXBpIl0sImFtciI6WyJwd2QiXX0.jS3DpgJP11ice2RpEnPGDjwRPa5WVN1pdLTmYSSAlj9Qp1w17vps0tygmMk1UGmPO8Zi93TxldQiUX15Dy3IVJcRWGgY3cH7BNwv5NhrgDgBoj6FibO0Wx5TNr-lYC-V6XcpXBE4t8pbwoHe1j56pK1QnG_ITt9MCXuWu8lvi1K3lP3bV3dFczq0nl68fdvk4NXR32JezoKqkYciTx60E7lCqNw84VKQwXVOo24p80EIPtfIKGmpyTiEmtq3jmHDOUmciebBHD6IwDW9e-4YCdkx2J6_kF20l7ayGPegbhHFycJuMW_6chT3rfoshMO8v7jWfWqe191T2XRw7fmbzQ'
      token && (config.headers.Authorization = 'Bearer ' + token)
      config.headers['X-XSRF-TOKEN'] =
        'Yc5yqRIXmBT5trRMrspfQdzrE5QMEQE58A4J7Z3jcMIFM8eQrunRe6KvhloDjkH-9POBQ7pjJIHqTpOEnR1hiIJGDAOPzFngsTSzzjkDd99ARg8UXBaQ028L0pGI67Tr'
    }

    if (window.smSite) {
      const isDev = window.smSite.isDev()
      if (isDev) {
        config.headers.AppId = window.smSite.getAppIdByCookie()
      }
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截�
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情�
  error => {
    // let status = error.response.status;
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          break
        case 403:
          break
        case 404:
          break
        case 500:
          Notification({
            message: error.response.data.message,
            duration: 5 * 1000,
            customClass: 'notify-error', //  notify-success ||  notify-error
            showClose: false
          })
          return
        default:
          Notification({
            message: error.response.data.message,
            duration: 5 * 1000,
            customClass: 'notify-error', //  notify-success ||  notify-error
            showClose: false
          })

          break
      }
      return Promise.reject(error.response)
    }
  }
)

// function _getXsrfToken() {
//   if (window.smSite) {
//     return window.smSite.getXsrfToken;
//   }
// }

function _getJwtToken() {
  var tk = window.localStorage.getItem('wzdesignxkoen')
  return tk
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, {
            indices: false
          })
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function _delete(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
