<template>
	<div class="notSend">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="entypo-clipboard"></span>
	                            <span class="public-page-name">未送出服务券</span>
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
	                                                    时间
	                                                </th>
	                                                <th>
	                                                    站点名称
	                                                </th> 
	                                                <th>
	                                                    配送编号
	                                                </th> 
	                                                <th>
	                                                    配送员姓名
	                                                </th> 
	                                                <th>
	                                                    数量
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in dataList.data">
	                                            	<td v-html="index+((current-1)*10)+1" class="public-table-serialNumber" ></td>
	                                                <td v-html="item.create_time"></td>
	                                                <td v-html="item.dis_name"></td>
	                                                <td v-html="item.dm_code"></td>
	                                                <td v-html="item.dm_name"></td>
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
	name: 'notSend',
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
        	/*goto: function(index){
        		console.log(index);
        		if(index == this.current) return;
	            this.current = index;
	            var self = this;

	            myFn.ajax('get', {page:index, type:1}, apiAddress.volume.send, function(res){
    				self.dataList = res.data;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.dataList = res.data;
	            });
        	}*/
        	// 获取页码并携带查询条件获取数据
            set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },
        	getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', {page:index, type:1}, apiAddress.volume.send, function(res){
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
