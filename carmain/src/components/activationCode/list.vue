<template>
    <div class="activationCode">
        <div class="receive-wrapper">
            <input type="text" placeholder="输入领取码" v-model="code">
            <span @click="recevie()">领取</span>
        </div>
        <div class="code-wrapepr">
            <div class="code-info">
                <p>我的滴滴券</p>
                <p>当前：<span v-html="list.length"></span>个</p>
            </div>
            <div class="code-list">
                <ul>
                    <li v-for="item in list"><img src="../../assets/icon/activation-5.png"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                list: [],
                code: ''
            }
        },
        mounted () {
            this.getDate();
        },
        methods: {
            getDate: function () {
                myFn.ajax('get', {}, apiAddress.didi.mylist, (res) => {
                    this.list = res.data.data;
                })
            },
            recevie: function () {
                myFn.ajax('post', {mobile: '18088888888', code: this.code}, apiAddress.didi.recevie, (res) => {
                    
                })
            }
        }
    }
</script>

<style scoped>
    .activationCode {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background: #fff;
    }
    .receive-wrapper {
        height: 50px;
        background: #ededed;
        padding: 7px 15px;
        font-size: 0;
        padding-right: 0;
    }
    .receive-wrapper input {
        width: 85%;
        height: 100%;
        border: 0;
        display: inline-block;
        font-size: .7rem;
        text-align: center;
        vertical-align: middle;
    }
    .receive-wrapper span {
        width: 15%;
        height: 100%;
        font-size: .7rem;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 36px;
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