<template>
	<div class="audit">
		<!-- <div class="header"><p>身份审核</p></div> -->
		<div class="backImg"><img src="../assets/audit.png"></div>
		<div class="msg">
			<p>您的身份正在审核中</p>
			<p>请耐心等待 ···</p>	
		</div>
	</div>
</template>

<script>
	export default{
		name:'audit',
		data(){
			return{

			}
		}
	}
</script>

<style scoped>
	body{
		background-color: #F1F1F1;
	}
	p{
		margin: 0;
	}
	.header{
		background-color: #fff;
		text-align: center;
		padding: 10px 0;
		font-size: 16px;
		font-family: "微软雅黑";
		color: #233233;
	}
	.backImg{
		text-align: center;
	}
	.backImg img{
		width: 20%;
		margin-top: 35%;
	}
	.msg{
		text-align: center;
		color: #454545;
		margin-top: 20px;
		font-family: "微软雅黑";
	}
	.msg p{
		margin-top: 5px;
		font-size: 18px;
	}
	.msg p:last-child{
		font-size: 16px;
	}
</style>