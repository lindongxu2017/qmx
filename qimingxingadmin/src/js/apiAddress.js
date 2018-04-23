var apiAddress = {
	login: {
		login: '/admin/adminLogin',
		is_login: '/admin/adminIsLogin',
		logout:'/admin/logout'
	},
	admin: {
		// 权限列表
		jurisdiction: '/admin/privilegeGetPriList',
		// 添加角色
		setJurisdiction:'/admin/roleAddOrEdit',
		// 编辑角色
		editJurisdiction:'/admin/roleEdit',
		// 角色详情
		roleDetail:'/admin/roleDetail',
		// 角色列表
		rolelist:'/admin/roleGetRoleList',
		// 角色删除
		roleDel:'/admin/roleDelete',
		// 添加管理员
		adminAdd:'/admin/adminAddOrEdit',
		// 管理员详情
		adminDetail:'/admin/adminDetail',
		// 管理员列表
		adminList:'/admin/adminShowList',
		// 删除管理员
		adminDel:'/admin/adminDelete',
	},
	site:{
		// 站点列表
		siteList: '/admin/getStationList',
		// 删除站点
		siteDel: '/admin/delStation',
		// 三级地区联动
		city: '/getArea',
		// 添加站点
		siteAdd: '/admin/addStation',
		// 站点详情
		siteDetail: '/admin/getStationDetail',
		// 获取系统分配的站点名称
		getSiteName: '/admin/getDisCode'
	},
	importOrder:{
		// 保险公司列表
		company:'/admin/insuranceCompany/getList',
		// 编辑添加保险公司
		companyAdd:'/admin/insuranceCompany/add',
		// 删除保险公司
		companyDel:'/admin/insuranceCompany/delete',
		// 保险公司详情
		companyDetail:'/admin/insuranceCompany/getDetail',
		// 查询保险公司
		companyQuery:'/admin/insuranceCompany/getDetail',
		// 上传配送订单
		uploadImport:'/admin/importOrder',
		// 订单列表
		orderList: '/admin/getOrderList',
		// 订单详情
		orderDetail:'/admin/getOrderDetail',
		orderMoreInfo:'/admin/order/changeAboutRecord',
		// 编辑添加订单
		orderEdit:'/admin/addOrder',
		// 删除订单
		orderDel:'/admin/deleteOrder',
		// 订单类型列表
		orderType: '/admin/getOrderType',
		// 订单状态列表
		orderStatus: '/admin/getOrderStatus',
		// 订单模板下载
		downOrder:'/admin/downOrderTemplate',
		// 保险员审核列表
		staffAudit:'/admin/userGetUserList',
		// 保险员审核
		examineInsurance:'/admin/userCheckUser',
		// 保险公司统计
		count:'/admin/order/count',
		//保险员列表
		underwriterList:'/admin/userGetUserList',
		//删除保险员
		underwriterDel:'/admin/userDelUser'
	},
	giftDeal:{
		gift:'/admin/gift/add',		//添加、编辑礼品
		giftList:'/admin/gift/giftList',
		giftDel:'/admin/gift/deleteGift',
		giftDetails:'/admin/gift/detail'
	},
	jurisdiction: {
		// 权限列表
		list:'/admin/privilegeGetPriList',
		// 管理员拥有权限
		myList: '/admin/admin/getPriv'
	},
	wx:{
		// 微信参数设置
		parameter: '/admin/system/setAppidorAppsecret',
		// 获取参数列表
		getParameter: '/admin/system/getWeixin'
	},

	// 车主
	vehicleMaster: {
		list: '/admin/owner/getList'
	},

	// 提现
	Withdrawals: {
		// 提现列表
		withdrawalsList: '/admin/withdraw/getList',
		// 提现申请
		isExamine: '/admin/withdraw/audit'
	},

	// 服务卷
	volume: {
		// 设置比例
		setProportion: '/admin/system/updateVolumeConvertRatio',
		// 获取比例
		getParameter: '/admin/system/getVolumeConvertRatio',
		// 已送出/未送出服务卷
		send: '/admin/order/getVolumeSendOrder'
	},

	// 兑换券
	didi: {
		// 添加滴滴券类型
		add: '/admin/ticket/addType',
		// 滴滴券类型列表
		volumelist: '/admin/ticket/getType',
		// 滴滴券详情
		volumeinfo: '/admin/ticket/typeInfo',
		// 删除滴滴券类型
		del: '/admin/ticket/delType',
		// 激活码列表
		codelist: '/admin/ticket/convertTicketList',
		// 激活码详情
		codeinfo: '/admin/ticket/convertTicketInfo',
		// 添加激活码
		codeadd: '/admin/ticket/addConvertTicket',
		// 删除激活码
		codedel: '/admin/ticket/delConvertTicket',
		// 用户滴滴券列表
		uservolumelist: '/admin/ticket/userTicketList'
	},

	// 商家
	shop: {
		// 商家审核列表,包括已通过,未通过,审核中
		applyList: '/admin/shop/shopAuditList',
		// 审核申请
		isExamine: '/admin/shop/shopAuditPass',
		// 分类列表
		typeList: '/shopcate/allList',
		// 删除分类
		delType: '/admin/shop/deleteShopCate',
		// 添加/编辑分类
		editOrAddType: '/admin/shop/addShopCate',
		// 获取指定分类内容
		getTypeVal: '/admin/shop/shopCateInfo'
	}
}

export {apiAddress}