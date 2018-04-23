<template>
	<div class="status">
		<div class="status public-bg-white">
		    <img :src="imgUrl" />
		    <p class="orange" v-html="text"></p>
		</div>
		<p v-show="this.type != 3 && this.type != 4"><router-link to="/index/coupon" class="button button-big button-round btn-custom" style="margin-top: 130px;">确认</router-link></p>
	</div>
</template>

<script>
	export default{
		name:'status',
		data(){
			return{
				imgUrl: '',
				text: '审核中',
				type:4,
			}
		},
		mounted() {

			this.type = this.$route.query.type;
			switch (parseInt(this.type)) {
				case 1:
					this.imgUrl = require('../assets/icon/yesExchange.png');
					this.text = '提现审核已提交';
					break;
				case 2:
					this.imgUrl = require('../assets/icon/noExchange.png');
					this.text = '兑换失败';
					break;

				case 4:
					this.imgUrl = require('../assets/icon/noExchange.png');
					this.text = '您已有其他身份';
					break;
			}
		}
	}
</script>

<style scoped>
	.content{
            background: #fff;
        }
        .status{
            text-align: center;
            padding-top: 50px;
        }
        .status img{
            width: 150px;
        }
        .status p{
            font-size: 1.5rem;
            margin-top: 30px;
        }
</style>