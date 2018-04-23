<template>
    <div class="index">
        <div class="page-group">
          <div class="page">

        <!-- 底部导航 -->
        <router-view name="footerNav"></router-view>

        <!-- 内容 -->
        <router-view name="content"></router-view>
        </div></div>
    </div>
</template>

<script>


export default {
    name: 'index',
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
