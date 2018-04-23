<template>
    <div class="infoEdit">
        <div class="form public-bg-white">
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">姓名</label>
                    <input class="form-control" type="text" placeholder="请输入手机号码" v-model="userInfo.dm_name">
                </div>
            </div>
            <div class="form-group">
                <div class="form-content">
                    <label class="form-label">手机号</label>
                    <input class="form-control" type="text" placeholder="请输入收货地址" v-model="userInfo.dm_phone">
                </div>
            </div>
        </div>
        <p><a @click="set_userInfo" class="button button-big button-round btn-custom" style="margin-top: 100px;">保存</a></p>
    </div>
</template>

<script>


export default {
    name: 'infoEdit',
        data () {
            return {
                userInfo:{}
            }
        },
        mounted () {
            this.get_userInfo();
        },
        methods: {
            get_userInfo: function() {
                var self = this;
                myFn.ajax('get', {}, apiAddress.userInfo.getUserInfo, function(res){
                    self.userInfo = res.data;
                });
            },
            set_userInfo: function() {
                var data = {
                    "dm_name": this.userInfo.dm_name,
                    "dm_phone": this.userInfo.dm_phone
                }
                var self = this;
                myFn.ajax('post', data, apiAddress.userInfo.setUserInfo, function(res){
                    alert('保存成功');
                    self.$router.push('/index/center');
                });
            },
            del_license: function(id, index) {
                var data = {
                    "id": id
                };
                var self = this;
                myFn.ajax('post', data, apiAddress.userInfo.delLicense, function(res){
                    self.userInfo.license.splice(index, 1);
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

        .license{
            padding: 15px;
        }
        .license .list-block ul:before,
        .license .list-block ul:after{
            height: 0;
        }
        .license .list-block .item-inner{
            height: 50px;
            margin-left: 0;
            padding-right: 0;
        }
        .license .list-block .item-content{
            padding-left: 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        .license .list-block .item-title{
            color: #000;
        }
        .license .list-block .item-inner img{
            margin-top: -6px;
        }
        .license .input-group{
            margin: 20px 0;
        }
        .license .input-group input{
            background: #eee;
            border-radius: 5px;
            text-indent: 15px;
            font-size: 16px;
        }
        .del{
            position: relative;
        }
        .del img{
            position: absolute;
            top: 9px;
            right: 9px;
            width: 25px;
        }
</style>
