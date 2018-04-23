<template>
	<div class="orderAllocation">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="fontawesome-sitemap"></span>
                                <span style="font-weight:bold;color:#666;">订单分配</span>
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
                                    <form class="form-horizontal" style="width: 500px;display: inline-block;">

                                        <div class="form-group">
                                            <label class="col-sm-5 control-label" for="exampleInputFile">上传配送订单</label>
                                            <input style="padding-left: 14px;padding-top: 5px;" id="importFile" type="file" @change="selectFile()">
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="col-sm-offset-5 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="Verification" v-show="!isVerify">验证</button>
                                                <button type="button" class="btn btn-success" @click="submit" :disabled="isComplete || errorList.length != 0" v-show="isVerify">导入</button>
                                            </div>
                                        </div>

                                    </form>

                                    <div v-show="errorList.length != 0 " style="width: 500px;display: inline-block;margin-left: 150px;margin-top: 30px;vertical-align: top;">
                                        <h5>错误数量 <span style="color: red;font-size: 25px;font-weight: 900;">{{errorList.length}}</span> 条</h5>
                                        <table class="table-striped footable-res footable metro-blue" data-page-size="6" >
                                            <thead>
                                                <tr>
                                                    <th style="width: 20px;">
                                                        错误行号
                                                    </th>
                                                    <th style="width: 150px;">
                                                        错误原因
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in errorList">
                                                    <td v-html="item.errorLine"></td>
                                                    <td v-html="item.msg"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

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
	name: 'orderAllocation',
		data () {
			return {
                importFile:null,
                errorList:[],
                progressLength:0, //上传进度
                isVerify:false,  // 验证是否成功
                isComplete: true, // 是否显示导入按钮
                controlProgress:false // 是否显示进度条
			}
		},
        mounted (){
            

        },
        methods: {

            selectFile: function(){
                this.importFile = document.getElementById('importFile').files[0];
            },


            // 验证
            Verification: function() {
                if(this.importFile == '' || this.importFile === null){
                    alert('请选择文件');
                    return false;
                }

                var self = this;
                self.controlProgress = true;
                self.progressLength = 100;

                setTimeout(function(){
                    self.controlProgress = false;
                    self.progressLength = 0;
                },500);

                var form = new FormData();

                form.append('order', this.importFile);
                form.append('isConfirm', 0);

                setTimeout(function(){
                    myFn.uploadFile(form, apiAddress.site.importOrder, function(res){
                        if (res.data.error.length == 0) {
                            self.isVerify = true;
                        }
                        self.errorList = res.data.error;
                        self.isComplete = false;
                        self.progressLength = 0;
                    }, self);
                },500)
                

            },

            submit: function(){
                var form = new FormData();
                form.append('order', this.importFile);
                form.append('isConfirm', 1);
                var self = this;
                myFn.uploadFile(form, apiAddress.site.importOrder, function(res){
                    alert('导入成功');
                    document.getElementById('importFile').value = '';
                    self.importFile = '';
                    self.isComplete = true;
                    self.controlProgress = false; //是否显示进度条
                    self.isVerify = false;  //验证是否成功
                })
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .downFile{
        margin-left: 15px;
        padding-top: 7px;
        display: inline-block;
    }
</style>
