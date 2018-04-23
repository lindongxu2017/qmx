<template>
	<div class="site">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="icon icon-location"></span>
	                            <span class="public-page-name">配送站点</span>
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
	                                            <router-link to="siteAdd"><button type="button" class="btn btn-info"><span class="entypo-plus"></span>&nbsp;&nbsp;添加站点</button></router-link>
	                                        </div>
	                                    </div>
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;">
	                                                    序号
	                                                </th>
	                                                <th style="width: 110px;">
	                                                    站点编码
	                                                </th>
	                                                <th style="width: 110px;">
	                                                    站点名称
	                                                </th> 
	                                                <th style="width: 100px;">
	                                                    联系人
	                                                </th> 
	                                                <th style="width: 140px;">
	                                                    联系电话
	                                                </th>
	                                                <th style="width: 100px;">
	                                                    覆盖地区
	                                                </th>
	                                                <th>
	                                                    详细地址
	                                                </th>
	                                                <th style="width:80px;">
	                                                    人数
	                                                </th>
	                                                <th v-if="jurisdiction.show_addAddEditButton || jurisdiction.show_delButton">
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in role.data">
	                                                <td v-html="index+((current-1)*10)+1"></td>
	                                                <td v-html="item.dis_code"></td>
	                                                <td v-html="item.dis_name"></td>
	                                                <td v-html="item.linkman"></td>
	                                                <td v-html="item.mobile"></td>
	                                                <td v-html="item.dis_cover_area"></td>
	                                                <td v-html="item.dis_addr"></td>
	                                                <td v-html="item.count"></td>
	                                                <td  style="width: 165px;text-align: left;" v-if="jurisdiction.show_addAddEditButton || jurisdiction.show_delButton">
	                                                    <button v-if="jurisdiction.show_addAddEditButton" type="button" class="btn btn-primary" @click="siteEdit(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button>
	                                                    <button v-if="jurisdiction.show_delButton" type="button" class="btn btn-danger" @click="siteDel(item.id, index)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;删除</button>
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
	name: 'site',
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
            this.jurisdiction.show_addAddEditButton = myFn.getLocalStorageVal('jurisdiction', 10) ? true : false;
            this.jurisdiction.show_delButton = myFn.getLocalStorageVal('jurisdiction', 35) ? true : false;

            // 获取第一页数据
            this.getData(1);
        },
        methods: {
        	siteEdit: function(id){
        		this.$router.push({name:'siteAdd', params:{id:id}});
        	},
        	siteDel: function(id, index){
        		var self = this;
        		if(confirm('确定要删除当前站点')){
	        		myFn.ajax('post', {id:id}, apiAddress.site.siteDel, function(res){
		        		self.role.data.splice(index, 1);
		            });
        		}
        	},
        	/*goto: function(index){
        		if(index == this.current) return;
	            this.current = index;
	            var self = this;
	            myFn.ajax('get', {page:index}, apiAddress.site.siteList, function(res){
    				self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.role = res.data;
	            });
        	}
*/
        	set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },
            getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', {page:index}, apiAddress.site.siteList, function(res){
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
