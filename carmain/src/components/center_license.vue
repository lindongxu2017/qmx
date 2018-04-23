<template>
	<div class="license">
		<div class="content public-bg-white">

            <div class="card" v-for="item in list" @click="licenseEdit(item.id,item.license_plate)">
                <div class="card-content">
                    <div class="card-content-inner">
                        <p v-html="item.license_plate"></p>
                    </div>
                </div>
            </div>

            <p><router-link to="licenseEdit" class="button button-big button-round btn-custom" style="margin-top: 100px;">添加车牌</router-link></p>
        </div>
	</div>
</template>

<script>
	export default{
		name:'license',
		data(){
			return{
				list:[]
			}
		},
		mounted(){
			this.getLicenseList();
		},
		methods:{
			getLicenseList:function(){
				var self = this;
				myFn.ajax('get',{},apiAddress.userInfo.licenseList,function(res){
					self.list = res.data;
				})
			},
			licenseEdit:function(id,num){
                this.$router.push({name:'licenseEdit',query:{id:id,num:num}});
            }
		}
	}
</script>

<style scoped>
	.card{
        margin: .7rem;
        /* box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.3); */
        background-image: url(../assets/images/license.png);
        background-size: contain;
        background-repeat: no-repeat;
        min-height: 100px;
        border-radius: 4px;
        color: #fff;
    }
    .card .card-content-inner p{
        text-align: center;
        font-size: 28px;
        margin-top: 25px;
    }
</style>