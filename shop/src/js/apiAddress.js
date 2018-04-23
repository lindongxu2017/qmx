var apiAddress = {
	login: {
		register: '/home/shop/ownerApply'
	},
	userInfo: {
		getUserInfo: '/home/owner/getSlefInfo',
		setUserInfo: '/home/owner/updateSelfInfo',
		delLicense: '/home/owner/delLicense'
	},
	shop: {
		shopApply: '/home/shop/ShopApply',
		alllist: '/shopcate/allList',
		myShopInfo: '/home/shop/MyShopInfo'
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
		banklist: '/home/userbank/getList',
		getBank: '/home/userbank/getBankCardInfo',
		setBank: '/home/userbank/addBankCard',
		delbank: '/home/userbank/delBankCard'
	},
	wx: {
		login:'/home/user/wxLogin',
		// 微信授权获取Code
		getCode: '/home/user/getCode',
	}
}

export {apiAddress}