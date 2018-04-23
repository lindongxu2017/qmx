<template>
    <div class="topNav">

   		<nav role="navigation" class="navbar navbar-static-top">
	        <div class="container-fluid">
	            <!-- Brand and toggle get grouped for better mobile display -->

	            <!-- Collect the nav links, forms, and other content for toggling -->
	            <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
	                <ul class="nav navbar-nav">
	                    
	                </ul>

	                <ul style="margin:20px 15px 0 0;color:#fff;font-size:16px" class="nav navbar-nav navbar-right">
	                    <li style="font-size:20px">站点： <span id="welcome_username" style="margin-left:5px;" v-html="dis_name">admin</span></li>
	                    <li style="margin-left:20px;cursor:pointer" @click="exit()">退出</li>
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
            	dis_name:''
            }
        },
        mounted(){
        	this.dis_name = myFn.getUserInfo('dis_name');
        },
        methods:{
        	exit: function(){
        		var self = this;
        		myFn.ajax('get', {}, apiAddress.login.exitLogin, function(res){
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
