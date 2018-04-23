<template>
	<div class="bankcard">
		<!-- 这里是页面内容区 -->
        <div class="content public-bg-white">
            <div class="bankInfo" v-if="bankId">
                <div class="bankcard">
                    <img src="../assets/images/bankcard.png">
                    <p class="card-name" v-html="mybank.username">中国平安银行</p>
                    <p class="card-num" v-html="mybank.bankcard">6214 869587415983698</p>
                </div>
                <div class="banktext">
                    <div>
                        <p class="deepGrap">用户名</p>
                        <p class="margin-t-7" v-html="mybank.bankname">用户名文字示例</p>
                    </div>
                    <div>
                        <p class="deepGrap">金额</p>
                        <p class="margin-t-7 orange">￥888888</p>
                    </div>
                </div>
            </div>
            <p class="null deepGrap" v-if="!bankId">暂无···</p>
            <p><a v-if="bankId" class="button button-big button-round btn-custom" style="margin-top: 130px;" @click="bankcardEdit(bankId)">编辑</a></p>
            <p><a v-if="!bankId" class="button button-big button-round btn-custom" style="margin-top: 130px;" @click="bankcardadd()">添加银行卡</a></p>
        </div>
	</div>
</template>

<script>
	export default{
		name:'bankcard',
		data(){
			return{
				mybank:{},
				bankId:''
			}
		},
		mounted(){
			var self = this;
			self.bankcard();
			
			/*setTimeout(function(){
				console.log(self.bankId)
				myFn.ajax('post',{id:self.bankId},apiAddress.bank.delbank,function(res){
				
				})
			},2000)*/
			
		},
		methods:{
			bankcard:function(){
				var self = this;
				myFn.ajax('get',{},apiAddress.bank.banklist,function(res){
					self.mybank = res.data[0];
					/*self.bankId = res.data[0].id;*/
				})
			},
			bankcardEdit:function(id){
				this.$router.push({name:'myback',query:{id:id}});
			},
			bankcardadd:function(){
				this.$router.push({name:'myback'});
			}
		}
	}
</script>

<style scoped>
	.bankInfo{
        padding: 20px 15px;
    }
    .bankInfo .bankcard{
        position: relative;
    }
    .bankInfo .bankcard img{
        width: 100%;
    }
    .bankInfo .bankcard p{
        position: absolute;
        left: 10%;
        color: #fff;
        font-size: 1rem;
    }
    .bankInfo .bankcard p.card-name{
        top: 10%;
    }
    .bankInfo .bankcard p.card-num{
        bottom: 10%;
    }
    .bankInfo .banktext{
        display: flex;
        padding: 20px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #ddd;
    }
    .bankInfo .banktext:after{
        content: '';
        position: absolute;
        width: 1px;
        height: 40px;
        background: #ddd;
        left: 50%;
        top: 35px;
        margin-left: 10px;
    }
    .bankInfo .banktext > div{
        flex:1;
    }
    .bankInfo .banktext > div p:nth-child(even){
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .null{
    	text-align: center;
    	margin-top: 30px;
    	font-size: .7rem;
    }
</style>