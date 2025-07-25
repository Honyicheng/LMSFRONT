import axios from 'axios'
import { getToken,clearToken} from '.'
import router from '@/router' // 导入路由对象

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config)=> {
const token = getToken() // 获取token
 if (token) {
    // 如果存在token，则在请求头中添加Authorization字段
    config.headers.Authorization = `Bearer ${token}`
 }
    return config
 
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // 如果响应状态码是401，表示未授权
      // 可以在这里处理未授权的情况，比如清除token并重定向到登录页面
      console.error('Unauthorized access - redirecting to login')
      // 这里可以添加清除token的逻辑
      // window.location.href = '/login' // 重定向到登录页面
      clearToken() // 清除token
      router.navigate('/login', { replace: true }) // 使用react-router的navigate方法重定向到登录页面
      // 或者使用history.push('/login') // 如果你使用的是react-router v5
      // router.push('/login') // 如果你使用的是react-router v6
      window.location.reload() // 刷新页面
    } 
    return Promise.reject(error)
})

export { http }