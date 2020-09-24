import Vue from 'vue'
import axios from 'axios'

import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
let url;
if(process.env.NODE_ENV==='production'){
  // 有些浏览器(主要是IE)没有这个属性，所以我们需要手工构建它……
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
  }

  url=window.location.origin+"/wms-web"+'/pc'; //生产环境下的配置
}else{
  url=process.env.VUE_APP_API_BASE_URL; //开发环境下的配置
}

export {
  url
}
 console.log("url-->",url)
// 创建 axios 实例
const service = axios.create({
  baseURL: url, // api base_url
  //baseURL: 'http://rap2api.taobao.org/app/mock/254479',
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
