import axios from 'axios'
import apiConfig from '../../config/api.config'

function getCookie (cookie, cookieName) {
  let cookiePos = cookie.indexOf(cookieName)
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookiePos > -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookiePos += cookieName.length + 1
    let cookieEnd = cookie.indexOf(';', cookiePos)

    if (cookieEnd === -1) {
      cookieEnd = cookie.length
    }
    return unescape(cookie.substring(cookiePos, cookieEnd))
  }
  return null
}

const service = axios.create({
  baseURL: apiConfig.agentURL
})

// config.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 拦截器
service.interceptors.request.use(config => {
  // post方法并且数据不是formData，序列化参数
  if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
    // config.data = qs.stringify(config.data)
  }
  try {
    // config.headers['ACCESS_TOKEN'] = getCookie(document.cookie, 'token')
    // 无token时，尝试重新获取token

    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (!config.headers['ACCESS_TOKEN'] && getCookie(document.cookie, 'token')) {
      config.headers['ACCESS_TOKEN'] = getCookie(document.cookie, 'token')
    }
    if (!getCookie(document.cookie, 'token') && config.headers['ACCESS_TOKEN']) {
      try {
        delete config.headers['ACCESS_TOKEN']
      } catch (err) {}
    }
  } catch (err) {}
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(res => {
  if (parseInt(res.status) !== 200) return Promise.reject(res)
  /*
   * 状态码0判断，成功返回，失败则根据error.status判断是请求成功还是请求失败
   * error.status为true，则表示请求成功，此时根据后台返回状态码编写回调逻辑
   * error.status不存在，则表示请求失败（网络原因、请求状态不为200等原因）
   */
  if (res.data.code === 0) return res.data
  return Promise.reject(res.data)
}, error => {
  return Promise.reject(error)
})

export default service
