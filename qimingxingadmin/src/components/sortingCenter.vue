<template>
	<div class="sortingCenter">
		<div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-legal"></span>
	                            <span class="public-page-name">分拣中心</span>
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
	                                	<div class="row" style="padding:15px;padding-bottom:30px;">
	                                		<div class="col-md-3">
	                                        	<div id="datetimepicker1" class="input-group date">
	                                        		<label>起始日期：</label>
		                                            <input id="startTime" class="form-control" data-format="yyyy/MM/dd" type="text">
		                                            <span class="input-group-addon add-on">
		                                                <i style="font-style:normal;" data-time-icon="entypo-clock" data-date-icon="entypo-calendar" class="entypo-calendar"></i>
		                                            </span>
		                                        </div>
	                                        </div>

	                                        <div class="col-md-3">
	                                        	<div id="datetimepicker2" class="input-group date">
	                                        		<label>结束日期：</label>
		                                            <input id="endTime" class="form-control" data-format="yyyy/MM/dd" type="text">
		                                            <span class="input-group-addon add-on">
		                                                <i style="font-style:normal;" data-time-icon="entypo-clock" data-date-icon="entypo-calendar" class="entypo-calendar"></i>
		                                            </span>
		                                        </div>
	                                        </div>
	                                        <div class="col-md-1 ">
	                                    		<button style="height: 35px;" type="button" class="btn btn-primary search" @click="query_order"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
	                                    	</div>

											<div class="row" style="padding:7px 15px;margin-bottom:10px;display:none">  <!-- 隐藏 -->
		                                		 <div class="col-md-3">
		                                    		<label class="queryLable">保险公司：</label>
		                                    		<input class="form-control queryInput" type="text" placeholder="编码/名称" v-model="companyCode">
		                                        </div>
		                                	</div>
	                                	</div>

	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;">
	                                                    序号
	                                                </th>
	                                                <th style="width: 300px;">
	                                                    保险公司
	                                                </th>
	                                                <th style="width: 100px;">
	                                                    站点
	                                                </th>
	                                                <th style="width: 100px;">
	                                                    投保单
	                                                </th> 
	                                                <th style="width: 100px;">
	                                                    保单
	                                                </th>  
	                                                <th style="width: 100px;">
	                                                    在线支付单
	                                                </th>  
	                                                <th style="width: 100px;">
	                                                    总计
	                                                </th>   
	                                                <th></th> 
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        	<tr v-for="(item, index) in countlist">
	                                        		<td :rowspan="item.count" v-html="item.index" v-show="index==0 || countlist[index].company_id!=countlist[index-1].company_id" style="text-align: center">1</td>
	                                        		<!-- v-if="index==0 || countlist[index].company_id!=countlist[index-1].company_id"  -->
	                                        		<td :rowspan="item.count" v-if="index==0 || countlist[index].company_id!=countlist[index-1].company_id" v-html="item.name">平安保险</td>
	                                        		<td v-html="item.dis_name">白石站</td>
	                                        		<td v-html="item.type[1]">2</td>
	                                        		<td v-html="item.type[3]">2</td>
	                                        		<td v-html="item.type[2]">2</td>
	                                        		<td v-html="item.content">5</td>
	                                        		<td></td>
	                                        	</tr>
	                                        	<tr style="color:red;">
	                                        		<td></td>
	                                        		<td></td>
	                                        		<td style="text-align: right;">总计：</td>
	                                        		<td>{{Totaldd.tb}}</td>
	                                        		<td>{{Totaldd.zxzf}}</td>
	                                        		<td>{{Totaldd.bb}}</td>
	                                        		<td>{{Totaldd.hj}}</td>
	                                        		<td></td>
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

	import myelPage from "./tools/page"

	export default{
		name:'sortingCenter',
		data(){
			return{
				countlist:{},
				current:0,
            	showItem:10,
				allpage:1,
				companyCode:'',
				Totaldd:{
					tb:0,
					bb:0,
					zxzf:0,
					hj:0
				},

			 	// 查询条件
                orderCondition:{}
			}
		},
		mounted (){
            var self = this;

            $('#datetimepicker1').datetimepicker({
		        language: 'pt-BR'
		    });
		    $('#datetimepicker2').datetimepicker({
		        language: 'pt-BR'
		    });

            // 获取第一页数据
            this.getData(1);
        },
        methods: {
        	// 审核配送员
        	toExamine: function(id, index, type){

        		var self = this;

        		var data = {
        			user_id : id,
        			check_id : type
        		}

        		myFn.ajax('post', data, apiAddress.importOrder.examineInsurance, function(res){
	        		self.courier.data.splice(index, 1);
	        		alert('审核成功');
	            });
        	},
        	/*queryOrder:function(){
        		this.goto(1, true);
        	},*/
        	/*goto: function(index, query){
        		if(index == this.current && query != true) return;
	            this.current = index;
	            var self = this;
	            var data = {
	            	page:index
	            }

	            if (this.companyCode != '') {
	            	data.companyCode = this.companyCode
	            }

	            if($("#startTime").val() != ''){
	            	data.startTime = $("#startTime").val();
	            }	            
	            if($("#endTime").val() != ''){
	            	data.endTime = $("#endTime").val();
	            }
	            
	            myFn.ajax('get', data, apiAddress.importOrder.count, function(res){
    				self.showItem = res.data.companyPage.per_page;
    				self.current = res.data.companyPage.current_page;
    				self.allpage = res.data.companyPage.last_page;
	                var resList = res.data.data;

	                // 将获取到的数据重新整理放到新建对象的type中
	                var list = []
	                for (var i = 0; i < resList.length; i++) {
	                	list.push({
	                		'company_id':resList[i].company_id,
	                		'index':resList[i].index,
	                		'station_id':resList[i].station_id,
	                		'dis_name':resList[i].dis_name,
	                		'name':resList[i].name,
	                		'type':{}
	                	});

	                	list[i].type[resList[i].type] = resList[i].count;
	                }
	                self.Totaldd.tb = 0;
        			self.Totaldd.bb = 0;
        			self.Totaldd.zxzf = 0; 
        			self.Totaldd.hj = 0;
	                self.merge(list);
	            });
        	},*/
        	merge: function(ls) {
        		var list = [];
        		for (var i = 0; i<ls.length; i++) {
        			if ( i != 0 && ls[i].station_id == ls[i-1].station_id && ls[i].company_id == ls[i-1].company_id) {
	        			list[list.length-1].type = $.extend(list[list.length-1].type, ls[i].type);
        			} else {
        				list.push(ls[i]);
        			}
        		}

        		for (var z = 0; z<list.length; z++) {
        			for (var k = 0; k<list.length; k++) {
        				if(list[z].company_id == list[k].company_id){
        					if(list[z].count == undefined){
        						list[z].count = 1
        					}else{
        						list[z].count++;
        					}
        				}
        			}
        		}

        		for (var x = 0; x < list.length; x++) {
        			if(list[x].type[1] == undefined) {
        				list[x].type[1] = 0;
        			}
        			if(list[x].type[2] == undefined) {
        				list[x].type[2] = 0;
        			}
        			if(list[x].type[3] == undefined) {
        				list[x].type[3] = 0;
        			}
        			list[x].content = list[x].type[1] + list[x].type[2] + list[x].type[3];
        			this.Totaldd.tb+=list[x].type[1];
        			this.Totaldd.bb+=list[x].type[2];
        			this.Totaldd.zxzf+=list[x].type[3]; 
        			this.Totaldd.hj+=list[x].content;
        		}
        		this.countlist = list;
        	},

        	/**
             * [query_order 添加查询条件,查询后重置页码,获取数据]
             */
            query_order: function () {
                this.orderCondition = this.set_orderCondition();
                this.$refs.page.resetCurrent();
                this.getData(1, this.orderCondition);
            },

            /**
             * [set_orderCondition 添加查询条件]
             * @return {obj} [返回查询条件]
             */
            set_orderCondition: function () {
                var data = {
                	startTime : $("#startTime").val(),
                	endTime : $("#endTime").val()
                };
                return myFn.isEmpty(data);
            },

        	set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },
            getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', data, apiAddress.importOrder.count, function(res){
                    /*self.resList = res.data.data;
    				self.allpage = res.data.last_page;*/

    				self.allpage = res.data.companyPage.last_page;
	                var resList = res.data.data;

	                // 将获取到的数据重新整理放到新建对象的type中
	                var list = []
	                for (var i = 0; i < resList.length; i++) {
	                	list.push({
	                		'company_id':resList[i].company_id,
	                		'index':resList[i].index,
	                		'station_id':resList[i].station_id,
	                		'dis_name':resList[i].dis_name,
	                		'name':resList[i].name,
	                		'type':{}
	                	});

	                	list[i].type[resList[i].type] = resList[i].count;
	                }
	                self.Totaldd.tb = 0;
        			self.Totaldd.bb = 0;
        			self.Totaldd.zxzf = 0; 
        			self.Totaldd.hj = 0;
	                self.merge(list);
    				
	            });
        	}
        },
        components: {
            myelPage
        }
	}
</script>
<style scope>

	#datetimepicker1 label, #datetimepicker2 label,#datetimepicker3 label, .queryLable{
		margin-left: 10px;
		margin-top: 7px;
		font-size: 1.2em;
		font-weight: 100;
	}
	#datetimepicker1 .form-control, #datetimepicker2 .form-control, #datetimepicker3 .form-control{
		width: 100px;
		float: right;
		border-radius: 4px 0px  0px 4px;
	}

	.input-group-addon, .input-group-btn{
		width: auto;
	}

	.footable > tbody > tr > td:first-child{
		border: auto;
	}
	.table-striped > tbody > tr:nth-child(2n+1) > td{
		border-left: 1px solid #DDDDDD;
	}
	.table-striped > tbody > tr:nth-child(2n+1) > td{
		background-color: #fff;
	}
	.table-striped > tbody > tr> td:first-child{
		border-left: none;
	}
</style>