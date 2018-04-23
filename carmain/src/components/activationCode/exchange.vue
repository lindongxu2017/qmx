<template>
    <div class="exchange">
        <div class="code-wrapepr">
            <div class="code-info">
                <p>选择面值兑换</p>
            </div>
            <div class="code-list">
                <ul>
                    <li v-for="item in list" @click="goPay(item.id)"><img src="../../assets/icon/activation-5.png"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'exchange',
        data () {
            return {
                list: []
            }
        },
        mounted () {
            this.getDate();
        },
        methods: {
            goPay (id) {
                this.$router.push({name: 'orderPay', params: {id: id}})
            },
            getDate: function () {
                myFn.ajax('get', {}, apiAddress.didi.list, (res) => {
                    this.list = res.data;
                })
            }
        }
    }
</script>

<style scoped>
    .exchange {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background: #fff;
    }
    .receive-wrapper span {
        width: 15%;
        height: 100%;
        font-size: .7rem;
        display: inline-block;
        text-align: center;
    }
    .code-wrapepr {
        padding: 15px;
    }
    .code-info {
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
    }
    .code-info p {
        font-size: .75rem;
        margin: 5px 0;
        color: #8B8B8B;
    }
    .code-list {
        padding-top: 20px;
    }
    .code-list li{
        width: 100%;
        margin-bottom: 15px;
    }
    .code-list img {
        width: 100%;
    }
</style>