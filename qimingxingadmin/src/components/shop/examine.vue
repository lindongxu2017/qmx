<template>
	<div class="shopExamine">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-ambulance"></span>
	                            <span class="public-page-name">商家审核</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
		           <!-- table-content -->
	                <div class="content-wrap">
	                    <div class="row">

	                        <div class="col-sm-12">

	                            <div class="nest" id="FootableClose">
	                                <div class="body-nest" id="Footable">
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th class="public-table-serialNumber">
	                                                    序号
                                                    </th>
	                                                <th>
	                                                    服务城市
	                                                </th>
	                                                <th>
	                                                    类型
	                                                </th> 
	                                                <th>
	                                                    商家ID
	                                                </th> 
	                                                <th>
	                                                    商家名称
	                                                </th>  
	                                                <th>
	                                                    服务项目
	                                                </th>   
	                                                <th>
	                                                    联系电话
	                                                </th>   
	                                                <th>
	                                                    地址
	                                                </th> 
	                                                <th></th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in dataList">
	                                            	<td v-html="index+((current-1)*10)+1" class="public-table-serialNumber"></td>
	                                                <td v-html="item.region_name"></td>
	                                                <td v-html="item.name"></td>
	                                                <td v-html="item.id"></td>
	                                                <td v-html="item.shopname"></td>
	                                                <td v-html="item.service_project"></td>
	                                                <td v-html="item.mobile"></td>
	                                                <td v-html="item.addr"></td>
	                                                <td>
	                                                    <button type="button" class="btn btn-primary" @click="toExamine(item.id, 2, index)">
	                                                    	<span class="entypo-check"></span>&nbsp;通过
	                                                    </button>
	                                                    <button type="button" class="btn btn-danger" @click="toExamine(item.id, 3, index)">
	                                                    	<span class="entypo-cancel"></span>&nbsp;拒绝
	                                                    </button>
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
	name: 'shopExamine',
		data () {
			return {
				dataList:[],
				current:1,
            	showItem:10,
            	allpage:1,
			}
		},
		mounted (){
            // 获取第一页数据
            this.getData(1);

        },
        methods: {

        	/**
        	 * [toExamine 商家审核]
        	 * @param  {[type]} id    [ 记录Id ]
        	 * @param  {[type]} state [ 2=通过,3=拒绝]
        	 * @param  {[type]} index [ 当先记录在数组中的位置用于前端动态删除]
        	 */
        	toExamine : function (id, state,index) {
        		var self = this;
        		var data = {
        			"id" : id,
        			"status" : state
        		}
        		myFn.ajax('post', data, apiAddress.shop.isExamine, function(res){
	        		self.dataList.splice(index, 1);
	            });
        	},
        	set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },

        	getData: function(index){
        		var self = this;
             	myFn.ajax('get', {page:index, status:1}, apiAddress.shop.applyList, function(res){
	                self.dataList = res.data.data;
	                console.log(self.dataList)
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
