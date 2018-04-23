<template>
    <div class="pay">
        <!-- <div class="order-info">
            <div class="order-info-wrapper">
                <img src="../../assets/images/pay-bg.png">
                <p>配送编码：<span>03259613454</span></p>
                <div class="row">
                    <div class="col-50">车牌号:<span>粤B888888</span></div>
                    <div class="col-50">保费:￥50</div>
                    <div class="col-50">类型:投保</div>
                    <div class="col-50 orange">服务券:800</div>
                    <div class="col-100">起投时间:2017-02-25</div>
                </div>
            </div>
        </div> -->
        <div class="operation-wrapper">
            <p class="tips orange">是否确认兑换？</p>
            <!-- <div class="operation-input">
                <div>
                    <span class="orange">￥</span>
                    <input type="text">
                </div>
            </div> -->
            <p><a @click="pay()" class="button button-big button-round btn-custom" style="margin-top: 20%;">确认</a></p>
            <p><a onclick="javascript:window.history.back(-1)" class="button button-big button-round btn-custom-re" style="margin-top: 15px;">取消</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pay',
        data () {
            return {
                id: '',
                info: {}
            }
        },
        mounted () {
            if (this.$route.params.id) {
                this.id = this.$route.params.id;
                this.getDetail()
            };
        },
        methods:{
            getDetail: function () {
                myFn.ajax('get', {id: this.id}, apiAddress.didi.details, (res) => {
                    this.info = res.data;
                })
            },
            pay () {
                myFn.ajax('post', {ticketType: this.id, mobile: '18088888888'}, apiAddress.didi.pay, (res) => {

                })
            }
        }
    }
</script>

<style scoped>
    .pay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .order-info {
        width: 100%;
        padding: 1rem 1.2rem;
        background: #EFEFF4;
    }
    .order-info-wrapper {
        position: relative;
    }
    .order-info-wrapper > p{
        position: absolute;
        width: 100%;
        text-align: center;
        top: 1rem;
    }
    .order-info-wrapper > div {
        position: absolute;
        width: 100%;
        top: 3.5rem;
        padding: 1rem;
        font-size: .7rem;
    }
    .order-info-wrapper > div > div {
        margin: .2rem 0;
        white-space: nowrap;
    }
    .order-info-wrapper > div > div:nth-child(even) {
        text-align: right;
    }
    .order-info-wrapper > img {
        width: 100%;
    }
    .row, .row > div {
        margin: 0;
    }
    .operation-wrapper {
        padding: 1rem;
        padding-top: 1.5rem;
    }
    .tips {
        text-align: center;
        font-size: 1rem;
    }
    .operation-input {
        text-align: center;
        margin-top: 10%;
        padding: 0 13%;
    }
    .operation-input > div {
        padding-bottom: 5px;
        border-bottom: 1px solid #ededed;
    }
    .operation-input > div input {
        border: 0;
        text-align: center;
    }
    .btn-custom-re {
        width: 88%;
        margin: auto;
        border: 0;
        color: #f08200;
        background: #fff;
        border: 1px solid #f08200;
    }
</style>