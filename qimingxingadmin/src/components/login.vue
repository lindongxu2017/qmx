<template>
    <div class="login">
        <!-- Preloader -->
        <!--  <div id="preloader">
            <div id="status">&nbsp;</div>
        </div> -->
        
        <div class="container">

            <div class="logoleft">
                <img src="../assets/star2.png">
            </div>
            
            <!-- <div class="culture">
                专业<span>/</span>极致<span>/</span>口碑
            </div> -->

            <div class="login-content" id="login-wrapper">
                <div class="row" style="border-bottom:1px solid #C8C8C8; ">
                    
                        <div id="logo-login">
                            <p><img src="../assets/pic.png"><span style="vertical-align:sub">配送管理系统</span><span style="font-size:14px;vertical-align:sub"> V2.0</span></p>
                        </div>
                    
                </div>

                <div class="row" id="login">
                    
                        <div class="account-box"> 
                            <form role="form">
                                <div class="form-group">
                                    <input type="text" id="inputUsernameEmail" class="form-control" placeholder="用户名：" required v-model="username">
                                </div>
                                <div class="form-group">
                                    <input type="password" id="inputPassword" class="form-control" placeholder="密 码：" required v-model="pswd">
                                </div>

                                <div class="form-group has-success has-feedback">
                                    <input type="text" class="form-control" id="myCode" v-model="myCode">
                                    <img  :src="codeImg" class="form-control-feedback code" @click="getCode()">
                                </div>
                                <!-- 9 -->
                                <button type="button" class="btn btn-primary btn-block pull-right" @click="login">
                                    登 录
                                </button>
 
                            </form>
                            <a class="forgotLnk" href="index.html"></a>
                            
                            <div class="row-block">
                                <div class="row">
                                </div>
                            </div>
                        </div>
                    
                    <div class="leftImg"><img src="../assets/left.png"></div>
                    <div class="rightImg"><img src="../assets/right.png"></div>
                </div>
            </div>

<!--             <p>&nbsp;</p>
            <div style="text-align:center;margin:0 auto;">
                <h6 style="color:#fff;">Copyright(C)2014 fjcloudsoft.com All Rights Reserved<br />
                    xxxxx 网络科技有限公司 版权所有 闽IP备07****05号</h6>
            </div> -->

        </div>    
    </div>
</template>

<script>
export default {
    name: 'login',
        data () {
            return {
                username:'',
                pswd:'',
                myCode:'',
                codeImg:''
            }
        },
        mounted (){
            this.getCode();
            function sizeChange(){
                $('.container').height($(window).height())
                $('.container').width($(window).width())
            }
            sizeChange()
            window.onresize=function(){  
                 sizeChange();  
            } 
        },
        methods:{
            getCode:function(){     //获取验证码
                this.codeImg = '/public/getCode?random=' + Math.random(0,1);
            },
            // 登录
            login: function(){

                if(this.username == ''){
                    alert('账号不能为空');
                    return false;
                }

                if(this.pswd == ''){
                    alert('密码不能为空');
                    return false;
                }

                var data = {
                    username: this.username,
                    password: this.pswd,
                    code:this.myCode
                }

                var self = this;
                myFn.ajax('post', data, apiAddress.login.login, function(res){
                    localStorage.userInfo = JSON.stringify(res.data);
                    myFn.ajax('get', data, apiAddress.jurisdiction.myList, function(res){
                        var jurisdictionList = {};
                        for (var i=0; i<res.data.length; i++) {
                            jurisdictionList[res.data[i].pri_id] = res.data[i].pri_id;
                        }
                        localStorage.jurisdiction = JSON.stringify(jurisdictionList);
                    });
                    self.$router.push({path:'/index/welcome'});
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
      font-weight: normal;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }

    a {
      color: #42b983;
    }
    .row{
        margin: 0;
    }
    #logo-login{
        width: 420px;
        font-size: 24px;
        height: 106px;
        padding: 20px 0;
        text-align: center;
        border-radius: 10px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: #fff;
        color: #F97449;
    }
    #logo-login p{
        margin-bottom: 0;
        letter-spacing: 0.5px;
        font-weight: 900;
        vertical-align: sub;
    }
    #logo-login img{
        width: 70px;
        margin-top: -10px;
        margin-right: 30px;
        margin-left: -30px;
    }
    #logo-login .title{
        vertical-align: text-bottom;
    }
    form {
        margin-top: 15px;
    }
    .container{
       /*  background-image: url(../assets/backImg.png); */
        background-size: contain;
        background-position: center center;
        position: relative;
    }
    .login-content{
        width: 420px;
    }
    #login-wrapper{
        margin:auto;
        margin-top: 13%;
        border-radius: 10px;
    }
    #login{
        position: relative;
    }
    .leftImg{
        position: absolute;
        left: -40px;
        top: 100px;
        z-index: -1;
    }
    .rightImg{
        position: absolute;
        right: -48px;
        top: -80px;
    }
    .account-box{
        border-radius: 10px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        padding-left: 60px;
        padding-right: 60px;
    }
    .code{
        width:100px;
        height: 36px;
        padding:2px;
        margin-top:-26px;
        margin-left: -2px;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        right: -1px;
    }
    .btn-block{
        background-color: #F7AF15;
        padding:7px 0 !important;
        margin-top: 15px;
    }
    .form-group{
        margin-bottom: 20px;
    }
    .logoleft{
        position: absolute;
        top: 100px;
        left: 100px;
    }
    .logoleft img{
        width: 60px;
        transform: rotateX(30deg);
        transform: rotateZ(5deg);
        -ms-transform:rotateX(30deg);     /* IE 9 */
        -moz-transform:rotateX(30deg);    /* Firefox */
        -webkit-transform:rotateX(30deg); /* Safari 和 Chrome */
        -o-transform:rotateX(30deg);  /* Opera */
        -ms-transform:rotateZ(5deg);     /* IE 9 */
        -moz-transform:rotateZ(5deg);    /* Firefox */
        -webkit-transform:rotateZ(5deg); /* Safari 和 Chrome */
        -o-transform:rotateZ(5deg);  /* Opera */    
    }
    /* .culture{
        position: absolute;
        right: 30px;
        top: 45px;
        font-size: 24px;
        color: #DA4F2C;
    }
    .culture span{
        margin: 0 15px;
    } */
</style>
