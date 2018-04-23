<template>
	<div class="underwriterList">
		<div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="icon icon-document"></span>
	                            <span style="font-weight:bold;color:#666;">保险员列表</span>
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
	                                <div class="row" style="padding:10px 15px;padding-top:15px;">
	                                	<div class="col-md-4">
	                                		<label class="form-label" style="display:inline-block">保险公司：</label>
	                                		<select class="form-control" style="width:300px;display:inline-block" v-model="company">
	                                			<!-- <option value="">请选择</option> -->
	                                			<option v-for="item in companyList" :value="item.name" v-html="item.name"></option>
	                                		</select>
	                                		<!-- <input type="text" class="form-control" style="width:auto;display:inline-block"> -->
	                                	</div>
                                    	<button type="button" class="btn btn-primary" @click="query_order()"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
                                        
                                    </div>
	                                <div class="body-nest" id="Footable">

	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;">
	                                                    序号
	                                                </th>
	                                                <th>
	                                                	保险员编号
	                                                </th>
	                                                <th style="width: 230px;">
	                                                    真实姓名
	                                                </th> 
	                                                <th style="width: 190px;">
	                                                    手机号
	                                                </th>  
	                                                <th>
	                                                    保险公司
	                                                </th> 
	                                                <th>
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in courier.data">
	                                            	<td v-html="index+((current-1)*10)+1" style="text-align: center;"></td>
	                                            	<td v-html="item.dm_code"></td>
	                                                <td v-html="item.dm_name"></td>
	                                                <td v-html="item.dm_phone"></td>
	                                                <td v-html="item.company_name"></td>
	                                                <td  style="width: 200px;text-align: center;">
	                                                    <!-- <button type="button" class="btn btn-primary" @click="toExamine(item.id, index, 0)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;通过</button> -->
	                                                    <a data-toggle="modal" data-target="#myModal"><button type="button" class="btn btn-danger" @click="userDeleteVal(index,item.id)"><span class="fontawesome-remove"></span>&nbsp;&nbsp;删除</button></a>
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
					<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									<h4 class="modal-title" id="myModalLabel" style="text-align:center">删除保险员</h4>
								</div>
								<div class="modal-body">
									是否删除？
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-danger" @click="userDelete(index,id)" data-dismiss="modal">确认</button>
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
								</div>
							</div>
						</div>
					</div>
	        </div>
	    </div>
	</div>
</template>

<script>

	import myelPage from "../tools/page" 

	export default{
		name:'underwriterList',
		data(){
			return{
				courier:{},
				current:1,
            	showItem:10,
				allpage:1,
				index:'',//删除索引
				id:'',//删除id,
				companyList:[],//保险公司列表
				company:'',
				
				// 查询条件
                orderCondition:{}
			}
		},
		mounted (){
            var self = this;
            // 获取第一页数据
            this.getData(1);
            this.getCompanyList();
        },
        methods: {
        	
        	/*goto: function(index,query){

        		if(index == this.current && query != true) return;
	            this.current = index;
	            var self = this;
	            myFn.ajax('get', {page:index, type:2,companyCode:self.company}, apiAddress.importOrder.underwriterList, function(res){
    				self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.courier = res.data;
	                self.company = ''
	            });
        	},*/
        	userDeleteVal:function(index,id){
        		this.index = index;
        		this.id = id;
        		console.log(index+'---'+id)
        	},
        	userDelete:function(index,id){
        		var self = this;

        		myFn.ajax('post',{userId:id},apiAddress.importOrder.underwriterDel,function(res){
        			self.courier.data.splice(index,1);
        			alert('删除成功')
        		})
        	},
        	getCompanyList:function(){
        		var self = this;
        		myFn.ajax('get',{},apiAddress.importOrder.company,function(res){
        			self.companyList = res.data.data;
        		})
        	},
        	/*search:function(){
        		this.goto(1,true);
        	},*/


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
                    companyCode:this.company
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
	            myFn.ajax('get', {page:index, type:2,companyCode:self.company}, apiAddress.importOrder.underwriterList, function(res){
                    self.courier = res.data;
    				self.allpage = res.data.last_page;
	            });
        	},


        },
        components: {
            myelPage
        }
	}
</script>
