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
	                        <li v-if="jurisdiction.show_adminlist || jurisdiction.show_rolelist || jurisdiction.show_setUp">
	                            <a class="tooltip-tip ajax-load"  title="系统管理">
	                                <i class="fontawesome-cog"></i>
	                                <span>系统管理</span>

	                            </a>
	                            <ul>
	                                <li v-if="jurisdiction.show_adminlist">
	                                    <router-link to="adminlist"><i class="fontawesome-user"></i><span>管理员管理</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_rolelist">
	                                    <router-link to="jurisdictionlist"><i class="fontawesome-user-md"></i><span>角色管理</span></router-link>
	                                </li>
	                            	<li v-if="jurisdiction.show_setUp">
	                                    <router-link to="wxApi"><i class="fontawesome-comments"></i><span>公众号接口</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="配送站点管理">
	                                <i class="fontawesome-truck"></i>
	                                <span>配送站点管理</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="site"><i class="icon icon-location"></i><span>配送站点</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="配送站点管理">
	                                <i class="icon icon-view-thumb"></i>
	                                <span>分拣中心管理</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="sortingCenter"><i class="fontawesome-resize-full"></i><span>分拣核对</span></router-link>
	                                </li>
	                                <li>
	                                    <router-link to="importOrder"><i class="icon icon-document-edit"></i><span>订单分配</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li v-if="jurisdiction.show_companylist || jurisdiction.show_psUserlist">
	                            <a class="tooltip-tip ajax-load"  title="保险公司管理">
	                                <i class="fontawesome-sitemap"></i>
	                                <span>保险公司管理</span>
	                            </a>
	                            <ul>
	                                <li v-if="jurisdiction.show_companylist">
	                                    <router-link to="companylist"><i class="entypo-adjust"></i><span>保险公司</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="staffAudit"><i class="fontawesome-legal"></i><span>人员审核</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="underwriterList"><i class="icon icon-document"></i><span>保险员列表</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li v-if="jurisdiction.show_companylist || jurisdiction.show_psUserlist">
	                            <a class="tooltip-tip ajax-load"  title="保险公司管理">
	                                <i class="fontawesome-money"></i>
	                                <span>提现管理</span>
	                            </a>
	                            <ul>
	                                <li v-if="jurisdiction.show_companylist">
	                                    <router-link to="withdrawals_vehicleMaster"><i class="fontawesome-ambulance"></i><span>车主提现</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="withdrawals_shop"><i class="fontawesome-home"></i><span>商家提现</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li v-if="jurisdiction.show_companylist || jurisdiction.show_psUserlist">
	                            <a class="tooltip-tip ajax-load"  title="保险公司管理">
	                                <i class="icon-document"></i>
	                                <!-- <i style="font-size: 20px;margin-left: 7px;">☆</i> -->
	                                <span>服务券管理</span>
	                            </a>
	                            <ul>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="volume_alreadySend"><i class="icon-forward"></i><span>已送出</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_companylist">
	                                    <router-link to="volume_notSend"><i class="fontawesome-ban-circle"></i><span>未送出</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="volume_proportion"><i class="icon icon-graph-bar"></i><span>兑换比例</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
 	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="保险公司管理">
	                                <i class="fontawesome-pause"></i>
	                                <span>兑换券</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="activationCode"><i class="fontawesome-barcode"></i><span>激活码</span></router-link>
	                                </li>
	                                <li>
	                                    <router-link to="didiCode"><i class="icon icon-tag"></i><span>滴滴券</span></router-link>
	                                </li>
	                                <li>
	                                    <router-link to="uservolumelist"><i class="icon icon-tag"></i><span>用户滴滴券列表</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li v-if="jurisdiction.show_companylist || jurisdiction.show_psUserlist">
	                            <a class="tooltip-tip ajax-load"  title="保险公司管理">
	                                <i class="fontawesome-ambulance"></i>
	                                <span>车主管理</span>
	                            </a>
	                            <ul>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="vehicleMaster_list"><i class="icon-document"></i><span>车主列表</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li v-if="jurisdiction.show_companylist || jurisdiction.show_psUserlist">
	                            <a class="tooltip-tip ajax-load"  title="保险公司管理">
	                                <i class="fontawesome-home"></i>
	                                <span>商家管理</span>
	                            </a>
	                            <ul>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="shop_list"><i class="icon-document"></i><span>商家列表</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="shop_examine"><i class="fontawesome-legal"></i><span>商家审核</span></router-link>
	                                </li>
	                                <li v-if="jurisdiction.show_psUserlist" >
	                                    <router-link to="shop_buildType"><i class="icon icon-view-thumb"></i><span>商家类型</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li>
	                            <a class="tooltip-tip ajax-load"  title="订单数据查询">
	                                <i class="icon icon-search"></i>
	                                <span>数据查询</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="queryOrderlist"><i class="fontawesome-search"></i><span>订单详情</span></router-link>
	                                </li>
	                            </ul>
	                        </li>
	                        <li v-if="this.jurisdiction.show_gift">
	                            <a class="tooltip-tip ajax-load"  title="官网礼品">
	                                <i class="fontawesome-gift"></i>
	                                <span>官网礼品</span>
	                            </a>
	                            <ul>
	                                <li>
	                                    <router-link to="giftList"><i class="icon icon-document"></i><span>礼品列表</span></router-link>
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
            	jurisdiction:{
            		show_adminlist:'',
            		show_rolelist:'',
            		show_giftlist:'',
            		show_setUp:'',
            		show_companylist:''
            	}
            }
        },
        mounted(){

        	// 权限控制
            this.jurisdiction.show_adminlist = myFn.getLocalStorageVal('jurisdiction', 13) ? true : false;
            this.jurisdiction.show_rolelist = myFn.getLocalStorageVal('jurisdiction', 15) ? true : false;
            this.jurisdiction.show_giftlist = myFn.getLocalStorageVal('jurisdiction', 29) ? true : false;
            this.jurisdiction.show_setUp = myFn.getLocalStorageVal('jurisdiction', 33) ? true : false;
            this.jurisdiction.show_companylist = myFn.getLocalStorageVal('jurisdiction', 41) ? true : false;
            this.jurisdiction.show_gift = myFn.getLocalStorageVal('jurisdiction', 29) ? true : false;
            // 获取配送员列表权限
            this.jurisdiction.show_psUserlist = myFn.getLocalStorageVal('jurisdiction', 23) ? true : false;

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
	#skin-select li i{
		top: 2px;
	}
</style>
