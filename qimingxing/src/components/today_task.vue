<template>
	<div class="today_task">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="entypo-search"></span>
	                            <span>今日配送任务</span>
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
	                                    <div class="row" style="margin-bottom:20px">    
	                                        <div class="col-md-2 col-sm-2">
	                                        	<div id="datetimepicker1" class="input-group date">
	                                        		<label>类型：</label>
		                                            <select class="form-control" v-model="query.type">
		                                            	<option value="">所有</option>
		                                                <option v-for="item in type.list" :value="item.id">{{item.name}}</option>
		                                            </select>
		                                        </div>
	                                        </div>
	                                        <div class="col-md-2 col-sm-2">
	                                        	<div id="datetimepicker2" class="input-group date">
	                                        		<label>分类：</label>
		                                            <select class="form-control" v-model="query.class">
		                                            	<option value="">所有</option>
		                                                <option value="0">未分配</option>
		                                                <option value="1">已分配</option>
		                                            </select>
		                                        </div>
	                                        </div>
	                                        <div class="col-md-1 col-sm-1">
	                                        	<button style="height: 35px;width: 120px;" type="button" class="btn btn-primary" @click="queryOrder"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
	                                        </div>
	                                    </div>
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                                <th>
	                                                    分配时间
	                                                </th>
	                                                <th>
	                                                    公司名称/编码
	                                                </th> 
	                                                <th>
	                                                    姓名
	                                                </th>  
	                                                <th>
	                                                    电话
	                                                </th> 
	                                                <th>
	                                                    车牌号
	                                                </th> 
	                                                <th>
	                                                    保费
	                                                </th> 
	                                                <th>
	                                                    状态
	                                                </th> 
	                                                <th>
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in orderlist">
	                                                <td v-html="item.create_time"></td>
	                                                <td v-html="item.company_name + ' / ' + item.company_code"></td>
	                                                <td v-html="item.customer_name"></td>
	                                                <td v-html="item.mobile"></td>
	                                                <td v-html="item.license_number"></td>
	                                                <td v-html="item.amount"></td>
	                                                <td v-html="item.status"></td>
	                                                <td  style="width: 150px;text-align: left;">
	                                                    <button data-toggle="modal" data-target="#myModal" type="button" class="btn btn-warning" @click="transferOrder(item.id, index)"><span class="icon icon-reply"></span>&nbsp;&nbsp;转运订单</button>
	                                                </td>
	                                            </tr>
	                                            
	                                        </tbody>
	                                    </table>

					                    <!-- PAGE -->
										<ul class="pagination" v-show="allpage>1">
								            <li v-show="current != 1" @click="current-- && goto(current)" ><a>上一页</a></li>
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
		                                                <h4 class="modal-title" id="myModalLabel">订单转运</h4>  
		                                            </div>  
		                                            <div class="modal-body">  
		                                                <div>
		                                                    <select class="form-control" v-model="transfer.courierId">
		                                                        <option v-for="item in courierlist" :value="item.id">{{item.username}}</option>
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
	name: 'today_task',
		data () {
			return {
				// 订单列表
				orderlist:{},
				// 站点列表
				courierlist:{},
				current:0,
            	showItem:20,
            	allpage:1,
            	query:{
            		type:'',
            		class:''
            	},
            	type:{
            		list:[]
            	},
            	// 转运订单id & 配送站id
            	transfer:{
            		orderId:'',
            		courierId:'',
            		index:''
            	}
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
			myFn.getOrderTypeList(this.type, 'list');
			myFn.ajax('get', {}, apiAddress.site.siteList, function(res){
                self.courierlist = res.data.data;
                self.transfer.courierId = res.data.data[0].id;
            });
            // 获取第一页数据
            this.goto(1);
        },
        methods: {
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
        		if(index == this.current && query != true) return;
	            this.current = index;
	            var self = this;
	            var data = {
	            	page:index
	            }

	            if(this.query.type != ''){
	            	data.type = this.query.type;
	            }

	            if(this.query.class != ''){
	            	data.allocated = this.query.class;
	            }

	            myFn.ajax('get', data, apiAddress.task.today, function(res){
	                self.orderlist = res.data.data;
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
</style>
