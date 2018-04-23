<template>
    <div class="topNav">

   		<nav role="navigation" class="navbar navbar-static-top">
	        <div class="container-fluid">
	            <!-- Brand and toggle get grouped for better mobile display -->
	            <div class="navbar-header">
	                <button data-target="#bs-example-navbar-collapse-1" data-toggle="collapse" class="navbar-toggle" type="button">
	                    <span class="entypo-menu"></span>
	                </button>

	                <div id="logo-mobile" class="visible-xs">
	                   <h1>启明星<span>v1.1</span></h1>
	                </div>

	            </div>


	            <!-- Collect the nav links, forms, and other content for toggling -->
	            <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
	                <ul class="nav navbar-nav">
	                    
	                </ul>

	                <ul style="margin:20px 15px 0 0;color:#fff" class="nav navbar-nav navbar-right">
	                    <li style="font-size:24px;font-family:微软雅黑;">Hi ! <span id="welcome_username" style="margin-left:5px;" v-html="userName">admin</span></li>
	                    <li style="margin-left:20px;cursor:pointer;font-size:16px;" @click="exit()">退出</li>
	                </ul>

	            </div>
	            <!-- /.navbar-collapse -->
	        </div>
	        <!-- /.container-fluid -->
	    </nav>

    </div>
</template>

<script>
export default {
    name: 'topNav',
        data () {
            return {
            	userName:''
            }
        },
        mounted(){
        	this.userName = myFn.getUserInfo('username');
        },
        methods:{
        	exit: function(){
        		var self = this;
        		myFn.ajax('get', {}, apiAddress.login.logout, function(res){
                    self.$router.push({path:'/'});
                    localStorage.clear();
                })
        	}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
