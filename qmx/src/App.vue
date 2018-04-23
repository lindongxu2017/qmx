<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  	name: 'app',
  	data () {
  		return {
  			// 微信参数
            wx:{
              type:1
            }
  		}
  	},
  	mounted(){
  		
  		if(myFn.GetQueryString('code') != undefined && myFn.GetQueryString('code') != ''){
            this.wx.code = myFn.GetQueryString('code');
            this.wx.scope = myFn.GetQueryString('scope');
        }

        var self = this;

        myFn.ajax('get', this.wx, apiAddress.wx.login,function(res){

            var data = {
                back_url:'http://delivery.qinhantangtop.com',
            }

            if(res.code == 99996){
                data.scope = 'snsapi_base';
                location.href = 'http://' + location.host + '/public' + apiAddress.wx.getCode +'?back_url=' + escape(location.href) + '&scope=' + data.scope + '&other=' + escape('/#' + self.$route.path);
            }else if(res.code == 99995){
                data.scope = 'snsapi_userinfo';
                location.href = 'http://' + location.host + '/public' + apiAddress.wx.getCode +'?back_url=' + escape(location.href) + '&scope=' + data.scope + '&other=' + escape('/#' + self.$route.path);
            }

            if(res.code == 200){
                if (res.data.type == 1) {
                  // self.$router.push({name:'todayTask'});
                } else {
                  // self.$router.push({name:'register'});
                }
            }
            // 

            if(res.code != 99996 && res.code != 99995){
              localStorage.userInfo = JSON.stringify(res.data);
            }
        })
  	}
}
</script>

