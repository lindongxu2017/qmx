

var apiAddress = {
	login: {
		login: '/station/login',
		exitLogin:'/station/logout',
		is_login: '/station/isLogin'
	},
	courier: {
		examineList: '/station/userCheckingUserList',
		toExamine: '/station/userCheckUser',
		// 配送员列表
		courierArchivesList: '/station/userGetUserList',
		// 冻结配送员
		courierDel: '/station/userDeleteUser',
		// 调离配送员
		adjustment: '/station/userTransfer',
		// 配送员详情
		courierDetail: '/station/userDetail',
		// 修改配送员信息
		userEditUser: '/station/userEditUser',
		// 删除配送员
		del: '/station/userDelUser'
	},
	site: {
		// 站点列表
		siteList: '/station/getStationList',
		// 导入订单
		importOrder: '/station/importOrder',
		// 站点详情
		getSiteInfo:'/station/getInfo'
	},
	task: {
		// 今日配送任务 订单列表
		today: '/station/getOrderList'
	},
	order: {
		// 订单类型
		type:'/station/getOrderType',
		// 订单状态
		state:'/station/getOrderStatus',
		// 转运订单
		transfer: '/station/transferOrder',
		// 修改配送员
		modifyCourier:'/station/changeUserOrder',
		// 修改订单状态
		modifyState: '/station/order/updateStatus'
	},
	payType: {
		// 支付方式列表
		list: '/station/payment/getList'
	},
	fail: {
		list: '/station/getOrderFaildStatus'
	},

	// 服务卷
	volume: {
		// 已送出/未送出服务卷
		send: '/station/order/getVolumeSendOrder'
	},

}

export {apiAddress}