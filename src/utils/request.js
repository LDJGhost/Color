/**
 *  封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://' // 基础路径
})

// 请求拦截器

// 响应拦截器

export default request

/**
 * 使用
 * import request from '@/utils/request'
 * request ({
 *  method: 'xxx',
 *  url:'xxx',
 * })
 */
