// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {myFn, apiAddress} from "./js/main.js"

	
import '../static/css/sm.css'
import '../static/css/sm-extend.css'



import '../static/js/zepto.js'
import '../static/js/sm.js'
import '../static/js/sm-extend.js'
import '../static/js/sm-city-picker.js'


window.apiAddress = apiAddress;
window.myFn = myFn
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
