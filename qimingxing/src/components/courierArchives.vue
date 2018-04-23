<template>
	<div class="admin">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-book"></span>
	                            <span style="font-weight:bold;color:#666;">配送员档案</span>
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
                                                <th style="width:50px;">
                                                    序号
                                                </th>
                                                <th style="width:130px;">
                                                    编号
                                                </th>
                                                <th style="width:100px;">
                                                    姓名
                                                </th>
                                                <!-- <th style="width:150px;">
                                                    联系电话
                                                </th> -->
                                                <th>
                                                    备注信息
                                                </th>
                                                <th>
                                                    操作
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in courierArchivesList.data">
                                                <td style="text-align: center;" v-html="index+((current-1)*10)+1"></td>
                                                <td v-html="item.dm_code"></td>
                                                <td v-html="item.dm_name"></td>
                                                <!-- <td v-html="item.dm_phone"></td> -->
                                                <td v-html="item.remark"></td>
                                                <td style="width: 300px;text-align: center;">
                                                    <button data-toggle="modal" data-target="#myModal" type="button" class="btn btn-warning" @click="addAdjustmentUser(item.id, index)"><span class="icon icon-reply-all"></span>调离</button>
                                                    <button type="button" class="btn btn-primary" @click="editCourier(item.id)"><span class="fontawesome-edit"></span>编辑</button>
                                                    <button v-show="item.status == 1" type="button" class="btn btn-danger" @click="userDel(item.id, 2, item)"><span class="icon icon-lock"></span>冻结</button>
                                                    <button v-show="item.status == 2" type="button" class="btn btn-success" @click="userDel(item.id, 1, item)"><span class="icon icon-lock-open"></span>解冻</button>

                                                    <button type="button" class="btn btn-danger" @click="delUser(item, index)"><span class="entypo-cancel-squared"></span>删除</button>
                                                   <!--  <button v-show="item.status == 2" type="button" class="btn btn-success" @click="userDel(item.id, 1, item)"><span class="icon icon-lock-open"></span>删除</button> -->

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

                                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
                                    <div class="modal-dialog" role="document">  
                                        <div class="modal-content">  
                                            <div class="modal-header">  
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
                                                    <span aria-hidden="true">×</span>  
                                                </button>  
                                                <h4 class="modal-title" id="myModalLabel">配送员调离(选择站点)</h4>  
                                            </div>  
                                            <div class="modal-body">  
                                                <div>
                                                    <select class="form-control" v-model="selectSite">
                                                        <option v-for="item in siteList.data" :value="item.id">{{item.dis_name}}</option>
                                                    </select>
                                                </div>  
                                            </div>  
                                            <div class="modal-footer">  
                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
                                                <button type="button" class="btn btn-primary" @click="setAdjustment">调离</button>  
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
	name: 'admin',
		data () {
			return {
				courierArchivesList:[],
                siteList:[],
                // 调离配送员
                selectSite:'',
                adjustment:{
                    user_id:'',
                    Index:''
                },
                // 分页
                current:0,
                showItem:20,
                allpage:1,
                total:''
			}
		},
		mounted(){

			var self = this;

			// myFn.ajax('get', {}, apiAddress.courier.courierArchivesList, function(res){
   //              self.courierArchivesList = res.data;
   //          });

            myFn.ajax('get', {}, apiAddress.site.siteList, function(res){
                self.siteList = res.data;
                self.selectSite = res.data.data[0].id;

            });

            this.goto(1);
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
		methods: {
            // 添加调离配送员
            addAdjustmentUser: function(id, index){
                this.adjustment.user_id = id;
                this.Index = index;
            },
            // 确认调离
            setAdjustment:function(){
                var self = this;
                var data = {
                    user_id: this.adjustment.user_id,
                    station_id: this.selectSite
                }
                myFn.ajax('post', data, apiAddress.courier.adjustment, function(res){
                    $('#myModal').modal('toggle');
                    self.courierArchivesList.data.splice(self.adjustment.Index, 1);
                });
            },
            // 编辑配送员
            editCourier: function(id){
                this.$router.push({name:'courierEdit', params:{id:id}});
            },
            // 冻结配送员
            userDel: function(id, state, item){

                var self = this;
                var data = {
                    user_id: id,
                    is_freeze: state
                }

                if(confirm('确定要冻结当前配送员吗')){
                    myFn.ajax('post', data, apiAddress.courier.courierDel, function(res){
                        self.siteList = res.data;
                        item.status == 1? item.status = 2 : item.status = 1;
                    });
                }
            },
            // 删除配送员
            delUser: function(item, index){
                var self = this;
                var data = {
                    userId: item.id,
                }
                if (confirm('删除配送员')) {
                    myFn.ajax('post', data, apiAddress.courier.del, function(res){
                        self.courierArchivesList.data.splice(index, 1);
                    });
                }
            },
            goto: function(index, query){
                
                if(index == this.current && query != true) return;
                this.current = index;
                var self = this;

                var data = {
                    page: index,
                    allocated: 2,
                    check_status:2
                }

                myFn.ajax('get', data, apiAddress.courier.courierArchivesList, function(res){
                    self.showItem = res.data.per_page;
                    self.current = res.data.current_page;
                    self.allpage = res.data.last_page;
                    self.courierArchivesList = res.data;
                    self.total = res.data.total;
                });
            }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-dialog{
        width: 350px;
        margin-top: 150px;
    }
    #myModalLabel{
        text-align: center;
    }
    .modal-body{
        margin-top: 20px;
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
