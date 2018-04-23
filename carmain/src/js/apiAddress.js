var apiAddress = {
	login: {
		register: '/home/shop/ownerApply'
	},
	userInfo: {
		getUserInfo: '/home/owner/getSlefInfo',
		setUserInfo: '/home/owner/updateSelfInfo',
		licenseList: '/home/owner/licenseList',
		addLicense: '/home/owner/addLicense',
		delLicense: '/home/owner/delLicense'
	},
	shop: {
		shoplist: '/home/shop/list',
		shopDetails: '/home/shop/info',
		shopTypeList: '/shopcate/allList'
	},
	coupon: {
		couponDetailed: '/home/account/getUserAccountList',
		couponTotal: '/home/user/getVolumeBalance',
		couponExchange: '/home/withdraw/apply',
		couponApply: '/home/withdraw/apply',
		QRcode: '/public/home/user/createQrcode',
		serviceCharge: '/home/user/getVolumeConvertRatio'
	},
	bank: {
		getBank: '/home/userbank/getBankCardInfo',
		setBank: '/home/userbank/addBankCard'
	},
	pay: {
		gopay:'/home/owner/toShopPayVolume'
	},
	wx: {
		login:'/home/user/wxLogin',
		// 微信授权获取Code
		getCode: '/home/user/getCode',
	},
	// 滴滴券
	didi: {
		list: '/home/ticket/ticketTypeList',
		details: '/home/ticket/ticketTypeInfo',
		mylist: '/home/ticket/myTicketList',
		pay: '/home/ticket/byTicket',
		recevie: '/home/ticket/convertTicket'
	}
}

export {apiAddress}