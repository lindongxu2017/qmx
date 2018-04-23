<template>
	<div class="proportion">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon-graph-bar"></span>
                                <span class="public-page-name">兑换比例</span>
                            </h2>
                        </div>
                    </div>
                </div>

				<!-- table-content -->
                <div class="content-wrap">
                    <div class="row">

                        <div class="col-sm-12">

                            <div class="nest" id="FootableClose">
                                <!-- <div class="title-alt">
                                    <h6>权限管理</h6>
                                </div> -->

                                <div class="body-nest">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">服务券</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control public-color-#ccc" value="1" readonly/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">现金</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control public-color-#ccc" v-model="proportion">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 control-label">手续费</label>
                                            <div class="col-sm-3">
                                                <input type="number" class="form-control public-color-#ccc" v-model="serviceCharge" style="width: 50%;display: inline-block;margin-right: 5px;">%
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
	name: 'proportion',
		data () {
			return {
                proportion:'',
                serviceCharge: ''
			}
		},
        mounted (){
            var self = this;

            // 获取当前兑换比例
            myFn.ajax('get', {}, apiAddress.volume.getParameter, function(res){
                self.proportion = res.data.value;
                self.serviceCharge = res.data.volume_service_charge;
            });

        },
        methods: {

            submit: function() {
                var data = {
                    "volume_conver_ratio" : this.proportion,
                    "volume_service_charge": this.serviceCharge
                }
                myFn.ajax('post', data, apiAddress.volume.setProportion, function(res){
                    alert('修改成功');
                });
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
