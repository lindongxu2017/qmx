<template>
    <div class="activationCodeAdd">
        <!--  PAPER WRAP -->
        <div class="wrap-fluid" id="roleManagement">
            <div class="container-fluid paper-wrap bevel tlbr">
                <!-- CONTENT -->
                <div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon-plus"></span>
                                <span style="font-weight:bold;color:#666;" v-show="id == ''">添加滴滴券类型</span>
                                <span style="font-weight:bold;color:#666;" v-show="id != ''">编辑滴滴券类型</span>
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
                                            <label class="col-sm-2 control-label">券名称</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="width:200px;color:#333" v-model="name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">购买所需服务券</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="width:200px;color:#333" v-model="volume">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">库存（剩余数量）</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="width:200px;color:#333" v-model="inventory">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" for="exampleInputFile">上传图片</label>
                                            <input class="col-sm-3" style="padding-left: 14px;padding-top: 5px;" id="importFile" type="file" @change="selectFile()">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" style="margin-top: 25px;">图片预览</label>
                                            <div><img :src="img" style="width:100px;padding-left:13px;"></div>
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
        name:'activationCodeAdd',
        data(){
            return{
                progressLength:'0',
                //是否显示进度条
                controlProgress:false,
                id:'',
                isChange:false,
                // 添加编辑
                importFile:'',   //文件对象
                img:'',
                name: '',
                volume: '',
                inventory: '',
                form: ''
            }
        },
        mounted(){
            var self = this;
            if (this.$route.params.id != undefined) {
                self.id =  this.$route.params.id;
                self.isChange = true;   //修改
                myFn.ajax('get',{id:self.id},apiAddress.didi.volumeinfo,function(res){
                    // self.importFile = res.data.image;
                    self.img = res.data.image;
                    self.volume = res.data.volume;
                    self.total_num = res.data.total_num;
                    self.name = res.data.name;
                    self.inventory = res.data.inventory;
                });
            }
            this.form = new FormData()
        },
        methods:{
            //选择文件
            selectFile: function(){

                this.importFile = document.getElementById('importFile').files[0];

                this.img = window.URL.createObjectURL(document.getElementById('importFile').files[0]);

                this.progressLength = 0;
                
                this.controlProgress = false;   //隐藏进度条

                this.form.append('img',this.importFile);

                console.log(this.importFile)

            },

            //创建礼品
            addGift:function(){

                var self = this;

                if (self.codeType == 0) {
                    alert('券类型不能为空');
                    return false;
                };
                if (self.expire_time == '') {
                    alert('过期时间不能为空');
                    return false;
                };
                if (self.importFile == '' && !this.isChange) {
                    alert('请选择产品图片');
                    return false;
                };


                self.progressLength = 100 ;

                self.controlProgress = true;    //显示进度条

                this.form.append('name',self.name);
                this.form.append('volume',self.volume);
                this.form.append('inventory',self.inventory);
                this.form.append('id',self.id);

                myFn.uploadFile(this.form,apiAddress.didi.add,function(res){
                    if (!self.isChange) {
                        alert('创建成功')
                    } else {
                        alert('修改成功')
                    }
                    if (self.id =='') {
                        self.name = '';
                        self.volume = '';
                        self.inventory = '';
                        self.importFile = '';
                        document.getElementById('importFile').value = '';
                    }
                    self.controlProgress = false;    //上传成功隐藏进度条
                    self.$router.push('/index/didiCode')
                },self)
            }
        }
    }
</script>