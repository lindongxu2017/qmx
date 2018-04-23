<template>
    <div class="change">
        <div class="content infinite-scroll">
            <div class="row" style="padding:7px;background: #fff;letter-spacing: 2px;font-size: 0.9em;">
                <div class="col-100" >共{{total}}条数据</div>
            </div>
            <div class="content-list" v-for="item in list" @click="goDetails(item.id)">
                <div class="my-content">
                    <div class="row content-title">
                        <div class="col-70"><p>配送编码 : {{item.code}}</p></div>
                        <div class="col-30" style="text-align:right"><p v-html="item.update_time"></p></div>
                    </div>
                    <div class="center-content">
                        <div class="row">
                            <div class="col-50"><p>类型 : {{item.typeMsg}}</p></div>
                            <div class="col-50"><p>车牌号 : {{item.license_number}}</p></div>
                        </div>
                        <div class="row" style="padding-top:10px;">
                            <div class="col-50"><p>起保时间 : {{item.task_time}}</p></div>
                            <div class="col-50"><p>保费 : <span style="color:#f00">￥{{item.amount}}</span></p></div>
                        </div>
                        <div class="link-img"><img src="../assets/icon/link.png"></div>
                    </div>
                </div>
            </div>
            <!-- 加载提示符 -->
            <div class="infinite-scroll-preloader" v-show="currentPre_length<total">
                <div class="preloader">
                </div>
            </div>
            <p id="noMore" style="text-align:center;font-size:12px;padding:10px 0;color:#999;" v-show="currentPre_length>total">没有更多了...</p>
        </div>
    </div>
</template>

<script>


export default {
    name: 'change',
        data () {
            return {
               list:[],
               currentPage:'1', //当前页
               lastIndex:'',
               total:'', //数据总长度
               current_time:'',
               currentPre_length:''
            }
        },
        mounted (){
            var self = this;
            self.loadData();
            var date = new Date();
            self.current_time = date.getFullYear() + '-' + (date.getMonth() + 1 ) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

            myFn.ajax('get', {page:self.currentPage,changeStartTime:self.current_time,status:1}, '/home/order/getList', function(res){
                self.total = res.data.total
                self.list = res.data.data;
                self.lastIndex = res.data.data.length;
            });

            self.currentPre_length = self.currentPage*10;


        },
        methods:{
            goDetails:function(id){
                this.$router.push( { name:'orderDetail',params:{id:id} } )
            },
            loadData:function(){    
                var self = this;
                var loading = false;

                var maxItems = self.total;

                function getData(){  //取数据
                    
                    self.currentPage++;
                    self.currentPre_length = self.currentPage*10;
                    self.list.push('')
                    myFn.ajax('get', {page:self.currentPage,status:1}, apiAddress.task.todayTask, function(res){
                        self.list = self.list.concat(res.data.data);
                    });
                    console.log('当前页：' + self.currentPage + '当前长度：' + self.lastIndex)
                }
                
                // 注册'infinite'事件处理函数
                $(document).on('infinite', function() {
                    // 如果正在加载，则退出
                    if (loading) return;
                    // 设置flag
                    loading = true;
                    
                    setTimeout(function() {
                      // 重置加载flag
                        loading = false;
                        if (self.lastIndex >= maxItems) {
                            // 加载完毕，则注销无限加载事件，以防不必要的加载:$.detachInfiniteScroll($('.infinite-scroll'));多个无线滚动请自行根据自己代码逻辑判断注销时机
                            // 删除加载提示符
                            $('.infinite-scroll-preloader').hide();
                            console.log('没有更多了')
                            return false;
                        }

                        getData();//ajax加载数据
                        // 更新最后加载的数据长度
                        setTimeout(function(){
                            self.lastIndex = $('.infinite-scroll').find('.content-list').length;
                        },1500)
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
    p{
        margin: 0;  
    }
    .row{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .row .col-30,.row .col-70,.row .col-50,.row .col-100{
        margin: 0;
        padding: 0;
    }
    .row .col-30{
        width: 33%;
    }
    .row .col-70{
        width: 67%;
    }
    .row .col-50{
        width: 50%;
    }
    .row .col-100{
        width: 100%;
    }
    .content-title{
        padding: 15px 0;
    }
    .content-title .col-70 p{
        font-size: 16px;
        border-left: 6px solid #f08200;
        text-indent: 14px;
        line-height: 18px;
        color: #979799;
    }
    .content-title .col-30 p{
        padding-right: 15px;
        font-size: 12px;
        color: #999;
    }
    .content-list{
        border-top:1px solid #E2E3E4;
        border-bottom:1px solid #E2E3E4;
        margin-top: 5px;
        background-color: #fff;
    }
    .center-content > div:first-child{
        padding-top: 10px;
        border-top:1px solid #E2E3E4;
    }
    .center-content > div:last-child{
        /* padding-top: 10px; */
    }
    .center-content{
        padding: 0 15px;
        padding-bottom: 10px;
        color: #231815;
        position: relative;
    }
    .center-content .row > div:last-child p{
        padding-left: 10px;
    }
    .link-img{
        position: absolute;
        top: 25px;
        right: 15px;
    }
    .link-img img{
        width: 10px;
        height: 20px;
    }
    .content{
        padding-bottom: 55px;
    }

    .center-content p{
        font-size: .7rem;
    }
</style>
