// 二次封装axios
import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/token'

// 创建一个axios实例
const requests = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 10000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, (err) => {
  return Promise.reject(new Error(err.message))
})

// 响应拦截器
requests.interceptors.response.use((response) => {
  return response
}, (err) => {
  if (err.response.status === '401') {
    // 身份过期,重新登录
    router.push('/login')
  }
  return Promise.reject(new Error(err.message))
})

export default requests
