<template>
	<div class="welcome">
		<!--  PAPER WRAP -->
	    <div class="wrap-fluid" id="roleManagement">
	        <div class="container-fluid paper-wrap bevel tlbr">
	            <!-- CONTENT -->
	            <div class="row">
	                <div id="paper-top">
	                    <div class="col-sm-12">
	                        <h2 class="tittle-content-header">
	                            <span class="fontawesome-user"></span>
	                            <span style="font-weight:bold;color:#666;">欢迎</span>
	                        </h2>
	                    </div>
	                </div>
	            </div>
		           <!-- table-content -->
	                <div class="content-wrap" style="margin-top:10px;">
	                    <div class="row">

	                        <div class="col-sm-12">

	                            <div class="nest" id="welcomePage">
	                                <img src="../assets/LOGO(2).png" alt="">
	                                <h2 style="font-family: 微软雅黑;">欢迎登录启明星配送管理系统</h2>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <!-- /END table-content -->   
					
	        </div>
	    </div>
	</div>
</template>

<script>
export default {
	name: 'welcome',
		data () {
			return {
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#welcomePage {
		height: 800px;
		position: relative;
		text-align: center;
	}
	#welcomePage img {
		margin-top: 150px;
		margin-bottom: 30px;
	}
	#welcomePage h2 {
		letter-spacing: 3px;
	}
</style>
