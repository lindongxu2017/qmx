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
                                <span class="icon-plus"></span>
                                <span style="font-weight:bold;color:#666;" v-show="id == ''">创建礼品</span>
                                <span style="font-weight:bold;color:#666;" v-show="id != ''">编辑礼品</span>
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
                                            <label class="col-sm-2 control-label">产品名称</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" placeholder="请输入产品名称" style="color:#333" v-model="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">市场价格</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" placeholder="请输入市场价格" style="color:#333" v-model="price">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">备注信息</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" placeholder="请输入备注信息" style="color:#333" v-model="remark">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" for="exampleInputFile">上传图片</label>
                                            <input class="col-sm-3" style="padding-left: 14px;padding-top: 5px;" id="importFile" type="file" @change="selectFile()">
                                            
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">图片预览</label>
                                            <div><img :src="img" style="width:100px;padding-left:30px;"></div>
                                        </div> 
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label"></label>
                                            <progress style="width: 200px;margin-left: 15px;" :value="Number(progressLength)" max="100" v-show="controlProgress"></progress>
                                        </div> 
                                        
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10" v-if="isChange">
                                                <button type="button" class="btn btn-primary" @click="addGift">修改</button>
                                            </div>
                                            <div class="col-sm-offset-2 col-sm-10" v-if="!isChange">
                                                <button type="button" class="btn btn-primary" @click="addGift">创建</button>
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
    export default{
        name:'gift',
        data(){
            return{
                name:'',
                price:'',
                remark:'',
                progressLength:'0',
                controlProgress:false, //是否显示进度条
                importFile:'',   //文件对象
                id:'',
                isChange:false,
                img:''
            }
        },
        mounted(){
            var self = this;
            if (this.$route.params.id != undefined) {
                self.id =  this.$route.params.id;
                self.isChange = true;   //修改
                myFn.ajax('get',{id:self.id},apiAddress.giftDeal.giftDetails,function(res){
                    self.name = res.data.name;
                    self.price = res.data.market_price;
                    self.remark = res.data.remark;
                    self.importFile = res.data.image;
                    self.img = res.data.showimage;
                });
            }
        },
        methods:{
            
            //选择文件
            selectFile: function(){

                this.importFile = document.getElementById('importFile').files[0];

                this.img = window.URL.createObjectURL(document.getElementById('importFile').files[0]);

                this.progressLength = 0;
                
                this.controlProgress = false;   //隐藏进度条

            },

            //创建礼品
            addGift:function(){

                var self = this;

                if (self.name == '') {
                    alert('产品名称不能为空');
                    return false;
                };
                if (self.price == '') {
                    alert('产品价格不能为空');
                    return false;
                };
                if (self.importFile == '') {
                    alert('请选择产品图片');
                    return false;
                };


                self.progressLength = 100 ;

                self.controlProgress = true;    //显示进度条

                var form = new FormData();

                form.append('image',self.importFile);
                form.append('name',self.name);
                form.append('price',self.price);
                form.append('remark',self.remark);
                form.append('id',self.id);

                myFn.uploadFile(form,apiAddress.giftDeal.gift,function(res){
                    alert('创建成功')
                    if (self.id =='') {
                        self.name = '';
                        self.price = '';
                        self.remark = '';
                        self.importFile = '';
                        self.img = '';
                        document.getElementById('importFile').value = '';
                    }
                    self.controlProgress = false;    //上传成功隐藏进度条
                },self)
            }
        }
    }
</script>