<template>
	<div class="staffAudit">
		<div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-legal"></span>
	                            <span class="public-page-name">人员审核</span>
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

	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;">
	                                                    序号
	                                                </th>
	                                                <th style="width: 130px;">
	                                                    保险员编号
	                                                </th>
	                                                <th style="width: 190px;">
	                                                    微信昵称
	                                                </th>
	                                                <th style="width: 130px;">
	                                                    手机号
	                                                </th> 
	                                                <th style="width: 90px;">
	                                                    真实姓名
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
	                                                <td v-html="item.nickname"></td>
	                                                <td v-html="item.dm_phone"></td>
	                                                <td v-html="item.dm_name"></td>
	                                                <td v-html="item.company_name"></td>
	                                                <td  style="width: 200px;text-align: center;">
	                                                    <button type="button" class="btn btn-primary" @click="toExamine(item.id, index, 0)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;通过</button>
	                                                    <button type="button" class="btn btn-danger" @click="toExamine(item.id, index, 1)"><span class="fontawesome-remove"></span>&nbsp;&nbsp;拒绝</button>
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

	import myelPage from "./tools/page" 

	export default{
		name:'staffAudit',
		data(){
			return{
				courier:{},
				current:1,
            	showItem:10,
				allpage:1,
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
        	/*goto: function(index){
        		if(index == this.current) return;
	            this.current = index;
	            var self = this;
	            myFn.ajax('get', {page:index, type:2, check_status:1}, apiAddress.importOrder.staffAudit, function(res){
    				self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.courier = res.data;
	            });
        	},*/
        	// 获取页码并携带查询条件获取数据
            set_page: function (page) {
            	this.current = page;
                this.getData(page);
            },
        	getData: function(index, data){
                var data = data || {};
                data.page = index;
                var self = this;
	            myFn.ajax('get', {page:index, type:2, check_status:1}, apiAddress.importOrder.staffAudit, function(res){
                    self.courier = res.data;
    				self.allpage = res.data.last_page;
	            });
        	}
        },
        components: {
            myelPage
        }
	}
</script>