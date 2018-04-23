<template>
    <div class="coupon">
        
            <div class="count public-bg-white">
                <div class="count-text">
                    <img src="../assets/icon/service.png">
                    
                    <div class="count-content"><span v-html="couponTotal">800</span></div> 
                </div>
            </div>
            <p class="public-bg-white" style="padding-bottom:20px;">
                <router-link :to="{name:'coupon_exchange'}" class="button button-big button-round btn-custom" style="width:50%;">
                    提现
                </router-link>
            </p>
            <table class="table public-bg-white margin-t-7">
                <thead>
                    <tr class="deepGrap">
                        <th width="160px">时间</th>
                        <th >收支</th>
                        <th >原因</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list">
                        <td v-html="item.create_time">2017-7-29 09:42:33</td>
                        <td >
                            <span v-if='item.is_add == 1'>+</span>
                            <span v-else='item.is_add'>-</span>
                            <span v-html="item.count"></span>
                        </td>
                        <td v-html="item.remark">消费支付</td>
                    </tr>
                </tbody>
            </table>
            <!-- 加载提示符 -->
            <div class="infinite-scroll-preloader" v-show="current_length < total_length">
                <div class="preloader">
                </div>
            </div>
            <p id="noMore" style="text-align:center;font-size:12px;padding:15px 0;color:#999;" v-show="current_length >= total_length">没有更多了...</p>
        
    </div>
</template>

<script>


export default {
    name: 'coupon',
        data () {
            return {
                list:[],
                couponTotal:'',

                //数据总长度
                total_length:'',
                //当前长度
                current_length:'',
                //当前页码
                current_page: 1
            }
        },
        mounted () {
            //第一页数据
            this.getList(1);
            this.getCoupon();
            //下拉加载
            this.scrollDown();
        },
        methods: {
            getList: function (page) {
                var self = this;
                myFn.ajax('get', {page:page}, apiAddress.coupon.couponDetailed ,function(res){
                    self.list = self.list.concat(res.data.data);
                    self.total_length = res.data.total;
                    self.current_length = self.list.length;
                });
            },
            getCoupon: function () {
                var self = this;
                myFn.ajax('get',{}, apiAddress.coupon.couponTotal ,function(res){
                    self.couponTotal = res.data.volume;
                });
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
    .count{
        padding: 20px 30px;
    }
    .count-text{
        /* height: 230px; */
        position: relative;
    }
    .count-text img{
        width: 100%;
    }
    .count-text .count-content{
        position: absolute;
        color: #fff;
        font-size: 50px;
        width: 71%;
        height: 100%;
        top: 0;
        right: 0;
        text-align: center;
    }
    .count-text .count-content span{
        display: inline-block;
        margin-top: 10%;
    }
    tr{
        border-bottom: 1px solid #eee;
    }
    .table{
        width: 100%;
    }
    .table thead tr{
        height: 47px;
    }
    .table tbody tr{
        height: 42px;
        font-size: 14px;
    }
    .table tr td{
        text-align: center;
    }
</style>
