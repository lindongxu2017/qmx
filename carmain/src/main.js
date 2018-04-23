// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// sui
import '../static/sui/css/sm.css'
import '../static/sui/css/sm-extend.css'
import '../static/sui/js/zepto.js'
import '../static/sui/js/sm.js'
import '../static/sui/js/sm-extend.js'
import '../static/sui/js/sm-city-picker.js'
import '../static/sui/font/iconfont.css'

// main CSS
import './css/main_reset.css'
import './css/main_public.css'

// main JS
import {myFn} from './js/main.js'
import {apiAddress} from './js/apiAddress.js'

// swiper
import '../static/swiper/swiper-3.4.2.jquery.min.js'

Vue.config.productionTip = false;
window.myFn = myFn;
window.apiAddress = apiAddress;

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
