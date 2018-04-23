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
	                            <span class="fontawesome-user"></span>
	                            <span style="font-weight:bold;color:#666;">管理员管理</span>
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

	                                <div class="body-nest" id="Footable">
	                                    <div class="row" style="margin-bottom:20px">    
	                                        <div class="col-md-10 col-sm-10"></div>
	                                        <div class="col-md-2 col-sm-2" style="text-align:right" v-if="jurisdiction.show_addAddEditButton">
	                                            <router-link to="adminAdd"><button type="button" class="btn btn-info"><span class="entypo-plus"></span>&nbsp;&nbsp;添加用户</button></router-link>
	                                        </div>
	                                    </div>
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;">
	                                                    序号
	                                                </th>
	                                                <th>
	                                                    用户名
	                                                </th>
	                                                <th>
	                                                    角色
	                                                </th> 
	                                                <th>
	                                                    真实姓名
	                                                </th> 
	                                                <th>
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in role.data">
	                                            	<td v-html="index+((current-1)*10)+1" class="public-table-serialNumber"></td>
	                                                <td v-html="item.username"></td>
	                                                <td v-html="item.role_name"></td>
	                                                <td v-html="item.nickname"></td>
	                                                <td  style="width: 200px;text-align: center;">
	                                                    <button v-if="jurisdiction.show_addAddEditButton" type="button" class="btn btn-primary" @click="adminEdit(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button>
	                                                    <button v-if="jurisdiction.show_delButton" type="button" class="btn btn-danger" @click="adminDel(item.id, index)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;删除</button>
	                                                </td>
	                                            </tr>
	                                            
	                                        </tbody>
	                                    </table>

					                   <myel-page ref="page" :allpage="allpage" @togglePage="set_page"></myel-page>

	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <!-- /END table-content -->   
					
	        </div>
	    </div>
	</div>
</template>

<script>

import myelPage from "../tools/page" 

export default {
	name: 'admin',
		data () {
			return {
				role:{},
				current:1,
            	showItem:10,
            	allpage:1,
            	jurisdiction: {
            		show_addAddEditButton:'',
            		show_delButton:''
            	}
			}
		},
		mounted (){

			// 权限控制
            this.jurisdiction.show_addAddEditButton = myFn.getLocalStorageVal('jurisdiction', 11) ? true : false;
            this.jurisdiction.show_delButton = myFn.getLocalStorageVal('jurisdiction', 12) ? true : false;

            var self = this;
            // 获取第一页数据
            this.getData(1);
        },
        methods: {
        	adminEdit: function(id){
        		this.$router.push({name:'adminAdd', params:{id:id}});
        	},
        	adminDel: function(id, index){
        		var self = this;
        		if(confirm('确定要删除当前用户')){
	        		myFn.ajax('post', {admin_id:id}, apiAddress.admin.adminDel, function(res){
		        		self.role.data.splice(index, 1);
		            });
        		}
        	},
        	set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },
            getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', {page:index}, apiAddress.admin.adminList, function(res){
                    self.role = res.data;
    				self.allpage = res.data.last_page;
	            });
        	}

        },
        components: {
            myelPage
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
