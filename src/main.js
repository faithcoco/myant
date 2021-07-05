// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
import { Dialog } from '@/components'
import Moment from 'moment'
import XLSX from "xlsx";
import {stringNotBlank,formatDate,dateFormat} from "./utils/util";

Vue.config.productionTip = false
Vue.filter('formatDate', function (value) {
  if(value==null){
    return ''
  }else{
    return Moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

})
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(Dialog)

Vue.prototype.strNotBlank = stringNotBlank;
Vue.prototype.formatTimeUtil = formatDate;
Vue.prototype.formatDateUtil = dateFormat;

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
