import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
// 欢迎页
import welcome from '@/components/welcome'
// 主框架
import index from '@/components/index'

// 导航
import topNav from '@/components/nav/top'
import leftNav from '@/components/nav/left'


import wxApi from '@/components/wx_api'
import staffAudit from '@/components/staffAudit'
import abnormalOrder from '@/components/abnormalOrder'
//分拣中心
import importOrder from '@/components/importOrder'
import sortingCenter from '@/components/sortingCenter'

// 角色管理
import jurisdictionlist from '@/components/jurisdiction/list'
import jurisdictionAdd from '@/components/jurisdiction/add'

// 管理员
import adminlist from '@/components/admin/list'
import adminAdd from '@/components/admin/add'

// 配送站
import siteList from '@/components/site/list'
import siteAdd from '@/components/site/add'

// 保险公司
import companylist from '@/components/company/list'
import companyAdd from '@/components/company/add'
import underwriterList from '@/components/company/underwriterList'

// 订单查询
import queryOrderlist from '@/components/queryOrder/order_list'
import queryOrderEdit from '@/components/queryOrder/order_edit'

// 礼品管理
import giftAdd from '@/components/gift/add'
import giftList from '@/components/gift/list'

// 提现管理
import withdrawals_vehicleMaster from '@/components/withdrawals/vehicleMaster'
import withdrawals_shop from '@/components/withdrawals/shop'

// 服务卷管理
import volume_notSend from '@/components/volume/notSend'
import volume_alreadySend from '@/components/volume/alreadySend'
import volume_proportion from '@/components/volume/proportion'

// 车主管理-车主列表
import vehicleMaster_list from '@/components/vehicleMaster/list'

// 商家管理
import shop_buildType from '@/components/shop/buildType'
import shop_buildType_add from '@/components/shop/buildType_add'
import shop_examine from '@/components/shop/examine'
import shop_list from '@/components/shop/list'

// 滴滴券
import activationCode from '@/components/didiVolume/activationCode'
import didiCode from '@/components/didiVolume/didiCode'
import activationCodeAdd from '@/components/didiVolume/activationCodeAdd'
import didiCodeAdd from '@/components/didiVolume/didiCodeAdd'
import uservolumelist from '@/components/didiVolume/uservolumelist'

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
    		redirect: '/index/adminlist',
    		children:[

                {path: 'welcome', components:{topNav: topNav, content:welcome, leftNav: leftNav }},

                {path: 'adminlist', components:{topNav: topNav, content:adminlist, leftNav: leftNav }},

                {path: 'adminAdd', name: 'adminAdd',components:{topNav: topNav, content:adminAdd, leftNav: leftNav }},

    			{path: 'wxApi', name: 'wxApi', components:{topNav: topNav, content:wxApi, leftNav: leftNav }},

                {path: 'jurisdictionlist', components:{topNav: topNav, content:jurisdictionlist, leftNav: leftNav }},

                {path: 'jurisdictionAdd', name:'jurisdictionAdd',components:{topNav: topNav, content:jurisdictionAdd, leftNav: leftNav }},

                {path: 'site', name:'site', components:{topNav: topNav, content:siteList,leftNav: leftNav }},

                {path: 'siteAdd', name:'siteAdd', components:{topNav: topNav, content:siteAdd, leftNav: leftNav }},

                {path: 'companylist', name:'companylist', components:{topNav: topNav, content:companylist, leftNav: leftNav }},

                {path: 'sortingCenter', name:'sortingCenter', components:{topNav: topNav, content:sortingCenter, leftNav: leftNav }},

                {path: 'companyAdd', name:'companyAdd', components:{topNav: topNav, content:companyAdd, leftNav: leftNav }},

                {path: 'staffAudit', name:'staffAudit', components:{topNav: topNav, content:staffAudit, leftNav: leftNav }},

                {path: 'underwriterList', name:'underwriterList', components:{topNav: topNav, content:underwriterList, leftNav: leftNav}},

                {path: 'importOrder',name:'importOrder',components:{topNav: topNav,content:importOrder,leftNav: leftNav}},

                {path: 'abnormalOrder',name:'abnormalOrder',components:{topNav: topNav,content:abnormalOrder,leftNav: leftNav}},

                {path: 'queryOrderlist',name:'queryOrderlist',components:{topNav: topNav,content:queryOrderlist,leftNav: leftNav}},

                {path: 'queryOrderEdit',name:'queryOrderEdit',components:{topNav: topNav,content:queryOrderEdit,leftNav: leftNav}},

                {path: 'giftAdd',name:'giftAdd',components:{topNav: topNav,content:giftAdd,leftNav: leftNav}},

                {path: 'giftList',name:'giftList',components:{topNav: topNav,content:giftList,leftNav: leftNav}},

                {path: 'withdrawals_vehicleMaster',name:'withdrawals_vehicleMaster',components:{topNav: topNav,content:withdrawals_vehicleMaster,leftNav: leftNav}},

                {path: 'withdrawals_shop',name:'withdrawals_shop',components:{topNav: topNav,content:withdrawals_shop,leftNav: leftNav}},

                {path: 'volume_notSend',name:'volume_notSend',components:{topNav: topNav,content:volume_notSend,leftNav: leftNav}},

                {path: 'volume_alreadySend',name:'volume_alreadySend',components:{topNav: topNav,content:volume_alreadySend,leftNav: leftNav}},

                {path: 'volume_proportion',name:'volume_proportion',components:{topNav: topNav,content:volume_proportion,leftNav: leftNav}},

                {path: 'vehicleMaster_list',name:'vehicleMaster_list',components:{topNav: topNav,content:vehicleMaster_list,leftNav: leftNav}},

                {path: 'shop_buildType',name:'shop_buildType',components:{topNav: topNav,content:shop_buildType,leftNav: leftNav}},
                {path: 'shop_buildType_add',name:'shop_buildType_add',components:{topNav: topNav,content:shop_buildType_add,leftNav: leftNav}},

                {path: 'shop_examine',name:'shop_examine',components:{topNav: topNav,content:shop_examine,leftNav: leftNav}},

                {path: 'shop_list',name:'shop_list',components:{topNav: topNav,content:shop_list,leftNav: leftNav}},
                
                {path: 'activationCode',name:'activationCode',components:{topNav: topNav,content:activationCode,leftNav: leftNav}},
                {path: 'didiCode',name:'didiCode',components:{topNav: topNav,content:didiCode,leftNav: leftNav}},
                {path: 'activationCodeAdd',name:'activationCodeAdd',components:{topNav: topNav,content:activationCodeAdd,leftNav: leftNav}},
                {path: 'didiCodeAdd',name:'didiCodeAdd',components:{topNav: topNav,content:didiCodeAdd,leftNav: leftNav}},
                {path: 'uservolumelist',name:'uservolumelist',components:{topNav: topNav,content:uservolumelist,leftNav: leftNav}},

    		]
    	}
  	]	
})
