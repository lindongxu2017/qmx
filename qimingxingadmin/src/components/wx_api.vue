<template>
    <div class="importOrder">
        <!--  PAPER WRAP -->
        <div class="wrap-fluid" id="roleManagement">
            <div class="container-fluid paper-wrap bevel tlbr">
                <!-- CONTENT -->
                <div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="fontawesome-comments"></span>
                                <span style="font-weight:bold;color:#666;">微信接口参数设置</span>
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
                                            <label class="col-sm-2 control-label">微信自定义token</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="wx.token">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">微信appid</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="wx.appid">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">微信secret</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="wx.secret">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
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
    name: 'importOrder',
        data () {
            return {
                wx:{
                    token:'',
                    appid:'',
                    secret:''
                }
            }
        },
        mounted (){
            var self = this;

            myFn.ajax('get', {}, apiAddress.wx.getParameter, function(res){
                for(var i in res.data){
                    if(res.data[i].name == "appid"){
                       self.wx.appid = res.data[i].value;
                    }else if(res.data[i].name == "token"){
                       self.wx.token = res.data[i].value;
                    }else if(res.data[i].name == "appsecret"){
                       self.wx.secret = res.data[i].value;
                    }
                }
            });


        },
        methods: {
            submit: function(){
                var data = {
                    token: this.wx.token,
                    appid: this.wx.appid,
                    appsecret: this.wx.secret
                }
                myFn.ajax('post', data, apiAddress.wx.parameter, function(res){
                    alert('保存成功');
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
