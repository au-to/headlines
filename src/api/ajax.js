// 二次封装axios
import axios from 'axios'
const requests = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 10000
})
export default requests
