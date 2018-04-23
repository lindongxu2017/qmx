<template>
    <div class="page page-current">
        <!-- 底部导航 -->
        <router-view name="footerNav"></router-view>
        <!-- 内容 -->
        <div class="content infinite-scroll">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>


export default {
    name: 'page-group',
    beforeRouteEnter (to, from, next) {
        var data = {
            type: 0
        }
        if (myFn.GetQueryString('code')) {
            data.code = myFn.GetQueryString('code');
        }
        myFn.ajax('get', data, apiAddress.wx.login, function(res){
            next();
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
