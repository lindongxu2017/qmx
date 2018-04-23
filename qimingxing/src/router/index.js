import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import topNav from '@/components/topNav'
import leftNav from '@/components/leftNav'

import courier from '@/components/courier'
import courierArchives from '@/components/courierArchives'
import courierEdit from '@/components/courierEdit'

import orderAllocation from '@/components/orderAllocation'
import today_task from '@/components/today_task'
import orderEdit from '@/components/order_edit'

import notDelivered_task from '@/components/notDelivered_task'
import yesDelivered_task from '@/components/yesDelivered_task'
import yesDelivered_task_details from '@/components/yesDelivered_task_details'

import myInfoEdit from '@/components/myInfo_edit'

import welcome from '@/components/welcome'

// 服务卷管理-未送出的服务卷
import volume_notSend from '@/components/volume/notSend'
// 服务卷管理-已送出的服务卷
import volume_alreadySend from '@/components/volume/alreadySend'


Vue.use(Router)

export default new Router({
  	routes: [
    	{
      		path: '/',
      		name: 'login',
      		component: login,
      		// redirect: '/login',
    	},
    	{
    		path: '/index',
    		name: 'index',
    		component: index,
    		redirect: '/index/courier',
    		children:[
                {path: 'welcome', components:{topNav: topNav, content:welcome, leftNav: leftNav }},

                {path: 'courier', components:{topNav: topNav, content:courier, leftNav: leftNav }},

                {path: 'courierArchives',name: 'courierArchives', components:{ topNav: topNav,content:courierArchives,leftNav: leftNav}},

                {path: 'courierEdit',name:'courierEdit', components:{topNav: topNav,content:courierEdit,leftNav: leftNav }},

                {path: 'orderAllocation',name:'orderAllocation',components:{topNav: topNav, content:orderAllocation, leftNav: leftNav }},

                {path: 'today_task', name:'today_task', components:{topNav: topNav, content:today_task, leftNav: leftNav }},

                {path: 'orderEdit',name:'orderEdit',components:{topNav: topNav,content:orderEdit,leftNav: leftNav }},

                {path: 'notDelivered_task',name:'notDelivered_task',components:{topNav: topNav,content:notDelivered_task,leftNav: leftNav}},

                {path: 'yesDelivered_task',name:'yesDelivered_task',components:{topNav: topNav,content:yesDelivered_task,leftNav: leftNav}},

                {path: 'yesDelivered_task_details',name:'yesDelivered_task_details',components:{topNav: topNav,content:yesDelivered_task_details,leftNav: leftNav}},

                {path: 'myInfoEdit',name:'myInfoEdit',components:{topNav: topNav,content:myInfoEdit,leftNav: leftNav}},

                {path: 'volume_notSend',name:'volume_notSend',components:{topNav: topNav,content:volume_notSend,leftNav: leftNav}},

                {path: 'volume_alreadySend',name:'volume_alreadySend',components:{topNav: topNav,content:volume_alreadySend,leftNav: leftNav}},

    		]
    	}
  	]	
})
