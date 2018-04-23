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
	                            <span class="fontawesome-user-md"></span>
	                            <span class="public-page-name">角色管理</span>
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
                                            <router-link to="jurisdictionAdd"><button type="button" class="btn btn-info"><span class="entypo-plus"></span>&nbsp;&nbsp;添加角色</button></router-link>
                                        </div>
                                    </div>
                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">
                                                        序号
                                                </th>
                                                <th>
                                                    角色名称
                                                </th>
                                                
                                                <th> <!-- style="text-align:right" -->
                                                    操作
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in rolelist">
                                                <td v-html="index+((current-1)*10)+1" class="public-table-serialNumber"></td>
                                                <td>{{item.role_name}}</td>
                                                <td style="width: 200px;text-align: center;">
                                                    <button v-if="jurisdiction.show_addAddEditButton" type="button" class="btn btn-primary" @click="edit(item.id)"><span class="fontawesome-edit"></span>编辑</button>
                                                    <button v-if="jurisdiction.show_delButton" type="button" class="btn btn-danger" @click="jurisdictionDel(item.id, index)"><span class="entypo-cancel-squared"></span>删除</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

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
export default {
	name: 'admin',
		data () {
			return {
                current:'1',
				rolelist:[],
                jurisdiction: {
                    show_addAddEditButton:'',
                    show_delButton:''
                }
			}
		},
		mounted(){

            // 权限控制
            this.jurisdiction.show_addAddEditButton = myFn.getLocalStorageVal('jurisdiction', 16) ? true : false;
            this.jurisdiction.show_delButton = myFn.getLocalStorageVal('jurisdiction', 17) ? true : false;

			var self = this;
			myFn.ajax('get', {}, apiAddress.admin.rolelist, function(res){
                self.rolelist = res.data;
            });
		},
		methods: {
			edit: function(id){
				this.$router.push({name:'jurisdictionAdd', params:{id:id}});
			},
            jurisdictionDel: function(id, index){
                var self = this;
                if(confirm('确定要删除当前角色吗')){
                    myFn.ajax('get', {role_id:id}, apiAddress.admin.roleDel, function(res){
                        self.rolelist.splice(index, 1);
                    });
                }
            }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
