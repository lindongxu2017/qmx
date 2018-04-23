
var myFn = {
	ajax: function( type, data, url, sucFn){

		sucFn = sucFn || function(){};

		var self = this;
		$.ajax({
			url: '/public' + url,
			type: type,
			data: data,
			cache: true,
			timeout:5000,    //超时时间
		    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
		    success: function(res, textStatus, XMLHttpRequest){
		    	if(res.code == 200){
		    		sucFn(res);
		    	}else if(res.code == 99999){
		    		window.vm.$router.push('/')
		    	}else{
		    		alert(res.msg);
		    	}
		    },
		    error:function(){

		    }
		})
	},
	uploadFile:function(data, url, sucFn, pgVal){
		var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
        	if (evt.lengthComputable) {
              pgVal.progressLength = Math.round(evt.loaded * 100 / evt.total);
            }
        }, false);
        xhr.addEventListener("load", function(evt, res) {
        	var data = JSON.parse(evt.target.response);
        	if(data.code != 200) {
        		alert(data.msg);
        	}else{
	        	sucFn(data);
        	}
        }, false);
        xhr.onreadystatechange = function(res){
        }
        // xhr.addEventListener("error", uploadFailed, false);
        // xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", '/public' + url);//修改成自己的接口
        xhr.send(data);
	},
	// 获取订单类型列表保存到缓存中
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
	// 获取订单状态列表保存到缓存中
	// obj对象，key需要赋值的键
	getOrderStatusList:function(obj, key){

		if(localStorage.orderStatusList == undefined){
			this.ajax('get', {},apiAddress.order.state ,function(res){
				obj[key] = res.data;
				localStorage.orderStatusList = JSON.stringify(res.data);
			})
		}else{
			obj[key] = JSON.parse(localStorage.orderStatusList);
		}
	},
	getUserInfo: function(key){
		var userinfo = JSON.parse(localStorage.userInfo);
		return userinfo[key]
	}
}


export {myFn}