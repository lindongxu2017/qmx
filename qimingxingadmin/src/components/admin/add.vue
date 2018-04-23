<template>
	<div class="admin">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon-plus"></span>
                                <span style="font-weight:bold;color:#666;" v-show="id == ''">添加用户</span>
                                <span style="font-weight:bold;color:#666;" v-show="id != ''">编辑用户</span>
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
                                            <label class="col-sm-2 control-label">用户名</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="username">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">密码</label>
                                            <div class="col-sm-3">
                                                <input type="password" class="form-control" style="color:#333" v-model="password">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">重复密码</label>
                                            <div class="col-sm-3">
                                                <input type="password" class="form-control" style="color:#333" v-model="repeatPassword">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">真实姓名</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">角色</label>
                                            <div class="col-sm-3">
                                                <select class="form-control" v-model="selectRole">
                                                    <option v-for="item in jurisdictionList" :value="item.id">{{item.role_name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
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
	name: 'admin',
		data () {
			return {
                jurisdictionList:[],
                selectRole:1,
                password:'',
                repeatPassword:'',
                username:'',
                name:'',
                id:''
			}
		},
        mounted (){
            var self = this;

            myFn.ajax('get', {}, apiAddress.admin.rolelist, function(res){
                self.jurisdictionList = res.data;

                // 如果id不为空获取详情数据
                if(self.$route.params.id != undefined){
                    self.id = self.$route.params.id;
                    myFn.ajax('get', {admin_id: self.id}, apiAddress.admin.adminDetail, function(res){
                        // self.jurisdictionList = res.data;
                        self.username = res.data.username;
                        self.name = res.data.nickname;
                        self.selectRole = res.data.role_id;
                    });
                }
            });

        },
        methods: {

            setRole: function(){

                if(this.password != this.repeatPassword){
                    alert('两次输入密码不相同');
                    return false;
                }

                var data = {
                    username: this.username,
                    password: this.password,
                    nickname: this.name,
                    mobile: this.tell,
                    role_id: this.selectRole,
                    admin_id:this.id
                }

                myFn.ajax('post', data, apiAddress.admin.adminAdd, function(res){
                    alert('保存成功');
                    self.$router.push({path:'/index/admin'});
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
