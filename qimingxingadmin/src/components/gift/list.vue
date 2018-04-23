<template>
	<div class="giftList">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="icon icon-document"></span>
	                            <span style="font-weight:bold;color:#666;">礼品列表</span>
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
	                                    <div class="row" style="margin-bottom:20px">    
	                                        <div class="col-md-10 col-sm-10"></div>
	                                        <div class="col-md-2 col-sm-2" style="text-align:right">
	                                            <router-link to="giftAdd"><button type="button" class="btn btn-info"><span class="entypo-plus"></span>&nbsp;添加礼品</button></router-link>
	                                        </div>
	                                    </div>
	                                    <table class="table-striped footable-res footable metro-blue" data-page-size="6">
	                                        <thead>
	                                            <tr>
	                                            	<th style="width: 50px;">
	                                                    序号
	                                                </th>
	                                                <th>
	                                                    礼品名称
	                                                </th>
	                                                <th>
	                                                	礼品图片
	                                                </th>
	                                                <th>
	                                                    价格
	                                                </th> 
	                                                <th>
	                                                    备注信息
	                                                </th> 
	                                                <th v-if="jurisdiction.show_eidtButton||jurisdiction.show_delButton">
	                                                    操作
	                                                </th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                            <tr v-for="(item, index) in list">
	                                            	<td v-html="index+((current-1)*10)+1" style="text-align: center;"></td>
	                                                <td v-html="item.name"></td>
	                                                <td> <img :src="item.showimage" width="80" height="80"> </td>
	                                                <td v-html="item.market_price"></td>
	                                                <td v-html="item.remark"></td>
	                                                <td  style="width: 200px;text-align: center;" v-if="jurisdiction.show_eidtButton||jurisdiction.show_delButton">
	                                                    <button v-if="jurisdiction.show_eidtButton" type="button" class="btn btn-primary" @click="giftEdit(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button>
	                                                    <button v-if="jurisdiction.show_delButton" type="button" class="btn btn-danger" @click="giftDel(item.id, index)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;删除</button>
	                                                </td>
	                                            </tr>
	                                            
	                                        </tbody>
	                                    </table>

					                    <!-- PAGE -->
										<ul class="pagination" v-show="allpage>1">
								            <li v-show="current != 1" @click="current-- && getlist(current--)" ><a>上一页</a></li>
								            <li v-for="index in pages" @click="getlist(index)" :class="{'active':current == index}" :key="index">
								              	<a>{{index}}</a>
								            </li>
								            <li v-show="allpage != current && allpage != 0 " @click="current++ && getlist(current++)"><a>下一页</a></li>
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
	export default{
		name:'giftList',
		data(){
			return{
				list:[''],
				allpage:1,
				current:0,
				showItem:10,
				jurisdiction:{}
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

            // 权限控制
            this.jurisdiction.show_eidtButton = myFn.getLocalStorageVal('jurisdiction', 30) ? true : false;
            this.jurisdiction.show_delButton = myFn.getLocalStorageVal('jurisdiction', 31) ? true : false;

            this.getlist(1);	// 获取第一页数据

        },
        methods:{
        	getlist:function(index){
        		var self = this;
        		if(index == self.current) return;
	            self.current = index;
	            myFn.ajax('get', {page:index}, apiAddress.giftDeal.giftList, function(res){			
    				self.showItem = res.data.per_page;
    				self.current = res.data.current_page;
    				self.allpage = res.data.last_page;
    				self.list = res.data.data;
	            });

	            console.log(self.current)
        	},
        	giftEdit:function(id){
        		this.$router.push({name:'giftAdd', params:{id:id}});
        	},
        	giftDel:function(id,index){
        		var self = this;
        		if (confirm('确定要删除当前礼品')) {
	        		myFn.ajax('POST',{id:id},apiAddress.giftDeal.giftDel,function(){
	        			self.list.splice(index,1);
	        		});
        		}
        	}
        }
	}
</script>

