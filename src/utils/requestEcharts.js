import axios from 'axios'

const service = axios.create({
  baseURL: '/mock', 
  timeout: 20000 
})
//请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 2100) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
