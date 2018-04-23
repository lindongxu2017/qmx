<template>
    <div class="center">
        <div class="header">
            <div class="list-block media-list">
                <ul>
                    <router-link :to="{name:'infoEdit'}" tag="li">
                        <span class="item-link item-content">
                        <div class="item-media"><img :src="imgheader" style='width: 4rem;margin: 0px 10px;'></div>
                            <div class="item-inner">
                                <div class="it  em-text" style="font-size: 24px;" v-html='name'>个人中心用户名...</div>
                                <div class="item-title-row">
                                    <div class="item-title couponNumber">
                                        <span>服务券：</span>
                                        <span v-html="couponTotal">800</span>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </router-link>
                </ul>
              </div>
        </div>
        <div class="list-block margin-t-7 member-link">
            <ul>
                <router-link :to="{name:'myback'}" tag="li" class="item-content item-link">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">我的银行卡</div>
                    </div>
                </router-link>
                <router-link :to="{name:'license'}" tag="li" class="item-content item-link">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">我的车牌</div>
                    </div>
                </router-link>
                <router-link :to="{name:'QRcode'}" tag="li" class="item-content item-link">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">我要收券</div>
                    </div>
                </router-link>
                <router-link :to="{name:'exchange'}" tag="li" class="item-content item-link">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">兑换滴滴券</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    name: 'center',
        data () {
            return {
                name:'',
                couponTotal:'',
                imgheader:''
            }
        },
        mounted () {
            this.getData();
            var self = this;
            myFn.ajax('get',{}, apiAddress.coupon.couponTotal ,function(res){
                self.couponTotal = res.data.volume;
            });
        },
        methods: {
            getData: function () {
                var self = this;
                myFn.ajax('get', {}, apiAddress.userInfo.getUserInfo, function(res) {
                    self.name = res.data.dm_name;
                    self.imgheader = res.data.headimgurl;
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{
        padding: 10px 0;
        background: #fff;
    }
    .item-title-row .couponNumber {
        margin-top: 5px;
        font-size: 0.9em;
    }
    .list-block ul:before,.list-block ul:after{
        height: 0;
    }
    .list-block .item-text{
        line-height: 2.1rem;
    }
    .list-block.media-list .item-inner{
        padding-top: 1rem;
    }
    .list-block .item-inner{
        min-height: 2.7rem;
    }
    .header .list-block .item-link .item-inner {
        border: none;
        background: transparent;
    }
    .header .list-block .item-link .item-inner:after {
        height: 0;
    }
    .list-block.member-link .item-link .item-inner{
        background-image: url(../assets/icon/item-link.png);
        background-size: 10px;
        background-repeat: no-repeat;
        background-position: 95% center;
    }
</style>
