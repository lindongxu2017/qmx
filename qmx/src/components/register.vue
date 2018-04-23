<template>
    <div class="register">
        <div class="content">
            <div class="content native-scroll">

                <!-- <div class="content-block-title">
                    <img src="../assets/icon/zhandian.png"> 身份选择
                </div>  -->
                <div class="content-block">
                    <div class="list-block">
                        <div class="content-block-title"><i class="iconfont icon-qiehuanshenfen"></i> 选择身份</div> 
                        <ul class="input_box" style="border:none;background:#e5e5e5;">
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <!-- <div class="item-title label">身份</div> -->
                                        <div class="item-input">
                                            <input type="text" id="city-picker2" placeholder="请选择身份" v-model="identity.name" style="text-align:center;" @change="changeVal(2)">
                                        </div>
                                        <label style="display: none;" for="city-picker2" class="icon icon-down"></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="list-block" v-show=" identity.name == '配送员' ">
                        <div class="content-block-title"><i class="iconfont icon-zhandianguanli"></i> 配送站点</div> 
                        <ul class="input_box" style="border:none;background:#e5e5e5;">
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <!-- <div class="item-title label">配送站点</div> -->
                                        <div class="item-input">
                                            <input type="text" id="city-picker1" placeholder="请选择站点" style="text-align:center;" @change="changeVal(1)">
                                        </div>
                                        <label for="city-picker1" class="icon icon-down"></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="list-block" v-show=" identity.name == '保险员' ">
                        <div class="content-block-title"><img src="../assets/icon/zhandian.png"> 所属公司</div> 
                        <ul class="input_box" style="border:none;background:#e5e5e5;">
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <!-- <div class="item-title label">配送站点</div> -->
                                        <div class="item-input">
                                            <input type="text" id="city-picker3" placeholder="请选择公司"  style="text-align:center;" @change="changeVal(3)">
                                        </div>
                                        <label for="city-picker3" class="icon icon-down"></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="list-block">
                        <ul class="input_box">
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label"><i class="iconfont icon-xingming"></i> 姓名：</div>
                                        <div class="item-input">
                                            <input type="text" v-model="name" placeholder="请输入姓名">
                                        </div>
                                        <!-- <label for="" class="icon icon-down"></label> -->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block">
                        <ul class="input_box">
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label"><i class="iconfont icon-shoujihao"></i> 手机号：</div>
                                        <div class="item-input">
                                            <input type="text" v-model="mobile" placeholder="请输入手机号码">
                                        </div>
                                        <!-- <label for="" class="icon icon-down"></label> -->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block" style="margin-bottom:0">
                        <ul class="input_box">
                            <!-- Text inputs -->
                            <li>
                                <div class="item-content">
                                    <div class="item-inner" style="padding:0;">
                                        <div class="item-title label"><i class="iconfont icon-chanpinyanzheng"></i> 验证码：</div>
                                        <div class="item-input">
                                            <input style="paddingLeft: 0;" type="text" placeholder="手机验证码" v-model="code" >
                                        </div>
                                        <div class="get-code-btn" :style="getCodeVal?background1:background2" @click="getCode()" v-html="getCodeTxt"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-100" style="margin-top:3.5rem">
                            <p class="button button-big" style="background:#f08200;color:#fff;" @click="submit">注册</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            getCodeTxt:'获取验证码',
            getCodeVal: true,
            background1:'background:#F08200;color:#fff',
            background2:'background:#E5E5E5;color:#999;border-color:#999',


            site:'',
            name:'',
            mobile:'',
            code:'',
            
            // 选中身份类型文本
            identity:{
                name:'配送员',
                value:'1'
            },
            // 公司列表
            conpanylist:[{
                name:''
            }],
            // 选中的公司值
            conpany:{
                name:'',
                value:''
            },
            // 站点列表
            sitelist:[{
                dis_name:''
            }],
            // 选中站点
            selectSite:{
                name:'',
                value:'',
            },
            company:'',
        }
    },
    beforeCreate() {

        // if(localStorage.userInfo != undefined) {
        //     if(myFn.getUserInfo('type') != undefined && myFn.getUserInfo('type') == 1){
        //         this.$router.push({name:'todayTask'});
        //     }
        // }
        this.getUser();
    },
　　watch:{
        conpanylist(curVal, oldVal){
            var list = []
            for(var i in curVal){
                list.push(curVal[i].name)
            }

            this.conpany.name = curVal[0].name;
            this.conpany.value = curVal[0].id;
            $("#city-picker3").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">确定</button>\
                    <h1 class="title">请选择公司</h1>\
                    </header>',
                cols: [
                    {
                        values: list
                    }
                ]
            });
        },
        sitelist(curVal, oldVal){
            var list = []
            for(var i in curVal){
                list.push(curVal[i].dis_name)
            }
            this.selectSite.name = curVal[0].dis_name;
            this.selectSite.value = curVal[0].id;
            $("#city-picker1").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">确定</button>\
                    <h1 class="title">请选择站点</h1>\
                    </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: list
                    }
                ]
            });
        }
    },
    mounted () {

        myFn.getCompanyList(this, 'conpanylist');
        myFn.getStationList(this, 'sitelist');

        // 设置默认站点
        $('#city-picker1').val(this.sitelist[0].dis_name);

        var self = this;

        var list = []
        if(myFn.GetQueryString('type') == undefined){
            list[0] = '配送员';
        }else{
            list[0] = '保险员';
            this.identity.name = '保险员';
            this.identity.value = 2;
        }

        $("#city-picker2").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择身份</h1>\
                </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: list
                }
            ]
        });

        this.getUser();
        /*$("#city-picker3").picker("setValue", ['1','2']);*/   
    },
    methods:{
        getUser: function(){
            var self = this;
             setTimeout(function(){

                if(localStorage.userInfo != undefined) {
                    if(myFn.getUserInfo('type') != undefined && myFn.getUserInfo('type') == 1){
                        self.$router.push({name:'todayTask'});
                    }
                }else{
                    self.getUser();
                }
            }, 1000);
        },
        changeVal: function(tag){
            switch(tag){
                case 1:
                    this.selectSite.name = $("#city-picker1").val();
                    break;
                case 2:    
                    this.identity.name = $("#city-picker2").val();
                    if( this.identity.name == '配送员'){
                        this.identity.value = 1;
                    }else{
                        this.identity.value = 2;
                    }
                    break;
                case 3:
                    this.conpany.name = $("#city-picker3").val();
                    break;
            }

            /*console.log(this.selectSite.name)*/
        },
        submit:function(){

            // 当前所选公司
            for(var i in this.conpanylist){
                if(this.conpanylist[i].name == this.conpany.name){
                    this.conpany.value = this.conpanylist[i].id;
                }
            } 


            for(var x in this.sitelist){
                if(this.sitelist[x].dis_name == $('#city-picker1').val()){
                    this.selectSite.value = this.sitelist[x].id;
                }
            } 

            if(this.name == ''){
                alert('姓名不能为空');
                return false;
            }

            if(this.mobile == ''){
                alert('手机号码不能为空');
                return false;
            }

            if(this.code =='' ){
                alert('验证码不能为空');
                return false;
            }

            var data = {
                // 身份类型
                type:this.identity.value,
                dm_name: this.name,
                dm_phone: this.mobile,
                sms_code: this.code
            }

            // 选择配送员添加城市id
            if(this.identity.value == 1){
                data.station_id = this.selectSite.value;
            }
            // 选择保险员时候添加公司id
            if(this.identity.value == 2){
                data.company_id = this.conpany.value;
            }
            var self = this;
            myFn.ajax('post', data, apiAddress.login.register, function(res){
                /*if (self.identity.value == 1) {
                  self.$router.push({name:'todayTask'});
                  myFn.setUserInfo('type', 1);
                } else {
                  self.$router.push({name:'search'});
                  myFn.setUserInfo('type', 2);
                }*/
                
                self.$router.push({name:'audit'});
            });
        },
        getCode:function(){

            var self = this;
            myFn.ajax('post',{phone:self.mobile,type:2}, apiAddress.phone.code,function(res){
                if (self.getCodeVal == true) {
                    self.getCodeVal = !self.getCodeVal;
                    self.getCodeTxt = 60 + ' s';
                    var t = setInterval(function(){
                        self.getCodeTxt = parseInt(self.getCodeTxt) - 1 + ' s';
                    },1000)
                    setTimeout(function(){
                        self.getCodeVal = !self.getCodeVal;
                        self.getCodeTxt = '获取验证码';
                        clearInterval(t);
                    },61000)
                };
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list-block{
        margin: 0.75rem 0;
        font-size: 0.8rem;
    }
    .input_box{
        border: 1px solid #A9A9A9;
    }
    .input_style{
        margin-top: 0.75rem;
    }
    .input_style input{
        width: 100%;
        height: 50px;
        font-size: 0.7rem;
        text-indent: 0.75rem;
        color: #101010;
    }
    .code{
        position: fixed;
        bottom: 0;
        height: 49px;
        border-top: 1px solid #A9A9A9;
        width: 100%;
        background: #fff;
        text-align: center;
        line-height: 49px;
        color: #FF9800;
        font-size: 1.2rem;
    }
    p{
        margin-top: 0
    }
    .content{
        background-color: #fff;
    }
    .content-block-title img{
        vertical-align: middle;
    }
    .content-block-title {
        font-size: 16px;
        color: #231815;
        margin-left: 0;
        margin-bottom: 10px;
    }
    #city-picker{
        text-align: center;
        height: 46px;
    }
    .item-title img{
        vertical-align: top;
    }
    .list-block .item-content{
        padding-left: 0;
    }
    .input_box{
        border: none;
    }
    .get-code-btn{
        width:270px;
        text-align:center;
        color:#fff;
        background-color: #f08200;
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0 10px;
    }
    .button{
        border:none;
    }
    .label{
        color: #231815;
    }

</style>
