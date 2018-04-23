import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import nav from '@/components/nav'
import index from '@/components/index'
import service from '@/components/service'
import serviceDetails from '@/components/service_details'
import coupon from '@/components/coupon'
import coupon_exchange from '@/components/coupon_exchange'
import QRcode from '@/components/QRcode'
import center from '@/components/center'
import license from '@/components/center_license'
import licenseEdit from '@/components/center_licenseEdit'
import myback from '@/components/myback'
import infoEdit from '@/components/center_info_edit'
import statusPage from '@/components/statusPage'

import pay from '@/components/pay'

// 激活码
import activationCode from '@/components/activationCode/list'
import exchange from '@/components/activationCode/exchange'
import orderPay from '@/components/activationCode/order_pay'

Vue.use(Router)

export default new Router({
  	routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
    	{
      		path: '/',
            redirect: '/index/service'
    	},
        {
            path:'/statusPage',
            name:'statusPage',
            component: statusPage
        },
        { 
            path: '*', 
            redirect: '/index/service'
        },
    	{
    		path: '/index',
    		name: 'index',
            redirect:'/index/service',
    		component: index,
    		children: [
    			{
	    			path:'/index/service',
	    			name:'indexService',
		    		components: {
		    			default: service,
		    			footerNav:nav
		    		}
		    	},
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
                    component: coupon_exchange
                },
            	{
                    path:'/index/center/myback',
                    name:'myback',
                    component: myback
                },
                {
            		path:'/index/center/license',
            		name:'license',
            		component: license
            	},
                {
                    path:'/index/center/licenseEdit',
                    name:'licenseEdit',
                    component: licenseEdit
                },
                {
                    path:'/index/service/QRcode',
                    name:'QRcode',
                    component: QRcode
                },
                {
                    path:'/index/center/infoEdit',
                    name:'infoEdit',
                    component: infoEdit
                },
                {
                    path:'/index/service/details',
                    name:'serviceDetails',
                    component: serviceDetails
                },
                {
                    path:'/index/pay',
                    name:'pay',
                    component: pay
                },
                {
                    path:'/index/activationCode',
                    name:'activationCode',
                    components: {
                        default: activationCode,
                        footerNav:nav
                    }
                },
                {
                    path:'/index/exchange',
                    name:'exchange',
                    component:exchange
                },
                {
                    path:'/index/orderPay/:id',
                    name:'orderPay',
                    component:orderPay
                }
            ]
        }
  	]
})
