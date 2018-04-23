<template>
    <div class="service_details">
        <div class="card demo-card-header-pic">
        <div valign="bottom" class="card-header color-white no-border no-padding">
        <img class='card-cover' :src="details.image">
        </div>
        <div class="card-footer">
            <p class="link deepGrap" style="font-size: 20px" v-html="details.shopname">大众汽车中心</p>
            <p class="link deepGrap">
                <img src="../assets/icon/map.png" style="width: 14px;margin-right: 5px;">
                <span v-html="details.city_name">深圳</span>
            </p>
        </div>  
        <div class="card-content">
            <div class="card-content-inner">
                <p class="color-gray"><span class="orange">类型：</span><span v-html="details.cate_name">普通商家</span></p>
                <p class="seller-desc">
                    <span class="seller-server orange">服务项目:</span>
                    <span class="seller-server-content" v-html="details.service_project">服务项目文字示例服务项目文字示例服务项目文字示例服务项目文字示例服务项目文字示例服务项目文字示例</span>
                </p>
            </div>
        </div>
    </div>

        <div class="list-block margin-t-7">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title"><span>联系电话：</span><a :href="'tel:'+ details.mobile" v-html="details.mobile">0755-88888888</a></div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title"><span>联系地址：</span><span v-html="details.addr">深圳市龙岗区坂田街道</span></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    name: 'service_details',
        data () {
            return {
                id:'',
                details:{}
            }
        },
        mounted () {
            this.id = this.$route.query.id; 
            this.getDetails(this.id);
        },
        methods: {
            getDetails: function (id) {
                var data = {
                    "id": this.id
                }
                var self = this;
                myFn.ajax('get', data, apiAddress.shop.shopDetails, function(res){
                    self.details = res.data;
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card-content-inner{
        padding-top: 0;
    }
    .card-footer{
        padding-bottom: 10px;
    }
    .card-content-inner > p:first-child{
        padding-bottom: 5px;
    }
    .seller-desc span.seller-server-content{
        padding-left: 10px;
    }
    .list-block .item-inner{
        min-height: 2.7rem;
    }
</style>
