import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import moment from 'moment'
import axios from 'axios'
import ECharts from 'vue-echarts'
import './assets/css/global.css'
import 'echarts/lib/chart/line'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css' // 这个nprogress样式必须引入
Vue.component('chart', ECharts)
//  配置请求的根路径
axios.defaults.baseURL = 'http://49.235.151.184:3001/'
// axios.defaults.baseURL = 'http://127.0.0.1:3000/';

// http request拦截器 添加一个请求拦截器,添加token
axios.interceptors.request.use(
  config => {
    NProgress.start() // 设置加载进度条(开始..)
    const token = window.localStorage.getItem("token")
    if (token) {
      config.headers.authorization = "Bearer " + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios响应拦截器
axios.interceptors.response.use(
  function (response) {
    NProgress.done() // 设置加载进度条(结束..)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD") {
  if (dateStr) {
    return moment(dateStr).format(pattern);
  } else {
    return ''
  }
})
Vue.filter('datetimeFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
})
Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
