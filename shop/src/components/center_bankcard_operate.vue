<template>
    <div class="myback">
         <div class="form public-bg-white">
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">开户行和支行名称</label>
                    <input class="form-control" type="text" placeholder="请输入开户行和支行名称" v-model="bankDetails.bankname">
                </div>
            </div>
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">用户名</label>
                    <input class="form-control" type="text" placeholder="请输入用户名" v-model="bankDetails.username">
                </div>
            </div>
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">银行卡号</label>
                    <input class="form-control" type="text" placeholder="请输入银行卡号" v-model="bankDetails.bankcard">
                </div>
            </div>
        </div>
        <p><a @click="set_bankCard" class="button button-big button-round btn-custom" style="margin-top: 130px;">保存</a></p>
    </div>
</template>

<script>


export default {
    name: 'myback',
        data () {
            return {
                bankDetails:{
                    bankname:'',
                    username:'',
                    bankcard:''
                }
            }
        },
        mounted () {
            this.get_bankCard();
        },
        methods: {
            get_bankCard: function() {
                var self = this;
                myFn.ajax('get', {}, apiAddress.bank.getBank, function(res){
                    if (res.data == undefined) {
                        return false;
                    };
                    self.bankDetails = res.data
                });
            },
            set_bankCard: function() {
                var data = {
                    "bankname": this.bankDetails.bankname,
                    "username": this.bankDetails.username,
                    "bankcard": this.bankDetails.bankcard
                }
                var self = this;
                myFn.ajax('post', data, apiAddress.bank.setBank, function(res){
                    alert('保存成功');
                    self.$router.push('/index/center');
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .form{
        padding-top: 15px;
        padding-bottom: 30px;
    }
    .form-group{
        padding: 15px;
        padding-bottom: 0
    }
    .form-group .form-content{
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    .form-group .form-content .form-label{
        display: block;
        padding-bottom: 5px;
        color: #000;
    }
    .form-group .form-content .form-control{
        height: 35px;
        width: 100%;
        border: 0;
        font-size: 16px;
        line-height: 35px;
    }
</style>
