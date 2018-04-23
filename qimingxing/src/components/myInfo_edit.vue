<template>
	<div class="myInfoEdit">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-list-alt"></span>
                                <span style="font-weight:bold;color:#666;">配送站信息</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
				   <!-- table-content -->
                <div class="content-wrap" style="margin-top:10px;">
                    <div class="row">

                        <div class="col-sm-12">

                            <div class="nest" id="FootableClose">

                                <div class="body-nest">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">联系人姓名</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" required placeholder="请输入联系人姓名" v-model="concatName">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">联系人电话</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" required placeholder="请输入联系人电话" v-model="concatMobile">
                                            </div>
                                        </div>
                                         <div class="form-group">
                                            <label class="col-sm-2 control-label">密码</label>
                                            <div class="col-sm-3">
                                                <input type="password" class="form-control" style="color:#333" required placeholder="请输入密码" v-model="password">
                                            </div>
                                        </div>
                                         <div class="form-group">
                                            <label class="col-sm-2 control-label">重复密码</label>
                                            <div class="col-sm-3">
                                                <input type="password" class="form-control" style="color:#333" required placeholder="请重复密码" v-model="rePassword">
                                            </div>
                                        </div>
                                        
                                         <div class="form-group">
                                            <label class="col-sm-2 control-label">所属城市</label>
                                            <div class="col-sm-1 selectInput">
                                                <select class="form-control" v-model="province.active"  @change="changProvince(province.active ,province.list)">
                                                    <option v-for="item in province.list" :value="item.id" >{{item.name}}</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-1 selectInput">
                                                <select class="form-control" v-model="municipal.active"  @change="changMunicipal(municipal.active ,municipal.list)">
                                                    <option v-for="item in municipal.list" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-1 selectInput">
                                                <select class="form-control" v-model="area.active">
                                                    <option v-for="item in area.list" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                         <div class="form-group">
                                            <label class="col-sm-2 control-label">详细地址</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" placeholder="请输入详细地址" v-model="adressIdDetails">
                                            </div>
                                            <p class="col-sm-1 prompt">(可以为空)</p>
                                        </div>
                                         <div class="form-group">
                                            <label class="col-sm-2 control-label">备注</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" placeholder="请输入备注" v-model="msg">
                                            </div>
                                            <p class="col-sm-1 prompt">(可以为空)</p>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
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
	name: 'myInfoEdit',
		data () {
			return {
                concatMobile:'',
                concatName:'',
                password:'',
                rePassword:'',
                adressId:'',
                adressIdDetails:'',
                msg:'',

                province:{
                    list:[],
                    active:9,
                },
                municipal:{
                    list:[],
                    active:'',
                },
                area:{
                    list:[],
                    active:'',
                }
			}
		},
        mounted (){
            var self = this;

            // 默认显示省市区列表取列表第一个
            this.province.list = window.citys;
            this.municipal.list = this.province.list[0].sub;
            this.area.list = this.municipal.list[0].sub;

            myFn.ajax('get', {}, apiAddress.site.getSiteInfo,function(res){
                self.concatName = res.data.linkman;
                self.concatMobile = res.data.mobile;
                self.adressIdDetails = res.data.dis_addr;
                self.msg = res.data.remark;

                self.province.active = res.data.region[1].region_id;
                self.changProvince(self.province.active, self.province.list);

                self.municipal.active = res.data.region[2].region_id;
                self.changMunicipal(self.municipal.active, self.municipal.list)

                self.area.active = res.data.region[3].region_id;

            });
        },
        methods: {
            submit:function(){
                
                var self = this;
                var data = {
                    mobile:self.concatMobile,
                    linkman:self.concatName,
                    password:self.password,
                    repassword:self.rePassword,
                    // regid:self.adressId,
                    addr:self.adressIdDetails,
                    remark:self.msg
                }

                if(self.area.active != undefined && self.area.active != ''){
                    data.regid = self.area.active;
                }else{
                    data.regid = self.municipal.active;
                }

                myFn.ajax('post',data,'/station/updateInfo',function(res){
                    alert('保存成功');
                });
            },
            changProvince: function(id, list){
                var index = this.getCityListIndex(id, list);

                this.municipal.list = this.province.list[index].sub;
                this.municipal.active = this.province.list[index].sub[0].id;
                this.changMunicipal(this.municipal.list[0].id, this.municipal.list );
            },
            changMunicipal: function(id, list){
                var index = this.getCityListIndex(id, list);
                
                this.area.list = this.municipal.list[index].sub;
                if(this.municipal.list[index].sub.length > 0){
                    this.area.active = this.municipal.list[index].sub[0].id;
                }else{
                    this.area.active = '';
                }
            },
            getCityListIndex: function(id, list){
                var index = 0;
                for( var i in list) {
                    if(list[i].id == id){
                        index = i;
                        return index;
                    }
                }
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .prompt{
        height:34px;
        line-height:34px;
        color: red;
    }
    .selectInput, .col-sm-3{
        padding-right: 0px;
    }
</style>
