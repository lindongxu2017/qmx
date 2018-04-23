<template>
    <div class="content">
        
        <div class="header">
            <p style="font-size:54px" v-html="todaynum.count"></p>
            <p style="font-size:16px;margin-top:-10px;">今日任务完成</p>
            <p style="font-size:14px" v-html="todayDate"></p>
            <p class="aloneSite"><img src="../assets/icon/site2.png" style="width:18px;vertical-align: top;margin-right:5px;">所属：<span v-html="aloneSite"></span></p>
        </div>
        <div class="select">
            <span>请选择</span>
            <select name="select" id="select" v-model="pick">
                <option v-for="item in pickList" :value="item" v-html="item"></option>
            </select>
            <span>月份</span>
        </div>
        <div class="complete-list">
            <ul>
                <li v-for="(item,index) in taskList">
                    <div class="row">
                        <div class="col-20"><p><span style="font-size:24px;" v-html="item.day"></span><span>日</span></p></div>

                        <div class="col-80" style="padding-top: 5px;">
                            <div class="row">

                                <div class="col-50" v-for="(val,sIndex) in taskList[index].type">{{val.typeMsg}}：{{val.count}}</div>

                                <div class="col-50"><p style="color:#333;">完成:{{item.count}}</p></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
           
    </div>
</template>

<script>


export default {
    name: 'index',
        data () {
            return {
                pick:'01',
                pickList:[],
                taskList:[],
                todaynum:{},
                todayDate:'',
                aloneSite:'',
                type:[
                    
                ]
            }
        },
        mounted (){
            var self = this;

            var date = new Date();
            var default_pick = (date.getMonth() + 1);
            if(default_pick<10){
                default_pick = '0' + default_pick;
            }
            self.pick = default_pick;

            self.todayData();
            self.active();
            var userInfo = JSON.parse(localStorage.getItem('userInfo'))
            self.aloneSite = userInfo.station_name;
        },
        methods:{
            active:function(){
                var self = this;
                var date = new Date();
                var current_month = date.getMonth() + 1;
                for (var i = 0; i < current_month; i++) {
                    if (i.toString().length == 1 && i!=9) {
                        self.pickList[i] = '0'+ (i + 1);
                    }else{
                        self.pickList[i] = i + 1;
                    }
                };
                var search_date = date.getFullYear() + '-' + self.pick + '-' + '1';
                myFn.ajax('get',{startTime:search_date,type:'2'},'/home/order/showOrderByWeekAndMon',function(res){

                    self.taskList = res.data;

                   
                    if (res.data == undefined) {
                        return false
                    };

                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].type.length == '1') {
                            
                            if (res.data[i].type[0].type == '1') {  

                                res.data[i].type.push( {count:'0',typeMsg:'保单'} );
                                res.data[i].type.push( {count:'0',typeMsg:'在线支付单'} );

                            }else if (res.data[i].type[0].type == '2') {

                                res.data[i].type.unshift( {count:'0',typeMsg:'投保单'} );
                                res.data[i].type.push( {count:0,typeMsg:'保单'} );

                            }else if (res.data[i].type[0].type == '3') {

                                res.data[i].type.unshift({count:'0',typeMsg:'在线支付单'});
                                res.data[i].type.unshift({count:'0',typeMsg:'投保单'});

                            }

                        }else if (res.data[i].type.length == '2') {
                            
                            var newType = [];
                            for(var j = 0; j < res.data[i].type.length; j++){
                                newType.push(res.data[i].type[j].type)
                            }

                            if (newType.indexOf('1') < 0 ) {

                                res.data[i].type.unshift( {count:'0',typeMsg:'投保单'} )

                            }else if (newType.indexOf('2') < 0 ) {

                                res.data[i].type.push( {count:'0',typeMsg:'在线支付单'} )

                            }else if (newType.indexOf('3') < 0 ) {

                                res.data[i].type.splice(1,0,{count:'0',typeMsg:'保单'} )

                            }


                        }

                    }

                    self.taskList = res.data;

                })
            },
            todayData:function(){
                var self = this;
                var date = new Date();
                self.todayDate = (date.getMonth()+1) + '月' + date.getDate() + '日';
                myFn.ajax('get',{},'/home/order/countToday',function(res){
                    self.todaynum = res.data;
                    console.log(self.todaynum)
                })
            }
        },
        watch:{
            'pick':'active'
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{
        height: 150px;
        background:url(../assets/icon/head-back.png); 
        text-align: center;
        color: #fff;
        padding-top: 10px;
        position: relative;
    }
    .aloneSite{
        position: absolute;
        right: 0;
        top: 0;
        font-size:14px;
        padding-right: 15px;
        padding-top: 15px;
    }
    p{
        margin:0;
    }
    div{
        background:#fff;
    }
    ul{
        padding-left: 0;
        margin: 0;
    }
    li{
        list-style: none;
    }
    .content{
        background: #f2f2f2;
    }
    .select{
        color: #979799;
        text-align: center;
        padding: 5px 0;
        margin-top: 5px;
        border-top: 1px solid #E2E3E4;
        border-bottom: 1px solid #E2E3E4;
        font-size: 16px;
    }
    .select select{
        width: 80px;
        padding: 0 10px;
        font-size: 32px;
        border:none;
        appearance:none;
        -moz-appearance:none; /* Firefox */
        -webkit-appearance:none; /* Safari 和 Chrome */
        vertical-align: sub;
        background: url(../assets/icon/down.png) no-repeat scroll right center transparent;
    }
    .complete-list li{
        padding: 15px 25px;
        border-bottom: 1px solid #E2E3E4;
    }
    .complete-list p{
        color: #ccc;
    }
    .complete-list .col-20 p{
        margin-top:11px;
        border-right: 1px solid #ccc;
    }
    .row .col-70{
        padding: 0;
        padding-top: 5px;
        padding-left: 10px;
        width: 70%;
    }
    .row .col-30{
        padding: 0;
        width: 30%;
    }
</style>
