import axios from 'axios'
import qs from 'qs'
import apiConfig from '../../config/api.config'

const service = axios.create({
  baseURL: apiConfig.zendeskURL
})

// 拦截器
service.interceptors.request.use(config => {
  // post方法并且数据不是formData，序列化参数
  if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
    config.data = qs.stringify(config.data)
  }
  try {
    delete config.headers['ACCESS_TOKEN']
  } catch (err) {}
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(res => {
  if (parseInt(res.status) !== 200) return Promise.reject(res)
  return res.data
}, error => {
  return Promise.reject(error)
})

export default service
