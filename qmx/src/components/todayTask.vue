<template>
    <div class="content">
        <div class="row">
            <div class="col-100">
                <div class="buttons-tab">
                    <!-- <a href="#tab1" class="tab-link active button">今日任务</a> -->
                    <a href="#tab2" class="tab-link button">已处理</a>
                    <a href="#tab3" class="tab-link active button">未处理</a>
                    <a href="#tab4" class="tab-link button">配送异常</a>
                    <!-- <a href="#tab4" class="tab-link button">任务统计</a> -->
                </div>
                
                <div class="content-block" style="padding:0;">
                    <div class="tabs">
                        <div id="tab2" class="tab infinite-scroll" style="margin-bottom:5px;">
                            <div class="row" style="padding:7px;background: #fff;letter-spacing: 2px;font-size: 0.9em;">
                                <div class="col-100">共{{total[0]}}条数据</div>
                            </div>
                            <div class="content-list" v-for="item in list">
                                <div class="my-content">
                                    <div class="row">
                                        <div class="col-70"><p>保单条码：{{item.code}}</p></div>
                                        <div class="col-30" style="text-align:right"><p v-html="item.create_time"></p></div>
                                    </div>
                                    <div class="center-content">
                                        <div class="row">
                                            <div class="col-50"><p>姓名：{{item.customer_name}}</p></div>
                                            <div class="col-50"><p>电话号码：{{item.mobile}}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-50"><p>车牌号：{{item.license_number}}</p></div>
                                            <div class="col-50"><p>类型：{{item.typeMsg}}</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-50"><p>起保时间：{{item.task_time}}</p></div>
                                            <div class="col-50"><p>保费：<span style="color:#f00">￥{{item.amount}}</span></p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-50"><p>服务券：{{item.volume}}</p></div>
                                        </div>
                                    </div>
                                    <div class="footer-content">
                                        <div class="row" style="padding-bottom:0;padding-right:0">
                                            <div class="col-50"><p>状态：<span style="color:#00A4F0;" v-html="item.statusMsg"></span></p></div>
                                            <div class="col-50"><p style="font-size:12px">签收时间：<span v-html="item.finish_time"></span></p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 加载提示符 -->
                            <div class="infinite-scroll-preloader" v-show="total[0]>10*currentPage[0]">
                                <div class="preloader">
                                </div>
                            </div>
                            <p id="noMore" style="text-align:center;font-size:12px;padding:10px 0;color:#999;" v-show="total[0]<=10*currentPage[0]">没有更多了...</p>
                        </div>
                        <div id="tab3" class="tab active infinite-scroll" style="margin-bottom:5px;">

                            <div class="bar bar-header-secondary">
                                <div class="searchbar">
                                    <a class="searchbar-cancel" @click="clear()">取消</a>
                                    <div class="search-input">
                                        <div class="icon icon-search" @click="search()"></div>
                                        <input type="search" id='search' placeholder='请输入订单号/车牌号' v-model="code" @keyup.enter="search()">
                                    </div>
                                </div>
                            </div>
                            <div style="height:50px;"></div>
                            <div class="row" style="padding:7px;background: #fff;letter-spacing: 2px;font-size: 0.9em;">
                                <div class="col-100" >共{{total[1]}}条数据</div>
                            </div>
                            <div class="content-list" v-for="item in list2" @click="goDetails(item.id, item.status)">
                                <div class="my-content">
                                    
                                    <div class="row">
                                        <div class="col-70"><p>保单条码：{{item.code}}</p></div>
                                        <div class="col-30" style="text-align:right"><p v-html="item.create_time">2017-05-27</p></div>
                                    </div>
                                    <div class="center-content">
                                        <div class="row">
                                            <div class="col-50"><p>类型：{{item.typeMsg}}</p></div>
                                            <div class="col-50"><p>车牌号：{{item.license_number}}</p></div>
                                        </div>
                                        <div class="link-right"></div>
                                        <div class="row">
                                            <div class="col-50"><p>起保时间：{{item.task_time}}</p></div>
                                            <div class="col-50"><p>保费：<span style="color:#f00">￥{{item.amount}}</span></p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-50"><p>服务券：{{item.volume}}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 加载提示符 -->
                            <div class="infinite-scroll-preloader" v-show="total[1]>10*currentPage[1]">
                                <div class="preloader">
                                </div>
                            </div>
                            <p id="noMore" style="text-align:center;font-size:12px;padding:10px 0;color:#999;" v-show="total[1]<=10*currentPage[1]" >没有更多了...</p>
                        </div>
                        <div id="tab4" class="tab infinite-scroll" style="margin-bottom:5px;">

                            <div class="row" style="padding:7px;background: #fff;letter-spacing: 2px;font-size: 0.9em;">
                                <div class="col-100" >共{{total[2]}}条数据</div>
                            </div>
                            <div class="content-list" v-for="item in list3" @click="goDetails(item.id, item.status)">
                                <div class="my-content">
                                    
                                    <div class="row">
                                        <div class="col-70"><p>保单条码：{{item.code}}</p></div>
                                        <div class="col-30" style="text-align:right"><p v-html="item.create_time">2017-05-27</p></div>
                                    </div>
                                    <div class="center-content">
                                        <div class="row">
                                            <div class="col-50"><p>类型：{{item.typeMsg}}</p></div>
                                            <div class="col-50"><p>车牌号：{{item.license_number}}</p></div>
                                        </div>
                                        <div class="link-right"></div>
                                        <div class="row">
                                            <div class="col-50"><p>起保时间：{{item.task_time}}</p></div>
                                            <div class="col-50"><p>保费：<span style="color:#f00">￥{{item.amount}}</span></p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-50"><p>服务券：{{item.volume}}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 加载提示符 -->
                            <div class="infinite-scroll-preloader" v-show="total[2]>10*currentPage[2]">
                                <div class="preloader">
                                </div>
                            </div>
                            <p id="noMore" style="text-align:center;font-size:12px;padding:10px 0;color:#999;" v-show="total[2]<=10*currentPage[2]" >没有更多了...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'content',
        data () {
            return {
                pick:'0',
                list:[],
                list2:[],
                list3:[],
                total:[],
                current_time:'',
                currentPage:[1,1,1],
                code:'',
            }
        },
        mounted (){
            var self = this;

            myFn.ajax('get', {page:1,status:2}, apiAddress.task.todayTask, function(res){
                self.list = res.data.data;
                self.total[0] = res.data.total;
            });

            myFn.ajax('get', {page:1,status:3}, apiAddress.task.todayTask, function(res){
                self.list3 = res.data.data;
                self.total[2] = res.data.total;
            });

            var date = new Date();
            self.current_time = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            myFn.ajax('get', {page:1,changeEndTime:self.current_time,status:1}, apiAddress.task.todayTask, function(res){
                self.list2 = res.data.data;
                self.total[1] = res.data.total;
            });
            self.loadData();
        },
        methods:{
            search:function(){
                var self = this;
                myFn.ajax('get',{code:self.code,status:1,changeEndTime:self.current_time},apiAddress.task.todayTask,function(res){
                    self.total[1] = res.data.total;
                    self.list2 = '';
                    self.list2 = res.data.data;
                })
            },
            clear:function(){
                var self = this;
                this.code = '';
            },
            goDetails: function(id, status){
                this.$router.push({name:'orderDetail',params:{id:id,status:status}})
            },
            loadData:function(){    
                var self = this;
                var loading = false;

                var lastIndex ; //当前长度
                var maxItems = self.total;  //数据总长度

                function getData(ev){  //取数据

                    if (ev == 0) {

                        self.currentPage[0]++;
                        myFn.ajax('get', {page:self.currentPage[0],status:2}, apiAddress.task.todayTask, function(res){
                            self.list2 = self.list.concat(res.data.data);
                        });
                        
                    }else if(ev == 1){
                        self.currentPage[1]++;
                        myFn.ajax('get', {page:self.currentPage[1],changeEndTime:self.current_time,status:1}, apiAddress.task.todayTask, function(res){
                            self.list2 = self.list2.concat(res.data.data);
                        });
                    }else{
                        self.currentPage[2]++;
                        myFn.ajax('get', {page:self.currentPage[2],changeEndTime:self.current_time,status:3}, apiAddress.task.todayTask, function(res){
                            self.list3 = self.list3.concat(res.data.data);
                        });
                    }
                }
                
                // 注册'infinite'事件处理函数
                $(document).on('infinite', function() {
                    /*alert(1);*/
                    // 如果正在加载，则退出
                    if (loading) return;
                    // 设置flag
                    loading = true;
                    var tabIndex = 0;
                    if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
                        tabIndex = 0;
                    }
                    if($(this).find('.infinite-scroll.active').attr('id') == "tab3"){
                        tabIndex = 1;
                    }
                    if($(this).find('.infinite-scroll.active').attr('id') == "tab4"){
                        tabIndex = 2;
                    }
                    lastIndex = $('.infinite-scroll').eq(tabIndex).find('.content-list').length;
                    // 模拟1s的加载过程
                    setTimeout(function() {
                      // 重置加载flag
                        loading = false;
                        if (lastIndex >= maxItems[tabIndex]) {
                            // 加载完毕，则注销无限加载事件，以防不必要的加载:$.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));多个无线滚动请自行根据自己代码逻辑判断注销时机
                            // 删除加载提示符
                            $('.infinite-scroll-preloader').eq(tabIndex).hide();
                            console.log('没有更多了')
                            return false;
                        }

                        getData(tabIndex);//ajax加载数据

                        // 更新最后加载的数据长度
                        lastIndex = $('.infinite-scroll').eq(tabIndex).find('.content-list').length;
                        

                        $.refreshScroller();
                    }, 1000);
                });
                $.init();
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .buttons-tab{
        background: #F2F2F2;
        height: 2.5rem;
        padding: 0 15px;
        padding-top: .5rem;
    }
    .buttons-tab .button{
        height: 1.5rem;
        background: #fff;
        color: #000;
        border-right:1px solid #F2F2F2;
        border-bottom: 0;
        line-height: 1.5rem;
        font-size: .7rem;
    }
    .buttons-tab .button:last-child{
        border-right: 0;
    }
    .buttons-tab .button.active{
        background: #f08200;
        color: #fff;
        border-color: #BBBBBB;
        z-index: 100;
    }
    .row{
        margin-left: 0;
    }
    .row .col-100{
        width: 100%;
        margin-left: 0;
    }
    .content-block{
        margin: 0;
        position: relative;
    }
    .content-list{
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        margin-top: 5px;
        background: #fff;
    }
    p{
        margin: 0;
        color: #231815;
        font-size: .7rem;
    }
    .my-content > p{
        padding: 10px 0;
        border-bottom: 1px solid #BBBBBB;
    }
    .my-content .row{
        padding: 15px 0;
        padding-right: 15px;
    }
    .row .col-50{
        width: 50%;
        margin-left: 0;
    }
    .list-block{
        margin: 0;
        color: #333;
        font-size: .7rem;
        padding: 0;
    }
    .list-block .item-content{
        padding-left: 0;
        border-top: 1px solid #BBBBBB;
    }
    .list-block .item-media + .item-inner{
        padding-left: 0;
        margin-left: 0;
        padding-right: 0;
    }
    .list-block .item-after{
        color: #333;
        padding-top: 0;
        padding-bottom: 0;
    }
    #select{
        display:inline-block;
        height: 1.21rem;
        border: 1px solid #BBBBBB;
        width: 150px;
        border-radius: 5px;
        color: #BBB;
        font-size: .7rem;
    }
    .list-block ul:after{
        height: 0;
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
    .footer-content p{
        padding: 10px 0;
        border-top: 1px solid #e6e6e6; 
    }
    #tab2 > div:first-child,#tab3 > div:first-child{
        border-top:0;
        margin-top: 0; 
    }
    #tab3 .my-content .center-content{
        position: relative;
    }
    #tab3 .my-content .center-content .link-right{
        width: 16px;
        height: 30px;
        position: absolute;
        background-image:url(../assets/icon/link.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        z-index: 2; 
        right: 15px;
        top: 50%;
        margin-top: -15px;
    }

    .bar {
        padding: 0 30px;
        background-color: #fff;
        margin-top: 50px;
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
</style>
