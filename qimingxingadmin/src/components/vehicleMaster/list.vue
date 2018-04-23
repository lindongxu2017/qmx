<template>
	<div class="vehicleMasterList">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="icon-document"></span>
	                            <span class="public-page-name">车主列表</span>
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
                                                        车主ID
                                                    </th>
	                                                <th>
	                                                    姓名
	                                                </th>
	                                                <th>
	                                                    加入时间
	                                                </th> 
	                                                <th>
	                                                    累积服务卷
	                                                </th> 
	                                                <th>
	                                                    已用服务卷
	                                                </th> 
	                                                <th>
	                                                    剩余服务卷
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in dataList.data">
	                                            	<td v-html="index+((current-1)*10)+1" class="public-table-serialNumber"></td>
                                                    <td v-html="item.id"></td>
	                                                <td v-html="item.dm_name"></td>
	                                                <td v-html="item.create_time"></td>
	                                                <td v-html="item.total_count"></td>
	                                                <td v-html="item.total_count - item.volume"></td>
	                                                <td v-html="item.volume"></td>
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
	name: 'vehicleMasterList',
		data () {
			return {
				dataList:{},
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

        	// 获取页码并携带查询条件获取数据
            set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },
        	getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', data, apiAddress.vehicleMaster.list, function(res){
                    self.dataList = res.data;
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
