<template>
	<div class="notDelivered_task">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-edit"></span>
	                            <span style="font-weight:bold;color:#666;">未分配订单</span>
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
										<div class="col-md-10 col-sm-10"></div>	
	                                    <div class="col-md-2 col-sm-2" style="text-align: right;margin-bottom:10px;">
                                        	<a target="_blank" href="/public/station/downOrderTemplate" style="width: 130px;margin-left: 10px;" class="btn btn-success"><i class="icon-download"></i>&nbsp;&nbsp;导出未分配订单</a>
	                                    </div>
	                                    <!-- <p v-show="total" class="allpageLength">共<span v-html="total"></span>条</p> -->    <!-- 总条数 -->

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
	                                                <th>
	                                                    公司编码
	                                                </th> 
	                                                <th>
	                                                    姓名
	                                                </th>  
	                                                <!-- <th>
	                                                     电话
	                                                 </th> --> 
	                                                <th >
	                                                    车牌号
	                                                </th> 
	                                                <th>
	                                                    保费
	                                                </th> 
	                                                <th>
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
	                                                <td v-html="item.company_code"></td>
	                                                <td v-html="item.customer_name"></td>
	                                                <!-- <td v-html="item.mobile"></td> -->
	                                                <td v-html="item.license_number"></td>
	                                                <td v-html="item.amount"></td>
	                                                <td style="text-align: left;">
	                                                	<!-- <button type="button" class="btn btn-primary" @click="orderEdit(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button> -->
	                                                	<button data-toggle="modal" data-target="#myModal" type="button" class="btn btn-warning" @click="modifyDelivery(item.id, index)"><span class="fontawesome-cog"></span>&nbsp;&nbsp;修改配送员</button>
	                                                	<button data-toggle="modal" data-target="#myModal1" type="button" class="btn btn-warning" @click="transferOrder(item.id, index)"><span class="icon icon-reply"></span>&nbsp;&nbsp;转运订单</button>
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
										
										<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
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
			                                            <input v-model="select.courierNumber" type="text" class="form-control" style="color:#333" placeholder="请输入将要配送此单的配送员编号">
		                                            </div>  
		                                            <div class="modal-footer">  
		                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
		                                                <button type="button" class="btn btn-primary" @click="modifyPersonnel">确认</button>  
		                                            </div>  
		                                        </div>  
		                                    </div>  
		                                </div>
		
										
										<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
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
		                                                        <option v-for="item in sitelist" :value="item.id">{{item.username}}</option>
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
	name: 'notDelivered_task',
		data () {
			return {
				// 选中配送员
				selectcourier:'',
				// 配送员列表
				courierlist:{},
				sitelist:[],
				orderlist:{},
				// 分页
				current:0,
            	showItem:20,
            	allpage:1,
            	select:{
            		orderId:'',
            		courierNumber:''
            	},
            	// 转运订单id & 配送站id
            	transfer:{
            		orderId:'',
            		courierId:'',
            		index:''
            	},
            	total:'',
            	//修改配送员列表index
            	changeIndex:''
			}
		},
		computed:{
          	pages:function(){
                var pag = [];
                if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    // var i = Math.min(this.showItem,this.allpage);
                    var i = this.allpage
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

			myFn.ajax('get', {}, apiAddress.site.siteList, function(res){
                self.sitelist = res.data.data;
                self.transfer.courierId = res.data.data[0].id;
            });

			// 配送员列表
			// myFn.ajax('get', {check_status:2}, apiAddress.courier.courierArchivesList, function(res){
			// 	self.selectcourier = res.data.data[0].id;
   //              self.courierlist = res.data;
   //          });

            // 获取第一页数据
            this.goto(1);
        },
        methods: {
        	// 修改配送员
        	modifyDelivery: function(id,index){
        		this.select.orderId = id;
        		this.changeIndex = index;
        		console.log(this.changeIndex)
        	},
        	// 弹出层确认修改
        	modifyPersonnel: function(){
        		var self = this;
        		var data = {
        			orderId: this.select.orderId,
        			userCode: this.select.courierNumber
        		}
        		myFn.ajax('post', data, apiAddress.order.modifyCourier, function(res){
					alert('修改成功');
					$("#myModal").modal('toggle');
					self.orderlist.splice(self.changeIndex,1)
	            });

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
	                $("#myModal1").modal("toggle");
        			self.orderlist.splice(self.transfer.index, 1);
	            });
        	},

        	// 编辑资料
        	// orderEdit: function(id){
        	// 	this.$router.push({name:'orderEdit', params:{id:id}})
        	// },
        	goto: function(index, query){
        		if(index == this.current && query != true) return;
	            this.current = index;
	            var self = this;
	            var data = {
	            	page: index,
	            	allocated: 2
	            }

	            myFn.ajax('get', data, apiAddress.task.today, function(res){
	            	self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.orderlist = res.data.data;
	                self.total = res.data.total;
	            });
        	}
        }
	}
</script>
<style>
	
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#datetimepicker1 .form-control, #datetimepicker2 .form-control{
		width: 150px;
		float: right;
		border-radius: 4px 0px  0px 4px;
	}
	.popupLabel{
		margin-bottom: 10px;
	}
	.allpageLength{
        font-weight: 900;
    }
    .allpageLength span{
        margin: 0px 7px;
        color: #2a6496;
        font-size: 18px;
    }
</style>
