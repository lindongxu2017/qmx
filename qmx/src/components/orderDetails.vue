<template>
    <div class="content" id="deal">
        <div class="tips">*确认订单信息，无误后可点击提交</div>
        <div class="content-list">
            <div class="my-content">
                <div class="row">
                    <div class="col-70"><p>保单条码：{{details.code}}</p></div>
                    <div class="col-30" style="text-align:right"><p v-html="details.create_time">2017-05-27</p></div>
                </div>
                <div class="center-content">
                    <div class="row">
                        <div class="col-50"><p>姓名：{{details.customer_name}}</p></div>
                        <div class="col-50"><p>电话号码：{{details.mobile}}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-50"><p>车牌号：{{details.license_number}}</p></div>
                        <div class="col-50"><p>类型：{{details.typeMsg}}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-50"><p>起保时间：{{details.task_time}}</p></div>
                        <div class="col-50"><p>保费：<span style="color:#f00">￥{{details.amount}}</span></p></div>
                    </div>
                </div>
                <div class="footer-content">
                    <div>
                        <span style="font-size:16px;">操作状态：</span>
                        <select name="select" id="select" v-model="pick">
                            <option value="">请选择状态</option>
                            <option value="3" >配送成功</option><!-- style="color:#00A4F0" -->
                            <option value="5" >配送改约</option>
                            <option value="4" >配送异常</option><!-- style="color:#f00;" -->
                        </select>
                    </div>
                </div>
                <div class="pay-ways" v-show="pick == 3 &&　details.type==1">
                    <div><p>请选择支付方式：</p></div>
                    <div class="row item" data-type="1">
                        <div class="col-80">
                            <img src="../assets/icon/cash.png"><input type="radio" name="pay" value="1">现金支付
                        </div>
                        <div class="col-20">
                            <img src="../assets/icon/ok.png">
                        </div>
                    </div>
                    <div class="row item" data-type="2">
                        <div class="col-80">
                            <img src="../assets/icon/pos.png"><input type="radio" name="pay" value="2">POS刷卡
                        </div>
                        <div class="col-20">
                            <img src="../assets/icon/ok.png">
                        </div>
                    </div>
                    <div class="row item" data-type="3">
                        <div class="col-80">
                            <img src="../assets/icon/transform.png"><input type="radio" name="pay" value="3">转账
                        </div>
                        <div class="col-20">
                            <img src="../assets/icon/ok.png">
                        </div>
                    </div>
                </div>
                <div class="row change-date" v-show="pick == 5">
                    <div class="col-30"><span>请选择时间：</span></div>
                    <div class="col-70"><input type="date" id="date" v-model="gyTime"></div>
                </div>
                <div class="fail" v-show="pick == 4" style="padding: 15px 0px;padding-bottom: 0px;">
                    <div >
                        <div><span>选择失败原因：</span></div>
                        <div class="row" style="padding-left: 15px;">
                            <div class="col-50" v-for="item in failList" @click="change" style="line-height: 30px;">
                                <input type="radio" name="reason" :id="item.id" :value="item.id" v-model="failChoose">
                                <label :for="item.id" v-html="item.name"></label>
                            </div>
                        </div>
                    </div>
                    <div v-if="failChoose == 10">
                        <div><span>失败详情：</span></div>
                        <div class="row" style="padding-left: 15px;">
                            <div class="col-100" style="line-height: 30px;">
                                <textarea name="" id=""  rows="3" style="width: 100%;" v-model="failDetails"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="center-content" style="margin-top:10px;" v-show="details.ordeBack.length != 0">
                    <div class="feddback" style="border:0;padding-top:10px;">
                        <p style="font-size:12px;color:#f00;">*订单反馈信息：</p>
                        <div class="feddback-info">
                            <ul>
                                <li v-for="(item,index) in details.ordeBack">
                                    <p><span v-html="item.type"></span><span v-html="item.create_time"></span></p>
                                    <p><span v-html="item.message"></span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <div class="row content-block">
            <div class="col-100" style="margin-top:2.5rem">
                <p class="button button-big" style="background:#f08200;color:#fff;" @click="submit">提交</p>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'content',
        data () {
            return {
                pick:'',
                id:'',
                status:'',
                details:{
                    ordeBack:[]
                },
                payType:1,
                // 改约时间
                gyTime:'',
                failList:[],
                failChoose:'',
                isType:false,   //判断是否为投保单
                // 失败详情
                failDetails:''
            }
        },
        mounted (){
            var self = this;
            $('.pay-ways .item .col-20 img').eq(0).css({'display':'block'});
            $('.pay-ways .item').click(function(){
                $('.pay-ways .item .col-20 img').css({'display':'none'});
                $(this).find('.col-20').find('img').css({'display':'block'});
                self.payType = $(this).attr("data-type");
            });

            myFn.ajax('get',{},'/home/order/getFaildStatus',function(res){
                self.failList = res.data;
            })

            this.id = this.$route.params.id;
            this.status = this.$route.params.status;
            var data = {
                id: this.id,
                status: this.status
            }
            myFn.ajax('get', data, apiAddress.task.details, function(res){
                for (var i = 0; i < res.data.ordeBack.length; i++) {
                    switch(res.data.ordeBack[i].type){
                        case 1:
                            res.data.ordeBack[i].type = '联系人调整：';
                            break;
                        case 2:
                            res.data.ordeBack[i].type = '联系电话调整：';
                            break;
                        case 3:
                            res.data.ordeBack[i].type = '配送时间调整：';
                            break;
                        case 4:
                            res.data.ordeBack[i].type = '配送地址调整：';
                            break;
                        case 5:
                            res.data.ordeBack[i].type = '退单通知：';
                            break;
                    }
                };
                self.details = res.data;
            });
        },
        watch:{
            pick:function(val,oldval){
                this.isType = false;
                if (val == 3) {
                    if(this.details.typeMsg == '投保单'){
                        this.isType = true;
                    }
                };
            }
        },
        methods:{
            change:function(){
                var self = this;
                setTimeout(function(){
                    console.log(self.failChoose)
                },20)
            },
            submit: function(){
                var self = this;
                var data = {
                    id: this.id,
                    status: this.pick,
                    fieldStatus:''
                }
                if(this.pick == ''){
                    alert('请选择操作状态');
                    return false;
                }
                if(this.pick == 3){
                    data.payMethod = this.payType;
                }else if(this.pick == 4){
                    data.fieldStatus = self.failChoose;
                    data.message = self.failDetails;
                }else if(this.pick ==5){
                    data.changeTime = this.gyTime;
                }
                myFn.ajax('post', data, apiAddress.task.updateStatus, function(res){
                    alert('成功');
                    self.$router.push({name:'todayTask'});
                });
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my-content{
        background-color: #f2f2f2;
    }
    .my-content div{
        background-color: #fff;
    }
    .row{
        margin-left: 0;
    }
    .row .col-100{
        width: 100%;
        margin-left: 0;

    }
    .content{
        padding-bottom: 30px;
    }
    .content-block{
        margin: 0;
    }
    .content-list{
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        background: #fff;
    }
    p{
        margin: 0;
        color: #231815;
        font-size: .7rem;
    }
    .my-content > p{
        padding: 10px 0;
        border-bottom: 1px solid #e6e6e6;
    }
    .my-content .row{
        padding: 15px 0px;
        padding-right: 15px;
    }
    .row .col-50{
        width: 50%;
        margin-left: 0;
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
    }
    .row .col-30{
        width: 30%;
        float: left;
    }
    .row .col-30 p{
        font-size: 14px;
        line-height: 15px;
        color: #979799;
    }
    .center-content {
        padding:0 20px;
    }
    .center-content .row{
        padding:5px 0;
    }
    .center-content .row:first-child{
        padding-top: 10px
    }
    .center-content .row:last-child{
        padding-bottom: 10px
    }
    .center-content > div:first-child{
        border-top: 1px solid #e6e6e6;
    }
    .footer-content{
        padding: 0 20px;
    }
    .footer-content div{
        padding: 10px 0;
        border-top: 1px solid #e6e6e6; 
    }
    .tips{
        padding: 10px 0;
        padding-left: 15px;
        font-size: 14px;
        color: #737373;
        /* color: #f00; */
        /* background: #EEDB5D */
    }
    select{
        width: 120px;
        padding: 0 10px;
        font-size: 16px;
        color: #A6A6A6;
        border:none;
        appearance:none;
        -moz-appearance:none; /* Firefox */
        -webkit-appearance:none; /* Safari 和 Chrome */
        vertical-align: baseline;
        background: url(../assets/icon/down.png) no-repeat scroll right center transparent;
        background-size: 17%;
    }
    #date{
        width: 100%;
        padding: 0 10px;
        font-size: 16px;
        color: #231815;
        border:none;
    }
    .pay-ways p{
        font-size: 16px;
    }
    .pay-ways{
        font-size: 16px;
        color: #231815;
        padding: 0 15px;
        margin-top: 10px;
        border-bottom: 1px solid #e6e6e6;
    }
    .pay-ways > div{
        padding: 10px 0;
        border-bottom: 1px solid #e6e6e6;
    }
    .pay-ways .item{
        display: block;
        padding: 15px 0;
        padding-left: 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    .pay-ways .item:last-child{
        border-bottom:0;
    }
    .pay-ways .item img{
        vertical-align: middle;
    }
    .pay-ways .item input{
        opacity: 0;
    }
    .pay-ways .item .col-20 img{
        display: none;
    }
    .change-date{
        margin-top: 10px;
        padding: 10px 15px!important;
    }
    .change-date span{
        font-size: 16px;
        color: #231815;
    }
    .fail{
        font-size: 16px;
        color: #231815;
        padding: 10px 15px;
        margin-top: 10px;
    }
    .fail > div{
        padding: 5px 15px;
    }
    .button{
        border:none;
    }
    .feddback-info{
        padding: 5px 15px;
    }
    .feddback-info ul{
        padding-left: 0;
        margin: 0;  
    }
    .feddback-info ul li{
        padding-top: 5px;
    }
    .feddback-info ul li p:first-child{
        font-size: 14px;
        color: #333;
    }
    .feddback-info ul li p:last-child{
        font-size: 14px;
        color: #666;
        padding-left: 14px;
    }
    
</style>
