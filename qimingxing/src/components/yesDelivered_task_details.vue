<template>
	<div class="yesDelivered_task_details">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-wrench"></span>
                                <span>配送员详情</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
				   <!-- table-content -->
                <div class="content-wrap" style="margin-top:10px;">
                    <div class="row">

                        <div class="col-sm-12">

                            <div class="nest" id="FootableClose">
                                <!-- <div class="title-alt">
                                    <h6>权限管理</h6>
                                </div> -->

                                <div class="body-nest">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">姓名</label>
                                            <div class="col-sm-3">
                                                <input type="text" v-model="name" class="form-control" style="color:#333" placeholder="请输入姓名">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">手机号</label>
                                            <div class="col-sm-3">
                                                <input type="text" v-model="mobile" class="form-control" style="color:#333" placeholder="请输入手机号">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-1 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="submit">保存</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'yesDelivered_task_details',
		data () {
			return {
                id:'',
                name:'',
                mobile:''
			}
		},
        mounted (){
            var self = this;
            self.id = self.$route.params.id;
            myFn.ajax('get', {user_id:self.id}, apiAddress.courier.courierDetail, function(res){
                self.name  = res.data.dm_name;
                self.mobile = res.data.dm_phone;
            });

        },
        methods: {

            submit: function(){
                var self = this;

                var data = {
                    user_id: self.id,
                    dm_name: self.name,
                    dm_phone:self.mobile
                }

                myFn.ajax('post', data, apiAddress.courier.userEditUser, function(res){
                    alert('保存成功');
                    self.$router.push({path:'/index/courierArchives'});
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
