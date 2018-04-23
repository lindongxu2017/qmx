<template>
	<div class="courier">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-legal"></span>
	                            <span style="font-weight:bold;color:#666;">配送员审核</span>
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
	                                            	<th style="width: 50px;text-align: center;">
	                                            		序号
	                                            	</th>
	                                                <th style="width: 130px;">
	                                                    编号
	                                                </th>
	                                                <th style="width: 250px;">
	                                                    微信昵称
	                                                </th>
	                                                <th style="width: 100px;">
	                                                    姓名
	                                                </th> 
	                                                <th>
	                                                    <!-- 手机号 -->
	                                                </th> 
	                                                <th style="width: 150px;">
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in courier.data">
	                                            	<td style="text-align: center;" v-html="index+((current-1)*10)+1"></td>
	                                                <td v-html="item.dm_code"></td>
	                                                <td v-html="item.nickname"></td>
	                                                <td>{{item.dm_phone}}</td>
	                                                <td v-html="item.dm_name"></td>
	                                                <td  style="width: 200px;text-align: center;">
	                                                    <button type="button" class="btn btn-primary" @click="toExamine(item.id, index, 0)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;通过</button>
	                                                    <button type="button" class="btn btn-danger" @click="toExamine(item.id, index, 1)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;拒绝</button>
	                                                </td>
	                                            </tr>
	                                            
	                                        </tbody>
	                                    </table>

	                                    <!-- <p v-show="total" class="allpageLength">共<span v-html="total"></span>条</p>    总条数 -->


					                    <!-- PAGE -->
										<ul class="pagination" v-show="allpage>1">
								            <li v-show="current != 1" @click="current-- && goto(current--)" ><a>上一页</a></li>
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
	name: 'courier',
		data () {
			return {
				courier:{},
				current:0,
            	showItem:20,
            	allpage:1,
            	total:''
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
            // 获取第一页数据
            this.goto(1);
        },
        methods: {
        	// 审核配送员
        	toExamine: function(id, index, type){

        		var self = this;

        		var data = {
        			user_id : id,
        			check_id : type
        		}

        		myFn.ajax('post', data, apiAddress.courier.toExamine, function(res){
	        		self.courier.data.splice(index, 1);
	        		console.log(self.total)
	        		alert('审核成功');
	            });
        	},
        	goto: function(index){
        		if(index == this.current) return;
	            this.current = index;
	            var self = this;
	            myFn.ajax('get', {page:index,check_status:1}, apiAddress.courier.examineList, function(res){
    				self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
	                self.courier = res.data;
	                self.total = res.data.total;
	            });
        	}
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.allpageLength{
        font-weight: 900;
    }
    .allpageLength span{
        margin: 0px 7px;
        color: #2a6496;
        font-size: 18px;
    }
</style>
