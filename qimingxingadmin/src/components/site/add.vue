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
                                <span style="font-weight:bold;color:#666;" v-show="id == ''">添加站点信息</span>
                                <span style="font-weight:bold;color:#666;" v-show="id != ''">编辑站点信息</span>
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
                                            <label class="col-sm-2 control-label">站点名称</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">登录账号</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="username" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">登录密码</label>
                                            <div class="col-sm-3">
                                                <input type="password" class="form-control" style="color:#333" v-model="password">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">重复登录密码</label>
                                            <div class="col-sm-3">
                                                <input type="password" class="form-control" style="color:#333" v-model="repeatPassword">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">联系人</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="linkman">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">联系电话</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="mobile">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">城市</label>
                                            <div class="col-sm-1">
                                                <select class="form-control" v-model="selectCity.provinces" @change="changeProvinces(selectCity.provinces)">
                                                    <option v-for="item in citys.provinces" :value="item.region_id">{{item.region_name}}</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-1" v-show="citys.city != []">
                                                <select class="form-control" v-model="selectCity.city" @change="changeCity(selectCity.city)">
                                                    <option v-for="item in citys.city" :value="item.region_id">{{item.region_name}}</option>
                                                </select>
                                            </div>

                                            <div class="col-sm-1" v-show="citys.region != []">
                                                <select class="form-control" v-model="selectCity.region">
                                                    <option v-for="item in citys.region" :value="item.region_id">{{item.region_name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">详细地址</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="addr">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">其他备注信息</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="remark">
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="setSite">保存</button>
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
	name: 'jurisdiction',
		data () {
			return {
                name:'',
                username:'',
                password:'',
                repeatPassword:'',
                linkman:'',
                mobile:'',
                regid:'',
                addr:'',
                remark:'',
                id:'',
                citys:{
                    provinces:[],
                    city:[],
                    region:[]
                },
                selectCity:{
                    provinces:2,
                    city:2,
                    region:52
                },
                adminCity:{
                    provinces:'',
                    city:'',
                    region:'',
                    cityLength:3
                }
			}
		},
        mounted (){


            var self = this;

            // 获取系统分配名称
            myFn.ajax('get', {}, apiAddress.site.getSiteName, function(res){
                self.username = res.data.code;
            });


            if(self.$route.params.id != undefined){
                self.id = self.$route.params.id;
                myFn.ajax('get', {id: self.id}, apiAddress.site.siteDetail, function(res){
                    self.name = res.data.dis_name;
                    self.username = res.data.username;
                    self.linkman = res.data.linkman;
                    self.mobile = res.data.mobile;
                    self.addr = res.data.dis_addr;
                    self.remark = res.data.remark;

                    self.adminCity.provinces = res.data.region[1].region_id;

                    if(res.data.region[2] != undefined){
                        self.adminCity.city = res.data.region[2].region_id;
                    }

                    if(res.data.region[3] != undefined){
                        self.adminCity.region = res.data.region[3].region_id;
                    }

                    myFn.ajax('post', {region_id: 1}, apiAddress.site.city, function(res){
                        self.citys.provinces = res.data;
                        self.selectCity.provinces = self.adminCity.provinces;
                        self.changeProvinces(self.selectCity.provinces);
                    });
                });
            }else{
                myFn.ajax('post', {region_id: 1}, apiAddress.site.city, function(res){
                    self.citys.provinces = res.data;
                    self.changeProvinces(self.selectCity.provinces);
                });
            }


        },
        methods: {

            changeProvinces: function(CityId){
                var self = this;
                myFn.ajax('post', {region_id: CityId}, apiAddress.site.city, function(res){
                    self.selectCity.city = res.data[0].region_id;
                    self.citys.city = res.data;

                    if(self.adminCity.city != '' && self.adminCity.city != undefined){
                        self.selectCity.city = self.adminCity.city;
                        self.adminCity.city = '';
                    }
                    self.changeCity(self.selectCity.city);
                });
            },
            changeCity: function(CityId){
                var self = this;
                myFn.ajax('post', {region_id: CityId}, apiAddress.site.city, function(res){
                    self.selectCity.region = res.data[0].region_id;
                    self.citys.region = res.data;
                    if(self.adminCity.region != '' && self.adminCity.region != undefined){
                        self.selectCity.region = self.adminCity.region;
                        self.adminCity.region = '';
                    }
                });
            },

            setSite: function(){

                var self = this;
                if(self.password != self.repeatPassword){
                    alert("两次输入密码不相同");
                    return false;
                }

                var data = {
                    name: this.name,
                    username: this.username,
                    password: this.password,
                    repassword: this.repeatPassword,
                    linkman: this.linkman,
                    mobile: this.mobile,
                    regid: this.selectCity.region,
                    addr: this.addr,
                    remark: this.remark,
                    id:this.id
                }

                myFn.ajax('post', data, apiAddress.site.siteAdd, function(res){
                    alert('保存成功');
                    self.$router.push({path:'/index/site'});
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
