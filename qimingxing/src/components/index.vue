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
        }
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
    /* 分页 */
    .pagination {
        position: relative;
        width: 100%;
        text-align: center;
        margin: 0px 0px;
    }
    .pagination li{
        display: inline-block;
        margin:0 5px;
    }
    .pagination li a{
        padding:.5rem 1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;
        color:#0E90D2;
    }
    .pagination li a:hover{
        background:#eee;
    }
    .pagination li.active a{
        background:#0E90D2;
        color:#fff;
    }
    .bootstrap-datetimepicker-widget  ul{
        padding: 0px 15px;
        list-style: none;
    }
    .picker-switch{
        display: none;
    }
    #datetimepicker1 label, #datetimepicker2 label, .queryLable{
        margin-left: 10px;
        margin-top: 7px;
        font-size: 1.2em;
        font-weight: 100;
    }
    #datetimepicker1 .form-control, #datetimepicker2 .form-control{
        width: 100px;
        float: right;
        border-radius: 4px 0px  0px 4px;
    }
    .queryInput{
        width: 118px;
        /*float: left;*/
        display: inline-block;
    }
    .picker-switch{
        /*display: none;*/
    }
    /* 弹出层 */
    .modal-dialog{
        margin: 100px auto;
    }
    .allpageLength {
        font-size: 14px;
        font-weight: 900;
        margin-left: 8px;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
