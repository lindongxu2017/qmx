
var myFn = {
	
	// PUBLIC_PATH: '/public',
	PUBLIC_PATH: '/public',

	ajax: function( type, data, url, sucFn){

		sucFn = sucFn || function(){};
		var self = this;
		$.ajax({
			url: this.PUBLIC_PATH + url,
			type: type,
			data: data,
			cache: true,
			timeout:30000,    //超时时间
		    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
		    success: function(res, textStatus, XMLHttpRequest){
		    	window.myFn.statusCode(res, sucFn);
		    },
		    error:function(){
		    	alert('网络错误');
		    }	
		});
	},
	// 文件上传
	uploadFile: function ( data, url, fn){
		$.ajax({
	        type: 'POST',
	        url: this.PUBLIC_PATH + url,
	        data: data,
	        dataType: 'json',
	        async:false,
	        contentType: false,
	        processData:false,
	        success: function(res) {
	        	window.myFn.statusCode(res, fn);
	        }
	    });
	},
	// 服务器返回状态
	statusCode: function (res, sucFn) {
		switch (parseInt(res.code)) {
			case 200: 
				sucFn(res); 
				break;
			case 10000:
				alert(res.msg);
				break;
			case 99992:
				window.vm.$router.push({path:'/statusPage', query:{type:3}});
				break;
			case 99993:
				// 跳转到已有身份页面
				window.vm.$router.push({path:'/statusPage', query:{type:4}});
				break;
			case 99995:
				// 高级授权
				this.getWxCode('snsapi_userinfo');
                break;
			case 99996:
				// 普通授权
				this.getWxCode('snsapi_base');
				break;
			case 99997:
				// 未注册
				window.vm.$router.push('/sellerApply');
				break;
			case 99999:
				// 已授权未登录调取登录
				window.myFn.ajax('get', {}, window.apiAddress.wx.login,function(){
					location.reload();
				});
				break;
			default:
				alert(res.msg); 
				break;
		}
	},
	// 获取wxCode
	getWxCode: function (type) {
		// location.href = 'http://' + location.hostname + ':8090/public' + window.apiAddress.wx.getCode +'?back_url=' + escape(location.href) + '&scope=' + type +'&other=' + escape(location.hash);
		location.href = 'http://' + location.hostname + '/public' + window.apiAddress.wx.getCode +'?back_url=' + escape(location.href) + '&scope=' + type +'&other=' + escape(location.hash);
	},
	// 获取get参数
	GetQueryString: function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
}
export {myFn}