<template>
    <nav class="footerNav bar bar-tab public-bg-white">
        <router-link :to="{name:'indexCoupon'}" class="tab-item external" active-class="active">
            <span class="icon iconfont icon-fuwu"></span>
            <span class="tab-label">服务券</span>
        </router-link>

        <router-link :to="{name:'indexCenter'}" class="tab-item external" active-class="active">
            <span class="icon iconfont icon-gerenzhongxin"></span>
            <span class="tab-label">个人中心</span>
        </router-link>
    </nav>
</template>

<script>


export default {
    name: 'footerNav',
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
