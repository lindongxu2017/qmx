<template>
	<div class="queryOrderEdit">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon-plus"></span>
                                <span v-show="id == ''">添加订单</span>
                                <span v-show="id != ''">编辑订单</span>
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

                                <div class="body-nest">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">公司名称</label>
                                            <div class="col-sm-3">
                                                <select class="form-control" v-model="companylist.selectId">
                                                    <option v-for="item in companylist.list" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">客户姓名</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="customerName">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">客户电话</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="mobile">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">车牌号</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="licenseNumber">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">订单类型</label>
                                            <div class="col-sm-3">
                                                <select class="form-control" v-model="orderType.selectId">
                                                    <option v-for="item in orderType.list" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">保单金额</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="amount">
                                            </div>
                                        </div>
                                        <div class="form-group">

                                            <label class="col-sm-1 control-label">订单地址</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="orderAddr">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">状态</label>
                                            <div class="col-sm-3">
                                                <select class="form-control" v-model="orderStatus.selectId">
                                                    <option v-for="item in orderStatus.list" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="form-group">
                                            <div class="col-sm-offset-1 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="submit">保存</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'queryOrderEdit',
		data () {
			return {
                id:1,
                companylist:{
                    list:[1],
                    selectId:1,
                },
                customerName:'',
                mobile:'',
                licenseNumber:'',
                orderType:{
                   list:[1],
                   selectId:1
                },
                amount:'',
                orderAddr:'',
                orderStatus:{
                    list:[],
                    selectId:1
                }
			}
		},
        mounted (){
            var self = this;

            // 获取公司列表
            // myFn.getCompanyList(self.companylist, 'list');

            // // 获取订单类型列表
            // myFn.getOrderTypeList(self.orderType, 'list');

            // // 获取订单类型状态
            // myFn.getOrderStatusList(self.orderStatus, 'list');

            // self.id = self.$route.params.id;

            // myFn.ajax('get', {id: self.id}, apiAddress.importOrder.orderDetail, function(res){
            //     self.companylist.selectId = res.data.company_id;
            //     self.customerName = res.data.customer_name;
            //     self.mobile = res.data.mobile;
            //     self.licenseNumber = res.data.license_number;
            //     self.orderType.selectId = res.data.type;
            //     self.amount = res.data.amount;
            //     self.orderAddr = res.data.order_addr;
            //     self.orderStatus.selectId = res.data.status;
            // });

        },
        methods: {

            submit: function(){

                var data = {
                    id:this.id,
                    companyId:this.companylist.selectId,
                    customerName:this.customerName,
                    mobile:this.mobile,
                    licenseNumber:this.licenseNumber,
                    type:this.orderType.selectId,
                    amount:this.amount,
                    orderAddr:this.orderAddr,
                    status:this.orderStatus.selectId
                    
                }

                myFn.ajax('post', data, apiAddress.importOrder.orderEdit, function(res){
                    alert('保存成功');
                    self.$router.push({path:'/index/queryOrder'});
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
