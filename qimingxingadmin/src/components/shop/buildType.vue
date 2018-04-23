<template>
	<div class="buildType">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="icon icon-location"></span>
	                            <span class="public-page-name">商家类型</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
		           <!-- table-content -->
	                <div class="content-wrap">
	                    <div class="row">

	                        <div class="col-sm-12">

	                            <div class="nest" id="FootableClose">
	                                <!-- <div class="title-alt">
	                                    <h6>权限管理</h6>
	                                </div> -->

	                                <div class="body-nest" id="Footable">
	                                    <div class="row" style="margin-bottom:20px">    
	                                        <div class="col-md-10 col-sm-10"></div>
	                                        <div class="col-md-2 col-sm-2" style="text-align:right">
	                                            <router-link to="shop_buildType_add">
	                                            	<button type="button" class="btn btn-info">
	                                            		<span class="entypo-plus"></span>&nbsp;添加类型
	                                            	</button>
	                                            </router-link>
	                                        </div>
	                                    </div>
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th class="public-table-serialNumber">
	                                                    序号
	                                                </th>
	                                                <th style="width: 120px;">
	                                                	图标
	                                                </th>
	                                                <th>
	                                                    名称
	                                                </th>
	                                                <th>
	                                                	操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in dataList">
	                                                <td v-html="index+((current-1)*10)+1"></td>
	                                                <td style="text-align: center;">
	                                                	<img class="shopicon" :src="item.icon" />
	                                                </td>
	                                                <td v-html="item.name" style="text-align: center;"></td>
	                                                <td style="width: 200px;text-align: center;">
	                                                    <button type="button" class="btn btn-primary" @click="edit(item.id)">
	                                                    	<span class="fontawesome-edit"></span>&nbsp;编辑
	                                                    </button>
	                                                    <button type="button" class="btn btn-danger" @click="del(item.id, index)">
	                                                    	<span class="entypo-cancel"></span>&nbsp;删除
	                                                    </button>
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
	name: 'buildType',
		data () {
			return {
				current:1,
				dataList:{}
			}
		},
		mounted (){
            // 获取数据
            this.getData();
        },
        methods: {

        	edit: function(id){
        		this.$router.push({name:'shop_buildType_add', query:{id:id}});
        	},

        	del: function(id, index){
        		var self = this;
        		if(confirm('确定要删除当前分类')){
	        		myFn.ajax('post', {id:id}, apiAddress.shop.delType, function(res){
		        		self.dataList.splice(index, 1);
		            });
        		}
        	},

        	getData: function(index){
        		var self = this;
	            myFn.ajax('get', {page:index}, apiAddress.shop.typeList, function(res){
	                self.dataList = res.data;
	            });
        	}
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.shopicon {
		width: 70px;
		height: 70px;
	}
</style>
