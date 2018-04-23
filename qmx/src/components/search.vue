<template>
    <div class="search">

        <div class="identity">
            <div class="row" style="padding-top:10px;">
                <div class="col-80">
                    <img :src="headeImg">
                    <div style="display: inline-block;vertical-align: bottom;">
                        <span class="identity-txt" v-show="identityType==undefined">身份: 普通身份</span>
                        <span class="identity-txt" v-show="identity!=0">身份: {{identity}}</span>
                        <br/>
                        <span class="identity-txt" v-show="identityType==1">所属: {{station_name}}</span>
                        <span class="identity-txt" v-show="identityType==2">所属: {{company_name}}</span>
                    </div>
                </div>
                <div class="col-20" v-show="identityType!=1&&identityType!=2"><button @click="goYz" >验证</button></div>
            </div>
        </div>

        <div class="bar bar-header-secondary">
            <div class="searchbar">
                <a class="searchbar-cancel" @click="clear()">取消</a>
                <div class="search-input">
                    <div class="icon icon-search" @click="search()"></div>
                    <input type="search" id='search' placeholder='请输入订单号/车牌号' v-model="code" @keyup.enter="search()">
                </div>
            </div>
        </div>

        <div class="content-list" v-show="msg.customer_name!=undefined"> <!-- v-show="active == 200" -->
            <div class="my-content">
                <div class="row" style="padding-bottom:7px;">
                    <div class="col-70"><p>订单号：<span v-html="msg.code"></span></p></div>
                    <div class="col-100 order-time"><span style="padding-left:5px;">分配时间：</span><span v-html="msg.create_time"></span></div>
                </div>
                <div class="center-content">
                    <div class="row" style="border-top: 1px solid #e6e6e6;">
                        <div class="col-50"><p>姓名：{{msg.customer_name}}</p></div>
                        <div class="col-50" style="padding-left:8px;"><p>类型：{{msg.typeMsg}}</p></div>
                    </div>
                     <div class="row" style="padding-top:0">
                        <div class="col-50"><p>车牌：{{msg.license_number}}</p></div>
                        <div class="col-50" style="padding-left:8px;"><p>站点：{{msg.dis_name}}</p></div>
                    </div>
                    <div class="footer-content" style="padding:0;border-top: 1px solid #e6e6e6; ">
                        <!-- <p>状态：<span style="color:#00A4F0;" v-html="msg.statusMsg"></span></p> -->
                        <div class="row" style="padding:0">
                            <div class="col-50" style="padding:0"><p style="padding-left:15px;">状态：<span style="color:#00A4F0;" v-html="msg.statusMsg"></span></p></div>
                            <div class="col-50" v-if="msg.status == 3"><p style="font-size:12px">签收时间：<span v-html="msg.finish_time"></span></p></div>
                        </div>
                    </div>
                    <div class="footer-content" v-show="msg.status==5">
                        <p style="border:none;padding-top:0">备注：<span v-html="msg.message"></span></p>
                        <!-- <p v-for="item in msg.changeAboutList"><span v-html="item.create_time"></span><span v-html="item.change_after_time"></span></p>样式修改 -->
                        
                        <div v-for="item in msg.changeAboutList" style="padding: 0">
                            <p style="padding:0;font-size:14px;padding-top:5px;border-top:1px solid #e7e7e7">操作时间：<span v-html="item.create_time"></span></p>
                            <p style="padding:0;font-size:14px;padding-bottom:5px;">改约时间：<span v-html="item.change_after_time"></span></p>
                        </div>
                    </div>
                    <div class="footer-content" v-show="msg.status==4"><p style="border:none;padding-top:0">异常原因：<span v-html="msg.message"></span></p></div>



                    <!-- <div class="footer-content" v-show="msg.status==2"><p style="border: none;">失败详情：<span v-html="msg.ordeBack.typeMsg"></span></p></div> -->
                </div>
            </div>
        </div>
        
        <div class="feedback"  @click="goFeddback(msg.id)" v-show="identityType==2 && msg.customer_name!=undefined">
            <div class="list-block">
                <ul>
                    <li class="item-content item-link">
                        <div class="item-media"><i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                          <div class="item-title">反馈</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <p style="padding:10px 0;text-align:center;color:#999;font-size:14px;margin-top:2.3rem;" v-html="tips" v-show="active == 10000"></p>

        <div class="logo" style="text-align:center;margin-top:30px;"><img src="../assets/logo.png" width="70"></div>
        <p class="culture-desc"><span>专业</span><span>极致</span><span>口碑</span></p>
    </div>
</template>

<script>


export default {
    name: 'search',
    data () {
        return {
            code:'',
            msg:{},
            active:'-1',
            tips:'',
            identityType:1,
            headeImg:'',
            identity:'',
            station_name:'',
            company_name:'',
        }
    },
    mounted() {

        this.getUser();

        if(localStorage.userInfo != undefined){
            this.identityType = myFn.getUserInfo('type');
            this.station_name = myFn.getUserInfo('station_name');
            this.company_name = myFn.getUserInfo('company_name');

            if (this.identityType == 1) {
                this.identity = '配送员'
            }else if(this.identityType == 2){
                this.identity = '保险员'
            }else{
                this.indentify = '普通身份'
            }
            this.headeImg = myFn.getUserInfo('headimgurl');
        }
    },
    methods:{
        getUser: function(){
            var self = this;
             setTimeout(function(){
                if(localStorage.userInfo == undefined) {
                    self.getUser();
                }else{
                    self.identityType = myFn.getUserInfo('type');
                    this.station_name = myFn.getUserInfo('station_name');
                    this.company_name = myFn.getUserInfo('company_name');
                    if (self.identityType == 1) {
                        self.identity = '配送员'
                    }else if(self.identityType == 2){
                        self.identity = '保险员'
                    }else{
                        self.indentify = '普通身份'
                    }
                    self.headeImg = myFn.getUserInfo('headimgurl');
                }
            }, 1000);
        },
        goYz: function(){
            location.href = '/wxHome/?type=2#/'
            this.$router.push({name:'register'});
        },
        search:function(){
            var self = this;
            $.getJSON('/public/home/order/query',{orderSn:this.code},function(res){
                if (res.code == 200) {
                    res.data.create_time = res.data.create_time.substring(0,10) 
                    self.msg = res.data;
                    self.active = res.code;
                }else{
                    self.msg = {};
                    self.tips = res.msg;
                    self.active = res.code;
                }
            });
        },
        clear:function(){
            this.code = '';
        },
        goFeddback:function(id){
            this.$router.push({path:'feddback', query:{orderId: id}});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .row .col-50{
        width: 50%;
        padding-left: 0;
    }

    p{
        margin: 0;
        font-size: 16px;
    }
    .content-block{
        margin: 0;
    }
    .bar {
        padding: 0 30px;
        margin-top: 10px;
        background-color: #fff;
    }
    .bar .searchbar{
        background-color: #fff;
    }
    .bar .searchbar .searchbar-cancel{
        font-size: 16px;
        color: #7A7A7A;
    }
    .searchbar .search-input input{
        background-color: #D5D5D5;
        color: #333;
    }
    .search-input{
        border-radius: 20px;
        overflow: hidden;
    }
    .search-input input{
        text-indent: 10px;
    }
    .bar-header-secondary{
        top: 0;
    }
    
    .row .col-85{
        width: 85%;
        margin-left: 0;
    }
    .row .col-15{
        width: 15%;
        margin-left: 0;
    }
    .searchMsg{
        min-height: 57px;
        padding: 10px 0;
        border-bottom: 1px solid #c8c8c8;
    }
    .searchMsg > div{
        height: 100%;
        margin: 0; 
    }
    .searchMsg > div:first-child{
        
    }
    .searchMsg > div:last-child{
        font-size: 30px;
        text-align: center;
        line-height: 44px;
    }
    .row{
        width: 100%;
        margin-left: 0;
    }
    .info{
        font-size: 14px;
    }
    .info p{
        margin: 0;
        padding: 0;
        padding-top: 10px;
        margin-top: 15px;
    }
    .info .row{
        padding-top: 10px;
    }
    .feedback{
        padding-top: 10px;
    }
    .list-block{
        margin: 0;
        font-size: 14px;
    }
    .list-block .item-content{
        padding-left: 0;
        color: #6d6d72;
    }
    .identity{
        background-color: #fff;
        padding: 20px 30px; 
    }
    .identity img{
        width:50px;
        height:50px;
        border-radius:50%;
        vertical-align: middle;
        margin-right: 15px;
        margin-top: -8px;
    }
    .identity button{
        width: 100%;
        font-size: 14px;
        margin-top: 4px;
        background: none;
        box-shadow: none;
        border: 1px solid #4a5961;
        border-radius: 4px;
        padding: 3px 10px;
    }
    .identity .row .col-80{
        width: 80%;
        padding-left: 0;
        margin-left: 0;    
    }
    .identity .row .col-20{
        width: 20%;
        padding-left: 0;
        margin-left: 0;
        text-align: right;
    }
    .bar{
        position: static;
        height: 50px;
        padding:20px 30px;
        padding-top: 3px;  
        padding-right: 15px;
    }
    .row .col-70{
        width: 70%;
        float: left;
    }
    .row .col-70 p{
        font-size: 16px;
        border-left: 6px solid #f08200;
        text-indent: 14px;
        line-height: 18px;
        color: #979799;
        color:#F18300;
        font-size:20px;
    }
    .content-list{
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        margin-top: 5px;
        background: #fff;
    }
    .my-content > p{
        padding: 10px 0;
        border-bottom: 1px solid #BBBBBB;
    }
    .my-content .row{
        padding: 15px 0;
        /* padding-right: 15px; */
    }
    .center-content{
        padding: 0 15px;
        color: #4A5860;
    }
    .customer{
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        padding: 10px 0;
        padding-top: 5px;
        padding-left: 15px;
    }
    .customer p,.delivery p{
        margin-top: 10px;
    }
    .delivery{
        padding: 10px 0;
        padding-top: 10px;
        padding-left: 15px;
    }
    .identity-txt{
        font-size:16px;
        color:#4a5961;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
        color: #636363; 
    } 
    input:-moz-placeholder, textarea:-moz-placeholder { 
        color: #636363; 
    }
    .row .col-50:nth-child(odd){
        padding-left: 15px;
    }  
    .row .col-50{
        width: 50%;
        margin-left: 0;
    }

    .content-list{
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        margin-top: 5px;
        background: #fff;
    }  
    .my-content > p{
        padding: 10px 0;
        border-bottom: 1px solid #BBBBBB;
    }
    .my-content .row{
        padding: 15px 0;
        padding-right: 15px;
    }
    .my-content .center-content{
        position: relative;
    }
    .footer-content{
        padding: 0 15px;
    }
    .footer-content p{
        padding: 10px 0;
        
    }
    .culture-desc{
        text-align: center;
        padding-top: 10px;
        color: #444;
        font-family: "微软雅黑";
        font-weight: bold;
        /* text-shadow: 0 1px 2px #999; */
    }   
    .culture-desc span{
        margin: 0 20px;
    }

    .order-time{
        padding-top: 5px;
    }

    .order-time span{

        font-size: 14px;
        line-height: 15px;
        color: #979799;
        margin-top: 3px;
    }

</style>
