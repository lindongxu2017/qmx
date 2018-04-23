<template>
    <div class="login">
        <div class="form public-bg-white">
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">姓名</label>
                    <input class="form-control" type="text" placeholder="真实姓名" v-model="name">
                </div>
            </div>
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">手机号码</label>
                    <input class="form-control" type="text" placeholder="请输入手机号码" v-model="phone">
                </div>
            </div>
            <div class="form-group relative">
                <div class="form-content">
                    <label class="form-label">验证码</label>
                    <input class="form-control" type="text" placeholder="请输入验证码" v-model="code">
                    <a href="#" class="button button-sm button-round btn-custom code" style="width:60px;line-height: 1.35rem;">获取</a>
                </div>
            </div>
        </div>

        <p><a @click="submit" class="button button-big button-round btn-custom" style="margin-top: 100px;">保存</a></p>
  </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            name:'',
            phone:'',
            code:''
            // msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        submit: function () {
            var data = {
                "dm_name": this.name,
                "dm_phone": this.phone,
                "code": this.code
            }
            var self = this;
            myFn.ajax('post', data, apiAddress.login.register, function(res){
                self.$router.push('/index/service');
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
    .relative{
        position: relative;
    }
    .code{
        position: absolute;
        right: 10px;
        top: 50px;
    }
</style>
