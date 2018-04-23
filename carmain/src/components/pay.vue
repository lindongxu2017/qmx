<template>
    <div class="pay">
        <p class="payTitle">支付代金券数量</p>
        <input class="payInput" type="text" placeholder="请输入数量" v-model="payNumber">
        <p><a @click="go_pay" class="button button-big button-round btn-custom" style="margin-top: 130px;">支付</a></p>
    </div>
</template>

<script>


export default {
    name: 'pay',
        data () {
            return {
                payNumber:''
            }
        },
        mounted () {
            
        },
        methods: {
            go_pay: function () {
                var data = {
                    count: this.payNumber,
                }
                data.shopid = myFn.GetQueryString('id') || this.$route.query.id;
                var self = this;
                myFn.ajax('post', data, apiAddress.pay.gopay, function(res){
                    alert('支付成功');
                    self.$router.push('/index/service');
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pay{
        text-align: center;
    }
    .payInput{
        width: 60%;
        height: 42px;
        border: 0;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }
    .payTitle{
        margin-top: 70px;
        margin-bottom: 30px;
        font-size: 25px;
    }
</style>
