import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import index from '@/components/index'
import todayTask from '@/components/todayTask'
import orderDetail from '@/components/orderDetails'
import taskcenter from '@/components/taskcenter'
import feddback from '@/components/feddback'
import search from '@/components/search'
import paymentOrder from '@/components/paymentOrder'

import audit from '@/components/audit'

import feddbackre from '@/components/feddbackre'
import change from '@/components/change'


import footNav from '@/components/footNav'

Vue.use(Router)

export default new Router({
  	routes: [
	    {
	      	path: '/',
	      	name: 'register',
	      	component: register
	    },
	    {
	      	path: '/index',
	      	name: 'index',
	      	component: index,
	      	redirect: '/index/todayTask',
	      	children:[
	      		{
	      			path: 'todayTask',
	      			name: 'todayTask',
                    components:{
                        content: todayTask,
                        footerNav: footNav
                    }
	      		},
	      		{
	      			path: 'orderDetail',
	      			name: 'orderDetail',
                    components:{
                        content: orderDetail
                    }
	      		},
	      		{
	      			path: 'taskcenter',
	      			name: 'taskcenter',
                    components:{
                        content: taskcenter,
                        footerNav: footNav
                    }
	      		},
	      		{
	      			path: 'feddbackre',
	      			name: 'feddbackre',
                    components:{
                        content: feddbackre,
                        footerNav: footNav
                    }
	      		},
	      		{
	      			path: 'change',
	      			name: 'change',
                    components:{
                        content: change,
                        footerNav: footNav
                    }
	      		}
	      	]
	    },
	    {
	    	path: '/search',
  			name: 'search',
	    	component:search
	    },
	    {
	    	path: '/audit',
	    	name:'audit',
	    	component:audit
	    },
	    {
  			path: '/feddback',
  			name: 'feddback',
            component:feddback
  		},
  		{
	    	path: '/paymentOrder',
  			name: 'paymentOrder',
	    	component:paymentOrder
	    }
  	]
})
