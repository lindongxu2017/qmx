<template>
	<div class="sellerApply">
		<!-- 这里是页面内容区 -->
        <div class="content public-bg-white">
			<div class="form public-bg-white">
				<img class="shopImg" src="../assets/icon/uploadImg.png" @click="openFileImg" id="imgshop"/>
				<input type="file" id="imgInput" @change="toggleImg">
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">请选择服务城市</label>
	                    <input type="text" id='city-picker' />
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">类型</label>
	                    <select v-model="shopType">
	                    	<option :value="item.id" v-for="item in shopTypeList" v-html="item.name"></option>
	                    </select>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">商家名称</label>
	                    <input class="form-control" type="text" placeholder="请输入商家名称" v-model="sellerApply.name">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">服务项目完善</label>
	                    <input class="form-control" type="text" placeholder="请输入服务项目" v-model="sellerApply.service">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">联系电话</label>
	                    <input class="form-control" type="text" placeholder="请输入联系电话" v-model="sellerApply.phone">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">地址</label>
	                    <input class="form-control" type="text" placeholder="请输入联系电话" v-model="sellerApply.address">
	                </div>
	            </div>
	        </div>
	        <p><a @click="submit" class="button button-big button-round btn-custom" style="margin-top: 30px;margin-bottom:30px;">提交</a></p>
	    </div>    
	</div>
</template>

<script>
	export default{
		name:'sellerApply',
		data(){
			return{
				sellerApply:{
					name:'',
					service:'',
					phone:'',
					address:''
				},
				shopTypeList:'',
				shopType:'',
			}
		},
		mounted () {

			$("#city-picker").cityPicker({
			    toolbarTemplate: '<header class="bar bar-nav">\
			    <button class="button button-link pull-right close-picker">确定</button>\
			    <h1 class="title">选择收货地址</h1>\
			    </header>'
			});
  
			var self = this;

			myFn.ajax('get', {}, apiAddress.shop.alllist, function(res) {
				self.shopTypeList = res.data;
			});

		},
		methods: {
			openFileImg: function() {
				$("#imgInput").click();
			},
			toggleImg: function() {
				var file = document.getElementById('imgInput');
				$("#imgshop").attr('src', window.URL.createObjectURL(file.files[0]));
			},
			submit: function() {
				var city = $('#city-picker').val().split(' ');
				var formData = new FormData();
				// 城市
				formData.append('city_name', city[1]);
				// 省
				formData.append('province_name', city[0]);
				formData.append('cate_id', this.shopType);
				formData.append('shopname', this.sellerApply.name);
				formData.append('mobile', this.sellerApply.phone);
				formData.append('addr', this.sellerApply.address);
				formData.append('service_project', this.sellerApply.service);
				formData.append('image', document.getElementById('imgInput').files[0]);

				var self = this;
				myFn.uploadFile(formData, apiAddress.shop.shopApply, function(res){
					self.$router.push({path:'/statusPage',query:{type:3}});
				});
			}
		}
	}
</script>

<style scoped>
	select {
		width: 100%;
		border:none;
	}
	#city-picker {
		width: 100%;
		margin-top: 5px;
		margin-bottom: 7px;
		border:none;
	}
	input[type=file] {
		display: none;
	}
	.shopImg {
		width: 100px;
		margin-left: 15px;
	}
	.form{
        padding-top: 15px;
        padding-bottom: 30px;
    }
    .form-group{
        padding: 15px;
        padding-bottom: 0
    }
    .form-group .form-content{
        border-bottom: 1px solid #eee;
    }
    .form-group .form-content .form-label{
        display: block;
        padding-bottom: 5px;
        color: #000;
    }
    .form-group .form-content .form-control{
        height: 35px;
        width: 100%;
        border: 0;
        font-size: 16px;
        color: #808080;
        line-height: 35px;
        padding-left: 0px;
    }
    .form-group .form-content .form-select{
    	width: 100%;
    	height: 35px;
    	border: 0;
    	font-size: 16px;
    }
</style>