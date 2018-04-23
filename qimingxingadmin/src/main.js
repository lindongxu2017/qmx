// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import "../static/css/style.css"
import "../static/css/font-awesome.css"
import "../static/css/entypo-icon.css"
import "../static/css/maki-icons.css"
import "../static/css/weather-icons.min.css"
import "../static/css/dripicon.css"
import "../static/css/open-sans.css"
import "../static/css/awwwards.css"
import "../static/css/bootstrap.css"
import "../static/css/signin.css"

import "../static/js/skin-select/skin-select.css"
import "../static/js/pnotify/jquery.pnotify.default.css"
import "../static/js/tip/tooltipster.css"

import "../static/js/pace/themes/pace-theme-center-simple.css"
import "../static/js/slidebars/slidebars.css"
import "../static/js/gage/jquery.easy-pie-chart.css"


import "../static/js/footable/css/footable.core.css?v=2-0-1"
import "../static/js/footable/css/footable.standalone.css"
import "../static/js/footable/css/footable-demos.css"
import "../static/js/dataTable/lib/jquery.dataTables/css/DT_bootstrap.css"
import "../static/js/dataTable/css/datatables.responsive.css"
import "../static/css/main_public.css"


import "../static/js/jquery.js"
import "../static/js/preloader.js"
import "../static/js/bootstrap.js"
import "../static/js/app.js"
import "../static/js/load.js"
import "../static/js/my_main.js"

import "../static/js/toggle_close.js"
import "../static/js/footable/js/footable.js?v=2-0-1"	
import "../static/js/footable/js/footable.sort.js?v=2-0-1"	
import "../static/js/footable/js/footable.filter.js?v=2-0-1"	
import "../static/js/footable/js/footable.paginate.js?v=2-0-1"	
import "../static/js/footable/js/footable.paginate.js?v=2-0-1"

import "../static/js/datepicker/bootstrap-datetimepicker.js"	
import "../static/js/datepicker/datepicker.css"		

import {myFn} from "./js/main.js"
import {apiAddress} from "./js/apiAddress.js"

import router from './router'


import Hello from "./components/login.vue"

window.myFn = myFn;
window.apiAddress = apiAddress;
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  	el: '#app',
  	router,
  	template: '<App/>',
  	components: { App }
});
