<template>
    <div class="QRcode">
        <div class="content">
            <div class="QRcode-content">
                <img :src="my_interface+'?url=' + url">
            </div>
            <p class="desc">扫一扫收券</p>
        </div>
    </div>
</template>

<script>


export default {
    name: 'QRcode',
        data () {
            return {
                // url: escape(location.hostname + ':8089/#/index/pay'),
                url: escape(location.hostname + '/carmain/#/index/pay'),
                my_interface: apiAddress.coupon.QRcode
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content{
        background: #1B232E;
    }
    .QRcode-content{
        width: 230px;
        height: 230px;
        padding: 20px;
        margin: auto;
        margin-top: 70px;
        background: #fff;
        border-radius: 5px;
    }
    .QRcode-content img{
        width: 100%
    }
    .desc{
        text-align: center;
        font-size: 1rem;
        color: #fff;
        margin-top: 15px;
        font-family: 'Microsoft YaHei'
    }
</style>
