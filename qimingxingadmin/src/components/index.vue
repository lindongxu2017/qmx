<template>
    <div class="index">

    	<!-- 顶部导航 -->
        <router-view name="topNav"></router-view>

        <!-- 内容 -->
        <router-view name="content"></router-view>

        <!-- 左侧导航 -->
        <router-view name="leftNav"></router-view>
    </div>
</template>

<script>

export default {
    name: 'index',
        data () {
            return {
            }
        },
    }
</script>
<style>
    
    .paper-wrap{
        min-height: 1000px;
    }
    #roleManagement{
        margin-left: 250px;
    }
    .footable > thead > tr > th{
        text-align: center;
    }
    .footable > thead > tr > th:first-child{
        border:none;
    }
    .footable > tbody > tr > td:first-child{
        border-left:none;
    }
    .footable > tbody{
        font-size: 14px;
        font-family: "Microsoft YaHei";
    }
    form{
        color: #9ea7b3 !important;
        margin-top: 50px;
    }
    form button{
        width: 100px;
        margin-top: 30px;
    }
    table{
        margin-bottom: 15px;
    }
    .allpageLength{
        font-size: 14px;
        font-weight: 900;
        margin-left: 8px;
        line-height:30px;
    }
    .allpageLength span{
        margin:0px 7px;
        color:#2a6496;
        font-size:18px;
    }
   
    tr {
        height: 42px;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
