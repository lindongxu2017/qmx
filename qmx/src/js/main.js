
var myFn = {
	ajax: function( type, data, url, sucFn){

		sucFn = sucFn || function(){};

		var self = this;
		$.ajax({
			url: '/public' + url,
			type: type,
			data: data,
			cache: true,
			timeout:30000,    //超时时间
		    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
		    success: function(res, textStatus, XMLHttpRequest){
		    	if(res.code == 200){
		    		sucFn(res);
		    	}else if(res.code == 99997){
		    		if(window.vm.$route.path != '/search'){
		    			localStorage.clear();
			    		window.vm.$router.push('/');
		    		}else{
		    			localStorage.userInfo = JSON.stringify(res.data);
		    		}
		    	}else if(res.code == 99996 || res.code == 99995){
		    		sucFn(res);
		    	}else if(res.code == 99992){
		    		window.vm.$router.push('/audit');
		    	}else if(res.code == 99998) {
		    		window.vm.$router.push('/');
		    	}else{
		    		alert(res.msg);
		    	}
		    },
		    error:function(){
		    	// alert('网络错误');
		    }	
		});
	},
	// 获取公司列表保存到缓存中
	// obj对象，key需要赋值的键
	getCompanyList:function(obj, key){
		if(localStorage.getCompanyList == undefined){
			this.ajax('get', {},apiAddress.company.list ,function(res){
				obj[key] = res.data;
				localStorage.getCompanyList = JSON.stringify(res.data);
			})
		}else{
			obj[key] = JSON.parse(localStorage.getCompanyList);
		}
	},

	// 获取配送站列表保存到缓存中
	// obj对象，key需要赋值的键
	getOrderTypeList:function(obj, key){

		if(localStorage.orderTypeList == undefined){
			this.ajax('get', {},apiAddress.order.type ,function(res){
				obj[key] = res.data;
				localStorage.orderTypeList = JSON.stringify(res.data);
			})
		}else{
			obj[key] = JSON.parse(localStorage.orderTypeList);
		}
	},

	// 获取订单类型列表保存到缓存中
	// obj对象，key需要赋值的键
	getStationList:function(obj, key){

		if(localStorage.orderTypeList == undefined){
			this.ajax('get', {},apiAddress.station.list ,function(res){
				obj[key] = res.data;
				localStorage.orderTypeList = JSON.stringify(res.data);
			})
		}else{
			obj[key] = JSON.parse(localStorage.orderTypeList);
		}
	},
	setUserInfo: function(key, value){
		var userInfo = JSON.parse(localStorage.userInfo);
		userInfo[key] = value;
		localStorage.userInfo = JSON.stringify(userInfo);
		return userInfo;
	},
	getUserInfo: function(key){
		var userInfo = JSON.parse(localStorage.userInfo);
		return userInfo[key]
	},
	// 获取get参数
	GetQueryString: function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
}

var apiAddress = {
	login: {
		// 注册
		register: '/home/user/register'
	},
	task:{
		// 今日订单
		todayTask: '/home/order/getList',
		// 订单详情
		details: '/home/order/getDetail',
		// 修改订单状态
		updateStatus: '/home/order/updateStatus',
		// 订单未阅读反馈数量
		noReadCount: '/home/orderFeedback/getNotReadCount'
	},
	wx:{
		// 微信授权
		getCode: '/home/user/getCode',
		// 微信登录
		login:'/home/user/wxLogin'
	},
	company:{
		// 公司列表
		list: '/home/company/getAllList'
	},
	phone:{
		code: '/sendSms'
	},
	station:{
		list:'/station/allList'
	},
	queryOrder:{
		feddBack: '/home/orderFeedback/add'
	},
	//待发卷订单列表
	orderList:{
		dfList: '/home/user/waitSendVolumeList',
		sendVolume: '/home/user/sendVolume'
	}

}

export {myFn, apiAddress}