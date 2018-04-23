<template>
	<div class="yesDelivered_task">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-check"></span>
	                            <span style="font-weight:bold;color:#666;">订单查询</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
		           <!-- table-content -->
	                <div class="content-wrap" style="margin-top:10px;">
	                    <div class="row">

	                        <div class="col-sm-12">

	                            <div class="nest" id="FootableClose">

	                                <div class="body-nest" id="Footable">
	                                    
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
	                                        		<label class="queryLable">交接日期：</label>
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

	                                    
	                                	<div class="row" style="padding:15px;padding-bottom:15px">
	                                		
	                                		 <div class="col-md-3 	">
	                                    		<label class="queryLable">保险公司：</label>
	                                    		<input class="form-control queryInput" placeholder="编码/名称" type="text" v-model="query.Insurance">
	                                        </div>
	                                        <div class="col-md-3 	">
	                                        	<label class="queryLable">订单编号：</label>
	                                        	<input class="form-control queryInput" placeholder="订单编号" type="text" v-model="query.code">
	                                        </div>
	                                        <div class="col-md-3 	" >
	                                        	<label class="queryLable">配送员 ：</label>
	                                        	<input class="form-control queryInput" type="text" placeholder="编码/名称" v-model="query.deliver">
	                                        </div>
                                        	<div class="col-md-3 ">
                                        		<button type="button" class="btn btn-primary search" @click="queryOrder"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
                                        		<!-- <button style="height: 35px;width: 90px;margin-left: 10px;" type="button" class="btn btn-success" @click="importOrder"><i class="icon-upload"></i>&nbsp;&nbsp;订单导入</button> -->
                                        		<a href="/public/station/exportOrder" style="height: 35px;width: 90px;margin-left: 10px;" class="btn btn-success"><i class="icon-download"></i>&nbsp;&nbsp;订单导出</a>
                                        	</div>
	                                        
	                                	</div>
		                                    
		                                <p v-show="total" class="allpageLength">共<span v-html="total"></span>条</p>    <!-- 总条数 -->
	                                

	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;text-align: center;">
	                                            		序号
	                                            	</th>
	                                                <th>
	                                                    分配时间
	                                                </th>
	                                                <th>
	                                                    订单编号
	                                                </th>
	                                                <th>
	                                                    公司名称
	                                                </th> 
	                                                <th style="width: 90px;">
	                                                    姓名
	                                                </th>  
	                                                <!-- <th>
	                                                    电话
	                                                </th>  -->
	                                                <th style="width: 150px;">
	                                                    车牌号
	                                                </th>
	                                                <th>
	                                                	交接时间
	                                                </th> 
	                                                <th>
	                                                    保费
	                                                </th>  
	                                                <th>
	                                                    服务劵
	                                                </th> 
	                                                <!-- <th>
	                                                    配送员编号
	                                                </th>  -->
	                                                <th>
	                                                    配送员
	                                                </th> 
	                                                <th>
	                                                	配送地址
	                                                </th>
	                                                <th>
	                                                    状态
	                                                </th> 
	                                                <th style="width:250px;">
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in orderlist">
	                                            	<td style="text-align: center;" v-html="index+((current-1)*10)+1"></td>
	                                                <td v-html="item.create_time"></td>
	                                                <td v-html="item.code"></td>
	                                                <td v-html="item.company_name"></td>
	                                                <td v-html="item.customer_name"></td>
	                                                <!-- <td v-html="item.mobile"></td> -->
	                                                <td v-html="item.license_number"></td>
	                                                <td v-html="item.task_time"></td>
	                                                <td v-html="item.amount"></td>
	                                                <td v-html="item.volume"></td>
	                                                <td v-html="item.dm_name"></td>
	                                                <td v-html="item.order_addr"></td>
	                                                <!-- <td v-html="item.dm_code" class="dm_code" @click="psyDetails(item.user_id)"></td> -->
	                                                <td v-html="item.statusMsg"></td>
	                                                <td style="text-align: left;">
	                                                    <button data-toggle="modal" data-target="#myModal1" type="button" class="btn btn-warning" @click="modifyDelivery(item.id, index)"><span class="fontawesome-cog"></span>&nbsp;&nbsp;修改配送员</button>
	                                                    <button data-toggle="modal" data-target="#myModal" type="button" class="btn btn-warning" @click="transferOrder(item.id, index)"><span class="icon icon-reply"></span>&nbsp;&nbsp;转运订单</button>
	                                                    
	                                                    <div class="btn-group" v-if="item.status != 3">
														  	<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														    修改状态 <span class="caret"></span>
														  	</button>
														  	<ul class="dropdown-menu">
															    <li v-for="val in orderType.changeList"><a @click="changeStatus(item, val)">{{val.name}}</a></li>
														  	</ul>
														</div>
														<button class="btn btn-info" @click="loadMore(item.id)">查看更多</button>

	                                                </td>
	                                            </tr>
	                                            
	                                        </tbody>
	                                    </table>

	                                    

					                    <!-- PAGE -->
										<ul class="pagination" v-show="allpage>1">
								            <li v-show="current != 1" @click="current-- && goto(current--)" ><a>上一页</a></li>
								            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
								              	<a>{{index}}</a>
								            </li>
								            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a>下一页</a></li>
								        </ul>
										<!-- END PAGE -->
										


										<!-- 修改配送员 -->
										<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
		                                    <div class="modal-dialog" role="document">  
		                                        <div class="modal-content">  
		                                            <div class="modal-header">  
		                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
		                                                    <span aria-hidden="true">×</span>  
		                                                </button>  
		                                                <h4 class="modal-title" id="myModalLabel">修改配送员</h4>  
		                                            </div>  
		                                            <div class="modal-body">  
		                                                <label class="popupLabel">配送员编号</label>
			                                            <input id="popupLabel" v-model="select.courierNumber" type="text" class="form-control" style="color:#333" placeholder="请输入将要配送此单的配送员编号">
		                                            </div>  
		                                            <div class="modal-footer">  
		                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
		                                                <button type="button" class="btn btn-primary" @click="modifyPersonnel">确认</button>  
		                                            </div>  
		                                        </div>  
		                                    </div>  
		                                </div>

										<!-- 订单转运 -->
										<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
		                                    <div class="modal-dialog" role="document">  
		                                        <div class="modal-content">  
		                                            <div class="modal-header">  
		                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
		                                                    <span aria-hidden="true">×</span>  
		                                                </button>  
		                                                <h4 class="modal-title" id="myModalLabel">订单转运</h4>  
		                                            </div>  
		                                            <div class="modal-body">  
		                                                <div>
		                                                    <select class="form-control" v-model="transfer.courierId">
		                                                        <option v-for="item in courierlist" :value="item.id">{{item.dis_name}}</option>
		                                                    </select>
		                                                </div>  
		                                            </div>  
		                                            <div class="modal-footer">  
		                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
		                                                <button type="button" class="btn btn-primary" @click="submitTransferOrder">确认</button>  
		                                            </div>  
		                                        </div>  
		                                    </div>  
		                                </div>
										
										<!-- 改约时间 -->
		                                <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
		                                    <div class="modal-dialog" role="document">  
		                                        <div class="modal-content">  
		                                            <div class="modal-header">  
		                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
		                                                    <span aria-hidden="true">×</span>  
		                                                </button>  
		                                                <h4 class="modal-title" id="myModalLabel">改约时间</h4>  
		                                            </div>  
		                                            <div class="modal-body">  
		                                                <div id="datetimepicker4" class="input-group" style="width: 100%;">
				                                            <input id="gyPopupVal" class="form-control" data-format="yyyy/MM/dd" type="text">
				                                            <span class="input-group-addon add-on" style="width: 20px;">
				                                                <i style="font-style:normal;" data-time-icon="entypo-clock" data-date-icon="entypo-calendar" class="entypo-calendar"></i>
				                                            </span>
				                                        </div> 
		                                            </div>  
		                                            <div class="modal-footer">  
		                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
		                                                <button type="button" class="btn btn-primary" @click="changeStatus_gy_Popup">确认</button>  
		                                            </div>  
		                                        </div>  
		                                    </div>  
		                                </div>

										<!-- 配送成功 -->
		                                <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
		                                    <div class="modal-dialog" role="document">  
		                                        <div class="modal-content">  
		                                            <div class="modal-header">  
		                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
		                                                    <span aria-hidden="true">×</span>  
		                                                </button>  
		                                                <h4 class="modal-title" id="myModalLabel">支付方式</h4>  
		                                            </div>  
		                                            <div class="modal-body">  
		                                                <div>
		                                                    <select class="form-control" v-model="pay.select">
		                                                        <option v-for="item in pay.list" :value="item.id">{{item.name}}</option>
		                                                    </select>
		                                                </div>  
		                                            </div>  
		                                            <div class="modal-footer">  
		                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
		                                                <button type="button" class="btn btn-primary" @click="changeStatus_yes_Popup">确认</button>  
		                                            </div>  
		                                        </div>  
		                                    </div>  
		                                </div>

		                                <!-- 配送失败 -->
		                                <div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
		                                    <div class="modal-dialog" role="document">  
		                                        <div class="modal-content">  
		                                            <div class="modal-header">  
		                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
		                                                    <span aria-hidden="true">×</span>  
		                                                </button>  
		                                                <h4 class="modal-title" id="myModalLabel">异常原因</h4>  
		                                            </div>  
		                                            <div class="modal-body">  
		                                                <div>
		                                                    <select class="form-control" v-model="fail.select">
		                                                        <option v-for="item in fail.list" :value="item.id">{{item.name}}</option>
		                                                    </select>
		                                                </div>
		                                                <div class="failMsg" style="margin-top:15px;" v-if="fail.select == 10">
		                                                	<label style="color:#666">备注信息：</label>
		                                                	<textarea name="failMsg" class="form-control" cols="20" rows="3" placeholder="请描述异常原因" v-model="fail.failMsg"></textarea>
		                                                </div>  
		                                            </div>  
		                                            <div class="modal-footer">  
		                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
		                                                <button type="button" class="btn btn-primary" @click="changeStatus_no_Popup">确认</button>  
		                                            </div>  
		                                        </div>  
		                                    </div>  
		                                </div>

		                                <div class="modal fade" id="myModal6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
	name: 'yesDelivered_task',
		data () {
			return {

				// 支付方式列表
				pay: {
					list:[],
					select:''
				},
				// 配送失败错误列表
				fail: {
					list:[],
					select:'',
					//失败原因描述
					failMsg:''
				},

				orderlist:{},
				current:0,
            	showItem:20,
            	allpage:1,
            	query:{
            		// starTime:'',
            		// endTime:'',
            		name:'',
            		number:'',
            		selectState:'',
            		Insurance:'',
            		code:'',
            		site:'',
            		deliver:''
            	},
            	status:{
            		list:[]
            	},
            	// 转运订单id & 配送站id
            	transfer:{
            		orderId:'',
            		courierId:'',
            		index:''
            	},
            	// 选择配送员
            	select:{
            		orderId:'',
            		courierNumber:''
            	},
            	// 站点列表
				courierlist:{},
				changeIndex:'',
				total:'',

				orderType:{
            		list:[],
            		changeList:[]
            	},
            	jurisdiction:{
            		show_editButton: '',
            		show_delButton:'',
            		show_uploadTplButton:'',
            		show_dowTplButton:''
            	},

            	// 当前修改项
            	thisItem: null,
            	loadMore_message:[]
			}
		},
		computed:{
          	pages:function(){
                var pag = [];
                if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem,this.allpage);
                    while(i){
                       pag.unshift(i--);
                    }
                    }else{ //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                        if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                        } 
                        while(i--){
                           pag.push( middle++ );
                        }
                }
                return pag;
            }
     	},
		mounted (){

			var self = this;

			myFn.getOrderStatusList(this.status, 'list');

			myFn.ajax('get', {}, apiAddress.site.siteList, function(res){
                self.courierlist = res.data.data;
                self.transfer.courierId = res.data.data[0].id;
            });

			// 支付方式列表
            myFn.ajax('get', {}, apiAddress.payType.list, function(res){
                self.pay.list = res.data;
                self.pay.select = res.data[0].id;
            });

            // 配送失败错误列表
            myFn.ajax('get', {}, apiAddress.fail.list, function(res){
                self.fail.list = res.data;
                self.fail.select = res.data[0].id;
            });


			myFn.getOrderStatusList(this.orderType, 'list');

			this.orderType.changeList = this.orderType.list.concat();

			this.orderType.changeList.splice(0,3);

			/*
			 * 起始时间，结束日期，交接日期，日历初始化
			 */
            $('#datetimepicker1').datetimepicker({
		        language: 'pt-BR'
		    });
		    $('#datetimepicker2').datetimepicker({
		        language: 'pt-BR'
		    });
		    $('#datetimepicker3').datetimepicker({
		        language: 'pt-BR'
		    });

		    // 改约时间日历初始化
		    $('#datetimepicker4').datetimepicker({
		        language: 'pt-BR'
		    });


            // 获取第一页数据
            this.goto(1);

        },
        methods: {
        	//订单导入
        	importOrder: function(){
        		this.$router.push({name:'orderAllocation'});
        	},
        	// 修改配送员
        	modifyDelivery: function(id,index){
        		this.select.orderId = id;
        		this.changeIndex = index; //需修改的对应索引
        		this.select.courierNumber = ''; //点击修改按钮、清空dialog输入框
        	},
        	// 弹出层确认修改
        	modifyPersonnel: function(){
        		var self = this;
        		var data = {
        			orderId: this.select.orderId,
        			userCode: this.select.courierNumber
        		}
        		myFn.ajax('post', data, apiAddress.order.modifyCourier, function(res){
        			self.orderlist[self.changeIndex].dm_code = self.select.courierNumber;	//修改成页面显示修改内容
        			self.orderlist[self.changeIndex].dm_name = res.data.dm_name;
					alert('修改成功');
					$("#myModal1").modal('toggle');
	            });

        	},

        	// 修改状态订单
        	changeStatus: function(item, val) {

        		var self = this;
        		var text = ''
				this.thisItem = item;

    			switch (val.id) {
    				case 3:
    					$("#myModal3").modal('toggle');
    					break;
    				case 4:
    					$("#myModal4").modal('toggle');
    					break;
    				case 5:
    					$("#myModal2").modal('toggle');
    					break;
    			}
        	},

        	changeStatus_yes_Popup: function() {
        		var data = {
        			id: this.thisItem.id,
        			status:3,
        			payMethod:this.pay.select
        		}
        		var text = '配送成功';
        		this.changeStatus_Fn(data, text);
        	},

        	changeStatus_no_Popup: function() {

        		var data = {
        			id: this.thisItem.id,
        			status:4,
        			fieldStatus:this.fail.select
        		}

        		if (this.fail.select == 10) {
        			data.message = this.fail.failMsg;
        		};

        		var text = '订单异常';
        		this.changeStatus_Fn(data, text);
        	},

        	changeStatus_gy_Popup: function() {
        		if ($("#gyPopupVal").val() == '') {
        			alert('请选择改约时间');
        			return false;
        		}
        		var data = {
        			id: this.thisItem.id,
        			status:5,
        			changeTime: $("#gyPopupVal").val()
        		}
        		var text = '改约时间';

        		this.changeStatus_Fn(data, text, $("#gyPopupVal").val());
        	},

        	changeStatus_Fn: function(data, text, time) {
        		var self = this;
        		myFn.ajax('post', data, apiAddress.order.modifyState, function(res){
        			if (time != undefined) {
        				alert('修改成功');
        				$("#myModal2").modal('toggle');
        			}
        			if(data.status == 4){
        				alert('修改成功');
        				$("#myModal4").modal('toggle');
        			}
        			self.thisItem.statusMsg = text;
	            });
        	},


        	// 配送员详情
        	psyDetails: function(id){
        		this.$router.push({name:'yesDelivered_task_details', params:{id:id}});
        	},
        	
        	transferOrder: function(id, index){
        		this.transfer.orderId = id;
        		this.transfer.index = index;
        	},
        	submitTransferOrder: function(){
        		var self = this;
        		var data = {
        			orderId: this.transfer.orderId,
        			stationId: this.transfer.courierId
        		}
        		myFn.ajax('post', data, apiAddress.order.transfer, function(res){
	                alert('转运成功');
	                $("#myModal").modal("toggle");
        			self.orderlist.splice(self.transfer.index, 1);
	            });
        	},
        	orderEdit: function(id){
        		this.$router.push({name:'orderEdit', params:{id:id}})
        	},
        	queryOrder: function(){
        		this.goto(1, true);
        	},
        	goto: function(index, query){
        		var self = this;

        		if(index == this.current && query != true) return;
	            this.current = index;

             	var data = {
	            	page:index
	            }

	            if($("#startTime").val() != ''){
	            	data.startTime = $("#startTime").val();
	            }	            
	            if($("#endTime").val() != ''){
	            	data.endTime = $("#endTime").val();
	            }	            
	            if($("#taskTime").val() != ''){
	            	data.taskTime = $("#taskTime").val();
	            }
	            if(self.query.selectState != ''){
	            	data.status = self.query.selectState;
	            }
	            if(self.query.Insurance != ''){
	            	data.companyCode = self.query.Insurance;
	            }
	            if(self.query.code != ''){
	            	data.code = self.query.code;
	            }
	            if(self.query.deliver != ''){
	            	data.dmCode = self.query.deliver;
	            }
	            
	            myFn.ajax('get', data, apiAddress.task.today, function(res){
	                self.orderlist = res.data.data;
	                self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
    				self.total = res.data.total;
	            });

        	},
        	loadMore:function(code){
                var self = this;
                myFn.ajax('get',{id:code},'/station/order/changeAboutRecord',function(res){
                    self.loadMore_message = res.data;
                    $('#myModal6').modal('show');
                })
            }
        }
	}
</script>
<style>
	
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	#datetimepicker1 label, #datetimepicker2 label,#datetimepicker3 label, .queryLable{
		margin-left: 10px;
		margin-top: 7px;
		font-size: 1.2em;
		font-weight: 100;
	}
	#datetimepicker1 .form-control, #datetimepicker2 .form-control,#datetimepicker3 .form-control{
		width: 100px;
		float: right;
		border-radius: 4px 0px  0px 4px;
	}
	.dm_code{
		text-decoration: underline;
		cursor: pointer;
		text-align: center;
		color: #006fff;
	}
	.allpageLength{
        font-weight: 900;
    }
    .allpageLength span{
        margin: 0px 7px;
        color: #2a6496;
        font-size: 18px;
    }

    .input-group-addon, .input-group-btn{
		width: auto;
	}

	.search{
		height: 35px;
		width: 90px;
		margin-left: 10px;
		margin-right: 20px;
	}
	.dropdown-menu a{
		cursor: pointer;
	}
</style>
