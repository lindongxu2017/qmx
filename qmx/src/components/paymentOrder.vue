<template>
    <div class="paymentOrder">
        <div class="page-group">
            <div class="page">
                <div class="content infinite-scroll">
                    <div class="order-wrapper" v-for="item in list">
                        <div class="order-header-wrapper">
                            <p><span>配送编码：</span><span v-html="item.code"></span></p>
                        </div>
                        <div class="order-content-wrapper">
                            <div>
                                <div><span>车牌号：</span><span v-html="item.license_number"></span></div>
                                <div><span>保费：</span><span v-html="item.amount"></span></div>
                            </div>
                            <div>
                                <div><span>类型：</span><span v-html="item.typeMsg"></span></div>
                                <div class="orange"><span>服务券：</span><span v-html="item.volume"></span></div>
                            </div>
                            <div>
                                <div><!-- <span>完成时间：</span><span>2017-08-25</span> --></div>
                                <div><button class="button give" @click="isSend(item.id)">赠送</button></div>
                            </div>
                        </div>
                    </div>

                    <!-- dialog -->
                    
                    
                    <p><a href="#" class="alert-text"></a></p>
                    
                    
                    <!-- 加载提示符 -->
                    <div class="infinite-scroll-preloader" v-show="current_length < total_length">
                        <div class="preloader">
                        </div>
                    </div>
                    <p id="noMore" style="text-align:center;font-size:12px;padding:15px 0;color:#999;" v-show="current_length >= total_length">没有更多了...</p>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>


export default {
    name: 'paymentOrder',
    data () {
        return {
            list:[],

            //数据总长度
            total_length:'',
            //当前长度
            current_length:'',
            //当前页码
            current_page: 1,
            //车主ID
            carID:'1'

        }
    },
    mounted() {


        this.getList(1);
        
        this.scrollDown();

        this.carID = myFn.GetQueryString('id') || this.$route.query.id;
        
    },
    methods:{
        getList:function(page){
            var self = this;
            myFn.ajax('get',{page:page},apiAddress.orderList.dfList,function(res){

                self.list = self.list.concat(res.data.data);
                self.total_length = res.data.total;
                self.current_length = self.list.length;
            })
        },
        isSend:function(id){
            var self = this;
            $.confirm('请确认是否赠送?',
                function () {
                    myFn.ajax('post',{orderId:id,id:self.carID},apiAddress.orderList.sendVolume,function(res){
                        $.alert('赠送成功！')
                    })
                    
                }
            );
        },
        scrollDown:function(){
            var self = this;
            var loading = false;
            // 注册'infinite'事件处理函数
            $(document).on('infinite', function() {
                // 如果正在加载，则退出
                if (loading) return;
                // 设置flag
                loading = true;
                
                setTimeout(function() {
                    // 重置加载flag
                    loading = false;
                    if (self.current_length >= self.total_length) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载:$.detachInfiniteScroll($('.infinite-scroll'));多个无线滚动请自行根据自己代码逻辑判断注销时机
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                        console.log('没有更多了')
                        return false;
                    }
                    //ajax加载数据
                    self.current_page ++;

                    self.getList(self.current_page);

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

    .orange{
        color: #f08200;
    }

    .order-wrapper{
        padding: 0 15px;
        background: #fff;
        margin-top: 7px;
        color: #303642;
    }
    .order-wrapper:first-child{
        margin-top: 0
    }
    .order-header-wrapper{
        padding: 10px 0;
        border-bottom: 1px solid #c8c8c8;
    }
    .order-header-wrapper p{
        margin: 0;
    }
    .order-content-wrapper{
        padding: 10px;
    }
    .order-content-wrapper > div{
        display: flex;
        font-size: .75rem;
        margin-bottom: 10px;
    }
    .order-content-wrapper > div > div{
        flex: 1;
    }
    .order-content-wrapper > div > div:nth-child(even){
        text-align: right;
    }
    .give{
        display: inline-block;
        height: 24px;
        font-size: .75rem;
        line-height: 24px;
        border-color: #f08200;
        color: #f08200;
    }
</style>
