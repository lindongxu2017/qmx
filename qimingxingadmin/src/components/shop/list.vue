<template>
	<div class="shopList">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-ambulance"></span>
	                            <span class="public-page-name">商家列表</span>
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
	                                                    商家ID
	                                                </th>
	                                                <th>
	                                                    商家名称
	                                                </th> 
	                                                <th>
	                                                    联系电话
	                                                </th> 
	                                                <th>
	                                                    累积服务券
	                                                </th>  
	                                                <th>
	                                                    已提现服务券
	                                                </th>   
	                                                <th>
	                                                    剩余
	                                                </th>   
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in dataList.data">
	                                            	<td v-html="index+((current-1)*10)+1" class="public-table-serialNumber"></td>
	                                                <td v-html="item.id"></td>
	                                                <td v-html="item.shopname"></td>
	                                                <td v-html="item.mobile"></td>
	                                                <td v-html="item.total_count"></td>
	                                                <td v-html="item.withdraw_count"></td>
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
	name: 'shopList',
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
                data.status = 2;
                var self = this;
	            myFn.ajax('get', data, apiAddress.shop.applyList, function(res){
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
