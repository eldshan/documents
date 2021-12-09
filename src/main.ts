import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'

// axios配置
const baseURL = 'xxx'
const code = 'xxx'
// axios设置拦截
axios.defaults.baseURL = baseURL
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError',{ status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

createApp(App).use(store).use(router).mount('#app')