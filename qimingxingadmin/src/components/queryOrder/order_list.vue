<template>
	<div class="queryOrderDetails">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-search"></span>
	                            <span class="public-page-name">订单详情</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
		           <!-- table-content -->
	                <div class="content-wrap" style="margin-top:10px;">
	                    <div class="row">

	                        <div class="col-sm-12">

	                            <div class="body-nest" id="FootableClose">
	                                <!-- <div class="title-alt">
	                                    <h6>权限管理</h6>
	                                </div> -->

	                                <div class="row" style="padding:15px;padding-bottom:10px"> 
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
                                        <div class="col-md-3">
                                        	<div id="datetimepicker3" class="input-group date">
                                        		<label>交接日期：</label>
	                                            <input id="taskTime" class="form-control" data-format="yyyy/MM/dd" type="text">
	                                            <span class="input-group-addon add-on">
	                                                <i style="font-style:normal;" data-time-icon="entypo-clock" data-date-icon="entypo-calendar" class="entypo-calendar"></i>
	                                            </span>
	                                        </div>
                                        </div>
                                        <div class="col-md-3">
                                        	<label class="queryLable">配送状态：</label>
                                        	<select class="form-control" v-model="query.selectState" style="display: inline-block;width: 130px;">
                                        	 	<option value="">所有</option>
                                                <option v-for="item in orderType.list" :value="item.id">{{item.name}}</option>
                                            </select>
                                        </div>
                                        
                                    </div>

	                           
                                	<div class="row" style="padding:7px 15px;margin-bottom:10px">
                                		 <div class="col-md-3 	">
                                    		<label class="queryLable">保险公司：</label>
                                    		<input class="form-control queryInput" type="text" placeholder="编码/名称" v-model="query.Insurance">
                                        </div>
                                        <div class="col-md-3 	">
                                        	<label class="queryLable">订单编号：</label>
                                        	<input class="form-control queryInput" type="text"  placeholder="订单编号" v-model="query.code">
                                        </div>
                                        <div class="col-md-3 	" >
                                        	<label class="queryLable">配送站点：</label>
                                        	<input class="form-control queryInput" type="text" placeholder="编码/名称" v-model="query.site">
                                        </div>
                                        <div class="col-md-3    " >
                                            <label class="queryLable" style="padding-right:1.2em">配送员：</label>
                                            <input class="form-control queryInput" type="text" placeholder="编码/名称" v-model="query.userCode">
                                        </div>
                                	</div>
                                    <div class="row" style="padding:7px 15px;margin-bottom:10px">
                                        <div class="col-md-4">
                                             <p class="allpageLength">共 <span>{{orderlist.total}}</span>条数据</p>
                                        </div>
                                        <div class="col-md-8 " style="text-align:right;">
                                            <button type="button" class="btn btn-primary search" @click="query_order(1, true)"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
                                            <a v-if="jurisdiction.show_dowTplButton"  href="/public/admin/exportOrder" style="height: 35px;width: 90px;margin-left: 10px;" class="btn btn-success"><i class="icon-download"></i>&nbsp;&nbsp;订单导出</a>
                                        </div>
                                    </div>

                                   

                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
                                        <thead>
                                            <tr>
                                            	<th style="width: 50px;">
                                                    序号
                                                </th>
                                                <th style="width: 150px;">
                                                  	录单日期
                                                </th>
                                                <th style="width: 110px;">
                                                    交接日期
                                                </th>
                                                <th>
                                                    操作时间
                                                </th>
                                                <th >
                                                    公司名称
                                                </th>
                                                <th style="width: 90px;"> 
                                                    保单编号
                                                </th> 
                                                <th style="width: 80px;">
                                                    客户姓名
                                                </th>  
                                                <th style="width: 90px;">
                                                    客户电话
                                                </th> 
                                                <th style="width: 94px;">
                                                    车牌号
                                                </th> 
                                                <th style="width:74px">
                                                    保费
                                                </th> 
                                                <th style="width:74px">
                                                    服务劵
                                                </th> 
                                                <th >
                                                    状态
                                                </th>  
                                                <th style="width: 90px;">
                                                    配送站点
                                                </th>
                                                <th>
                                                    配送员
                                                </th>
                                                <th>
                                                    配送地址
                                                </th>
                                                <th>
                                                    备注
                                                </th> 
                                                <th style="width: 165px;text-align: center;" v-if="jurisdiction.show_editButton || jurisdiction.show_delButton">
                                                    操作
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in orderlist.data">
                                                <td v-html="index+((current-1)*10)+1" style="text-align: center;"></td>
                                                <td v-html="item.create_time"></td>
                                                <td v-html="item.task_time"></td>
                                                <td v-html="item.update_time"></td>
                                                <td v-html="item.company_name"></td>
                                                <td v-html="item.code"></td>
                                                <td v-html="item.customer_name"></td>
                                                <td v-html="item.mobile"></td>
                                                <td v-html="item.license_number"></td>
                                                <td v-html="item.amount"></td>
                                                <td v-html="item.volume"></td>
                                                <td v-html="item.statusMsg"></td>
                                                <td v-html="item.dis_name"></td>
                                                <td v-html="item.dm_name"></td>
                                                <td v-html="item.order_addr"></td>
                                                <td v-if="item.status=='3'" v-html=""></td>
                                                <td v-if="item.status!='3'" v-html="item.message"></td>
                                                <td v-if="jurisdiction.show_editButton || jurisdiction.show_delButton">
                                                    <button v-if="jurisdiction.show_editButton" type="button" class="btn btn-primary" @click="edit_order(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button>
                                                    <button v-if="jurisdiction.show_delButton" type="button" class="btn btn-danger" @click="del_order(item.id, index)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;删除</button>
                                                    <button class="btn btn-info" @click="loadMore(item.id)">查看更多</button>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>

                                    <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                        <div class="modal-dialog" role="document">  
                                            <div class="modal-content">  
                                                <div class="modal-header">  
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
                                                        <span aria-hidden="true">×</span>  
                                                    </button>  
                                                    <h4 class="modal-title" id="myModalLabel">改约信息</h4>
                                                </div>  
                                                <div class="modal-body">
                                                    <label class="popupLabel" v-for="item in loadMore_message" v-if="loadMore_message.length != 0">操作时间：<span v-html="item.create_time"></span><span> 改约时间：</span><span style="color:#666!important" v-html="item.change_after_time"></span></label>
                                                    <label v-if="loadMore_message.length == 0">无</label>
                                                </div>  
                                                <div class="modal-footer">  
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>   
                                                </div>  
                                            </div>  
                                        </div>  
                                    </div>

                                    <myel-page ref="page" :allpage="allpage" @togglePage="set_page"></myel-page>

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
	name: 'queryOrderDetails',
		data () {
			return {
                current: 1,
				orderlist:{},
            	allpage:1,
            	query:{
            		selectState:'',
            		Insurance:'',
            		code:'',
            		site:'',
                    userCode:''

            	},
            	orderType:{
            		list:[]
            	},
            	jurisdiction:{
            		show_editButton: '',
            		show_delButton:'',
            		show_uploadTplButton:'',
            		show_dowTplButton:''
            	},
                loadMore_message:[],
                // 查询条件
                orderCondition:{}
			}
		},
		mounted (){
			
			// 权限控制
            this.jurisdiction.show_editButton = myFn.getLocalStorageVal('jurisdiction', 9) ? true : false;
            this.jurisdiction.show_delButton = myFn.getLocalStorageVal('jurisdiction', 37) ? true : false;
            this.jurisdiction.show_uploadTplButton = myFn.getLocalStorageVal('jurisdiction', 39) ? true : false;
            this.jurisdiction.show_dowTplButton = myFn.getLocalStorageVal('jurisdiction', 40) ? true : false;

            myFn.getOrderStatusList(this.orderType, 'list');

            $('#datetimepicker1').datetimepicker({
		        language: 'pt-BR'
		    });
		    $('#datetimepicker2').datetimepicker({
		        language: 'pt-BR'
		    });
		    $('#datetimepicker3').datetimepicker({
		        language: 'pt-BR'
		    });

            // 获取第一页数据
            this.getData(1);
        },
        methods: {
        	edit_order: function(id){
        		this.$router.push({name:'queryOrderEdit', params:{id:id}});
        	},
        	del_order: function(id, index){
        		var self = this;
        		if(confirm('确定要删除当前订单')){
	        		myFn.ajax('post', {id:id}, apiAddress.importOrder.orderDel, function(res){
		        		self.orderlist.splice(index, 1);
		            });
        		}
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
                    endTime : $("#endTime").val(),
                    taskTime : $("#taskTime").val(),
                    companyCode: this.query.Insurance,
                    code : this.query.code,
                    disCode : this.query.site,
                    status : this.query.selectState,
                    userCode : this.query.userCode
                };
                return myFn.isEmpty(data);
            },

            // 获取页码并携带查询条件获取数据
            set_page: function (page) {
                this.current = page;
                this.getData(page, this.orderCondition);
            },

            /**
             * [getData 获取数据]
             * @param  {[type]} index [页码]
             * @param  {[type]} data  [查询条件]
             */
            getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', data, apiAddress.importOrder.orderList, function(res){
                    self.orderlist = res.data;
    				self.allpage = res.data.last_page;
	            });
        	},
            loadMore:function(code){
                var self = this;
                myFn.ajax('get',{id:code},apiAddress.importOrder.orderMoreInfo,function(res){
                    self.loadMore_message = res.data;
                    $('#myModal1').modal('show');
                })
            }
        },
        components: {
            myelPage
        }
	}
</script>
<style>
	.bootstrap-datetimepicker-widget  ul{
		padding: 0px 15px;
		list-style: none;
	}
	.picker-switch{
		display: none;
	}
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
	.queryInput{
		width: 135px;
		display: inline-block;
	}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.input-group-addon, .input-group-btn{
		width: auto;
	}

	.search{
		height: 35px;
		width: 90px;
		margin-left: 10px;
		margin-right: 20px;
	}
</style>
