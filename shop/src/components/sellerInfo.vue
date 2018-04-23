<template>
	<div class="sellerApply">
		<!-- 这里是页面内容区 -->
        <div class="content public-bg-white">
			<div class="form public-bg-white">
				<img class="shopImg" :src="personInfo.image"  id="imgshop"/>	<!-- @click="openFileImg" -->
				<!-- <input type="file" id="imgInput" @change="toggleImg"> -->
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">服务城市</label>
	                    <input class="form-control" type="text" readonly v-model="personInfo.city_name">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">类型</label>
	                    <input class="form-control" type="text" readonly v-model="personInfo.name">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">商家名称</label>
	                    <input class="form-control" type="text" readonly v-model="personInfo.shopname">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">服务项目完善</label>
	                    <input class="form-control" type="text" readonly v-model="personInfo.service_project">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">联系电话</label>
	                    <input class="form-control" type="text" readonly v-model="personInfo.mobile">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="form-content">
	                    <label class="form-label">地址</label>
	                    <input class="form-control" type="text" readonly v-model="personInfo.addr">
	                </div>
	            </div>
	        </div>
	    </div>    
	</div>
</template>

<script>
	export default{
		name:'sellerApply',
		data(){
			return{
				//商家信息
				personInfo:{

				}
			}
		},
		mounted () {

			//从缓存获取商家信息
				
			if (!localStorage.info) return false;

			this.personInfo = JSON.parse(localStorage.info);
			
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
		width: 150px;
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