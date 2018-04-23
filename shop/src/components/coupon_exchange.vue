<template>
    <div class="coupon_exchange">
        <div class="count public-bg-white">
            <input type="text" placeholder="请输入兑换数量" v-model="count">
            <p style=" text-align: left; font-size: 13px; margin-left: 5px; color: #1d1b1b; margin-top: 5px; letter-spacing: 1px;">手续费：额外扣除{{(count*serviceCharge).toFixed(1)}}服务券</p>
            <p class="orange count-text" v-html="couponTotal">800</p>
            <p class="orange">当前数量</p>
        </div>
        <p><a @click="submit_exchange" class="button button-big button-round btn-custom" style="margin-top: 130px;">提现</a></p>
    </div>
</template>

<script>


export default {
    name: 'coupon_exchange',
        data () {
            return {
                couponTotal:'',
                serviceCharge: 0,
                count:''
            }
        },
        mounted () {
            var self = this;
            this.getCoupon();
            myFn.ajax('get', {}, apiAddress.coupon.serviceCharge , function(res){
                self.serviceCharge = res.data.volume_service_charge;
            });
        },
        methods: {
            getCoupon: function () {
                var self = this;
                myFn.ajax('get', {}, apiAddress.coupon.couponTotal , function(res){
                    self.couponTotal = res.data.volume;
                });
            },
            submit_exchange: function () {

                if (this.count == 0 && this.count == '') {
                    alert('提现数量不能为0');
                }

                var data = {
                    "count": this.count,
                    "userbankId": 1
                }
                var self = this;
                myFn.ajax('post', data, apiAddress.coupon.couponApply, function (res) {
                    self.$router.push({path:'/statusPage', query:{type:1}});
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .coupon_exchange {
        width: 100%;
        height: 100%;
        background: #fff;
        padding-top: 1px;
    }
    .count {
        margin-top: 100px;
        padding: 30px 50px;
        text-align: center;
    }
    .count input{
        width: 100%;
        height: 42px;
        font-size: 30px;
        padding-bottom: 10px;
        border: 0;
        border-bottom: 1px solid #eee;
        text-align: center;
    }
    .count .count-text{
        margin-top: 20px;
        font-size: 32px;
    }
</style>
