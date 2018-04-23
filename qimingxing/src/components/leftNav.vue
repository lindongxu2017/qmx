<template>
    <div class="leftNav">

   		<!-- SIDE MENU -->
	    <div id="skin-select">

	        <div id="logo">
	         <h1>启明星<span style="margin-left:5px;">配送管理系统 v2.0</span></h1>
	        </div>

	        <div class="skin-part">
	            <div id="tree-wrap" style="height:auto">
	                <div class="side-bar">
	                    <ul class="topnav menu-left-nest" style="margin:10px;">
	                        <li>
	                            <a style="border-left:0px solid!important;" class="title-menu-left">

	                                <span class="widget-menu"></span>
	                                <i data-toggle="tooltip" class="entypo-cog pull-right config-wrap"></i>

	                            </a>
	                        </li>
	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="配送员管理">
	                                <i class="fontawesome-user"></i>
	                                <span>配送员管理</span>

	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="courier"><i class="fontawesome-legal"></i><span>配送员审核</span></router-link>
	                                </li>
	                                <li>
	                                    <router-link to="courierArchives"><i class="fontawesome-book"></i><span>配送员档案</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="配送任务">
	                                <i class="icon icon-document"></i>
	                                <span>配送订单</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="orderAllocation"><i class="icon icon-download"></i><span>订单分配</span></router-link>
	                                </li>
	                                <!-- <li>
	                                    <router-link to="today_task"><i class="fontawesome-check"></i><span>订单分配</span></router-link>
	                                </li> -->
	                                <li>
	                                    <router-link to="notDelivered_task"><i class="fontawesome-edit"></i><span>未分配</span></router-link>
	                                </li>
	                                <li>
	                                    <router-link to="yesDelivered_task"><i class="fontawesome-search"></i><span>订单查询</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="配送任务">
	                                <i class="fontawesome-bookmark-empty"></i>
	                                <span>服务券管理</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="volume_notSend"><i class="fontawesome-resize-small"></i><span>未送出</span></router-link>
	                                </li>
	                                <li>
	                                    <router-link to="volume_alreadySend"><i class="fontawesome-resize-full"></i><span>已送出</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
							<li>
	                            <a class="tooltip-tip ajax-load"  title="系统设置">
	                                <i class="fontawesome-cog"></i>
	                                <span>系统设置</span>

	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="myInfoEdit"><i class="fontawesome-map-marker"></i><span>站点信息</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                    </ul>

	                </div>
	            </div>
	        </div>
	        
	    </div>
	    <!-- END OF SIDE MENU -->

    </div>
</template>

<script>

export default {
    name: 'leftNav',
        data () {
            return {
            }
        },
        mounted(){

            head.js("./static/js/custom/scriptbreaker-multiple-accordion-1.js", function() {
			    $(".topnav").accordionze({
			        accordionze: true,
			        speed: 500,
			        closedSign: '<img src="./static/img/plus.png">',
			        openedSign: '<img src="./static/img/minus.png">'
			    });

			});

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#logo{
		max-width: 250px;
	}
	#logo h1{
		margin-top: 30px;
	}
	#logo h1 span{
	    letter-spacing: 0.5px;
	    font-size: 15px;
	    margin-left:5px;
	}
	#skin-select #toggle{
		top: 0px;
	}
</style>
