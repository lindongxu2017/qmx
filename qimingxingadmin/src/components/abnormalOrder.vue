<template>
	<div class="companylist">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="entypo-adjust"></span>
	                            <span>导入异常</span>
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
	                                    <div class="row" style="margin-bottom:13px">    
	                                        <div class="col-md-2 col-sm-2" style="display: inline-block;width: auto;">
	                                        	<label class="queryLable">名称：</label>
	                                        	<input class="form-control queryInput" type="text" v-model="query.name">
	                                        </div>
	                                        <div class="col-md-2 col-sm-2" style="display: inline-block;width: auto;">
	                                        	<label class="queryLable">编码：</label>
	                                        	<input class="form-control queryInput" type="text" v-model="query.code">
	                                        </div>
	                                        <div class="col-md-1 col-sm-1">
	                                        	<button style="height: 35px;width: 120px;" type="button" class="btn btn-primary" @click="companyQuery"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
	                                        </div>
	                                        <div class="col-md-5 col-sm-5"></div>
	                                        <div class="col-md-2 col-sm-2" style="text-align:right">
	                                            <router-link to="companyAdd"><button type="button" class="btn btn-info"><span class="entypo-plus"></span>&nbsp;&nbsp;添加公司</button></router-link>
	                                        </div>
	                                    </div>
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                                <th style="width: 200px;">
	                                                    时间
	                                                </th>
	                                                <th style="width: 300px;">
	                                                    编号
	                                                </th>
	                                                <th>
	                                                    公司名称
	                                                </th> 
	                                                <th style="width: 100px;">
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in orderlist">
	                                                <td v-html="item.create_time"></td>
	                                                <td v-html="item.code"></td>
	                                                <td v-html="item.name"></td>
	                                                <td  style="width: 200px;text-align: left;">
	                                                    <button type="button" class="btn btn-primary" @click="companyEdit(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button>
	                                                    <button type="button" class="btn btn-danger" @click="companyDel(item.id, index)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;删除</button>
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
	name: 'companylist',
		data () {
			return {
				orderlist:{},
				current:0,
            	showItem:10,
            	allpage:1,
            	query:{
            		name:'',
            		code:''
            	}
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

            // 获取第一页数据
            this.goto(1);
        },
        methods: {

        	companyEdit: function(id){
        		this.$router.push({name:'companyAdd', params:{id:id}});
        	},

        	companyQuery: function(){
        		this.goto(1, this.query);
        	},

        	companyDel: function(id, index){
        		var self = this;
        		if(confirm('确定要删除当前保险公司吗')){
	        		myFn.ajax('post', {id:id}, apiAddress.importOrder.companyDel, function(res){
		        		self.orderlist.splice(index, 1);
		            });
        		}
        	},

        	goto: function(index, queryCondition){
        		if(index == this.current && queryCondition == undefined) return;

        		queryCondition = queryCondition || '';

	            this.current = index;
	            var self = this;

	            var data = {
	            	page:index
	            }

	            if(queryCondition.name != ''){
	            	data.name = queryCondition.name;
	            }

	            if(queryCondition.code != ''){
	            	data.code = queryCondition.code;
	            }

	            myFn.ajax('get', data, apiAddress.importOrder.company, function(res){
		            self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.orderlist = res.data.data;
	            });
        	}
        }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.queryInput{
		width: 150px;
	}
</style>
