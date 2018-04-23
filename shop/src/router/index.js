import Vue from 'vue'
import Router from 'vue-router'

import nav from '@/components/nav'
import index from '@/components/index'

import coupon from '@/components/coupon'
import sellerApply from '@/components/sellerApply'
import coupon_exchange from '@/components/coupon_exchange'
import QRcode from '@/components/QRcode'
import center from '@/components/center'
import sellerInfo from '@/components/sellerInfo'
import bankcard from '@/components/center_bankCard'
import myback from '@/components/center_bankcard_operate'
import statusPage from '@/components/statusPage'

Vue.use(Router)

export default new Router({
  	routes: [
        {
            path:'/',
            redirect:'/index/coupon'
        },
        {
            path:'/sellerApply',
            name:'sellerApply',
            component: sellerApply
        },
        {
            path:'/statusPage',
            name:'statusPage',
            component: statusPage
        },
        { 
            path: '*', 
            redirect: '/index/coupon'
        },
    	{
    		path: '/index',
    		name: 'index',
    		component: index,
            redirect:'/index/coupon',
    		children: [
    			{
	    			path:'/index/coupon',
	    			name:'indexCoupon',
		    		components: {
		    			default: coupon,
		    			footerNav:nav
		    		}
		    	},
    			{
	    			path:'/index/center',
	    			name:'indexCenter',
		    		components: {
		    			default: center,
		    			footerNav:nav
		    		}
		    	},
            	{
            		path:'/index/center/couponExchange',
            		name:'coupon_exchange',
            		component:coupon_exchange
            	},
                {
                    path:'/index/center/bankcard',
                    name:'bankcard',
                    component:bankcard
                },
            	{
            		path:'/index/center/bankcard_operate',
            		name:'myback',
            		component:myback
            	},
                {
                    path:'/index/center/sellerInfo',
                    name:'sellerInfo',
                    component:sellerInfo
                },
            	{
            		path:'/index/service/QRcode',
            		name:'QRcode',
            		component:QRcode
            	},
            ]
        }
  	]
})
