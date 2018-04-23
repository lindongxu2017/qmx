<template>
    <nav class="bar bar-tab" v-if="identityType == 1">
        <router-link to="/index/todayTask" class="tab-item external">
            <img v-show="$route.path == '/index/todayTask'" src="../assets/nav-icon/todayTask-check.png">
            <img v-show="$route.path != '/index/todayTask'" src="../assets/nav-icon/todayTask.png">
        </router-link>

        <router-link to="/index/feddbackre" class="tab-item external active" style="position: relative;">
            <div v-show="count > 0" style="position: absolute;display: inline-block;width: 10px;height: 10px;border-radius:50%;background: red;right: 25%;top: 10%;"></div>
            <img v-show="$route.path == '/index/feddbackre'" src="../assets/nav-icon/feddback-check.png">
            <img v-show="$route.path != '/index/feddbackre'" src="../assets/nav-icon/feddback.png">
        </router-link>

        <router-link to="/index/change" class="tab-item external active">
            <img v-show="$route.path == '/index/change'" src="../assets/nav-icon/change-check.png">
            <img v-show="$route.path != '/index/change'" src="../assets/nav-icon/change.png">
        </router-link>

        <router-link to="/index/taskcenter" class="tab-item external active">
            <img v-show="$route.path == '/index/taskcenter'" src="../assets/nav-icon/taskcenter-check.png">
            <img v-show="$route.path != '/index/taskcenter'" src="../assets/nav-icon/taskcenter.png">
        </router-link>
    </nav>
</template>

<script>


export default {
    name: 'bar-tab',
        data () {
            return {
                identityType:1,
                count:0
            }
        },
        mounted() {
            this.identityType = myFn.getUserInfo('type');
            var self = this;
            myFn.ajax('get', {}, apiAddress.task.noReadCount, function(res){
                self.count = res.data.count;
            });
            window.footNav = this;
            this.$on('readlist', function() {
                if (this.count > 0) {
                    this.count--;
                }
            })
        }
    }
</script>
<style>
    .page {
        display: block !important; 
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bar-tab{
        background: #fff;
        border-top: 1px solid #E2E3E4;
    }
    .bar-tab img{
        margin-top: 7px;
    }

    nav img{
        width: 50%;
    }
</style>
