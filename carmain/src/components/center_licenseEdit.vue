<template>
	<div class="licenseEdit">
		<!-- 这里是页面内容区 -->
        <div class="content">
            <div class="form public-bg-white">
                <div class="form-group">
                    <div class="form-content">
                        <label class="form-label">车牌号</label>
                        <input class="form-control" type="text" placeholder="请输入车牌号码" v-model="license">
                    </div>
                </div>
            </div>
            <p v-if="edit_id"><a class="button button-big button-round btn-custom" style="margin-top: 130px;" @click="edit_license()">保存</a></p>
            <p v-if="!edit_id"><a class="button button-big button-round btn-custom" style="margin-top: 130px;" @click="add_license()">保存</a></p>
            <p v-if="edit_id"><a class="button button-big button-round btn-custom" style="margin-top: 20px;" @click="del_license()">删除车牌</a></p>
        </div>
	</div>
</template>

<script>
	export default{
		name:'licenseEdit',
		data(){
			return{
				license:'',
				edit_id:'',
				license_plate:''
			}
		},
		mounted(){
			this.edit_id = this.$route.query.id;
			this.license_plate = this.$route.query.num;
			this.license = this.license_plate;

		},
		methods:{
			edit_license:function(){
				var self = this;
				myFn.ajax('post',{id:this.edit_id,license:this.license},apiAddress.userInfo.addLicense,function(res){
					if (res.code == 200) {
						alert(res.data);
						self.$router.push({name:'license'})
					};
				})
			},
			add_license:function(){
				var self = this;
				myFn.ajax('post',{license:self.license},apiAddress.userInfo.addLicense,function(res){
					if (res.code == 200) {
						alert(res.data);
						self.$router.push({name:'license'})
					};
				})
			},
			del_license:function(id){
				var self = this;
				myFn.ajax('post',{id:this.edit_id},apiAddress.userInfo.delLicense,function(res){
					if (res.code == 200) {
						alert(res.data);
						self.$router.push({name:'license'})
					};
				})
			}
		}
	}
</script>

<style scoped>
	.form{
        padding-top: 15px;
        padding-bottom: 30px;
    }
    .form-group{
        padding: 15px;
        padding-bottom: 0
    }
    .form-group .form-content{
        padding-bottom: 15px;
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
        line-height: 35px;
    }
</style>