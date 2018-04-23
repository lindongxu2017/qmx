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
	                            <span class="fontawesome-wrench"></span>
                                <span style="font-weight:bold;color:#666;" v-show="id == ''">添加角色</span>
                                <span style="font-weight:bold;color:#666;" v-show="id != ''">编辑角色</span>
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
                                            <label class="col-sm-1 control-label">角色</label>
                                            <div class="col-sm-3">
                                                <input type="text" v-model="jurisdictionName" class="form-control" style="color:#333" placeholder="请输入角色名称">
                                            </div>
                                            <!-- <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option>经理</option>
                                                    <option>主管</option>
                                                    <option>组长</option>
                                                </select>
                                            </div> -->
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">权限</label>
                                            <div class="col-sm-11" style="border-radius:4px;font-size:15px;line-height: 13px;">
                                                <div class="checkbox" style="margin-bottom: 10px;display: inline-block; width: 170px;">
                                                    <label for="#wholeSelect" style="vertical-align: sub;">全选</label>
                                                    <input id="#wholeSelect" type="checkbox" v-model="wholeSelect">
                                                </div>
                                            </div>
                                            <div class="col-sm-1 control-label"></div>
                                            <div class="col-sm-11" style="border-radius:4px;min-height:300px;font-size:15px;line-height: 13px;">
                                                <div class="checkbox" v-for=" item in jurisdictionList" style="margin-bottom: 10px;display: inline-block; width: 170px;">
                                                    <label :for="item.id" style="vertical-align: sub;" v-html="item.pri_name">权限1</label>
                                                    <input :id="item.id" type="checkbox" name="" v-model="jurisdictionCheck"  :value="item.id" :checked="wholeSelect">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-1 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="setJurisdiction">保存</button>
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
                jurisdictionList:[],
                jurisdictionCheck:[],
                jurisdictionName:'',
                id:'',
                wholeSelect: false
			}
		},
        watch: {
            // 监听全选变化
            wholeSelect(curVal, oldVal) {
                if(!oldVal){
                    for(var i in this.jurisdictionList){
                        this.jurisdictionCheck.push(this.jurisdictionList[i].id);
                    }
                }else{
                    this.jurisdictionCheck = [];
                }
            }
        },
        mounted (){

            var self = this;
            myFn.ajax('get', {}, apiAddress.jurisdiction.list, function(res){

                self.jurisdictionList = res.data;

                // 如果有id代表编辑角色
                if(self.$route.params.id != undefined){
                    self.id = self.$route.params.id;
                    myFn.ajax('get', {role_id:self.id}, apiAddress.admin.roleDetail, function(res){
                        self.jurisdictionName = res.data.roleInfo.role_name;
                        for(var i in res.data.rolePri){
                            self.jurisdictionCheck.push(res.data.rolePri[i].pri_id);
                        }
                    });
                }

            });

        },
        methods: {

            setJurisdiction: function(){

                var data = {
                    role_name: this.jurisdictionName,
                    pri_ids: this.jurisdictionCheck,
                    role_id:this.id
                }

                myFn.ajax('post', data, apiAddress.admin.setJurisdiction, function(res){
                    alert('保存成功');
                    self.$router.push({path:'/index/jurisdiction'});
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
