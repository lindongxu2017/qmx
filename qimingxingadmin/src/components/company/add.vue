<template>
	<div class="companyAdd">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon-plus"></span>
                                <span style="font-weight:bold;color:#666;" v-show="id == ''">添加保险公司</span>
                                <span style="font-weight:bold;color:#666;" v-show="id != ''">编辑保险公司</span>
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
                                            <label class="col-sm-1 control-label">名称</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-1 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="setRole">保存</button>
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
	name: 'companyAdd',
		data () {
			return {
                id:'',
                name:''
			}
		},
        mounted (){
            var self = this;

            // 如果id不为空获取详情数据
            if(self.$route.params.id != undefined){
                self.id = self.$route.params.id;
                myFn.ajax('get', {id: self.id}, apiAddress.importOrder.companyDetail, function(res){
                    self.name = res.data.name;
                });
            }

        },
        methods: {

            setRole: function(){

                var self = this;

                if(this.password != this.repeatPassword){
                    alert('两次输入密码不相同');
                    return false;
                }

                var data = {
                    name: this.name,
                }

                if(self.id != ''){
                    data.id = self.id
                }

                myFn.ajax('post', data, apiAddress.importOrder.companyAdd, function(res){
                    alert('保存成功');
                    self.$router.push({path:'/index/companylist'});
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
