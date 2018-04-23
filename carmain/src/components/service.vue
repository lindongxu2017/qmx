<template>
    <div class="service">
        <!-- 搜索栏 -->
        <div class="content-block search">
            <div class="search-left">
                <img src="../assets/icon/local.png">
                <!-- <input type="text" id='city-picker'  /> -->
                <span @click="toggleCityPopup" class="city" v-html="selectCityName">深圳</span>
                <img src="../assets/icon/pull-down.png">
            </div>
                <div class="search-right" @click="getlis_search(search.searchText)">搜索</div>
            <div class="search-middle">
                <img src="../assets/icon/search.png">
                <input type="text" placeholder="输入搜索内容" v-model="search.searchText">
            </div>
        </div>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"  v-for="item in shopTypeList">
                    <div class="seller public-bg-white">
                        <div v-for = "i in item" @click="selectShopType(i.id)"><img :src="i.icon"><p v-html="i.name">普通商家</p></div>
                    </div>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="list-block media-list sellerItemList">
            <ul>
                <li v-for="item in list.data">
                    <router-link :to="{name:'serviceDetails',query:{id:item.id}}" class="item-content">
                        <div class="item-media">
                            <img :src="item.image" style='width: 4rem;'>
                        </div>
                        <div class="item-inner">
                            <div class="item-title-row">
                                <div class="item-title deepGrap" v-html="item.shopname">大众汽车中心</div>
                                <div class="item-after">
                                    <img src="../assets/icon/map.png">
                                    <span v-html="item.city_name">深圳</span>
                            </div>
                            </div>
                            <div class="item-text">
                                <span class="orange">服务项目：</span>
                                <span v-html="item.service_project">服务项目文字示例 服务项目文字示例 服务项目文字示例 服务项目文字示例 服务项目文字示例</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader" v-show="current_length < total_length">
            <div class="preloader">
            </div>
        </div>

        <p id="noMore" style="text-align:center;font-size:12px;padding:15px 0;color:#999;" v-show="current_length >= total_length">没有更多了...</p>   
        <div class="cityPopup">
            <ul>
                <li v-for="item in citys" class="province" @click="openCity($event)">
                    <p v-html="item.name"></p>
                    <img src="../assets/icon/item-link.png" />
                    <div>
                        <span  v-for="i in item.sub" v-html="i.name" @click="selectCity(i.name)">2222</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    name: 'service',
        data () {
            return {
                list:[],
                shopTypeList:[],
                selectCityName:'深圳',
                search:{},
                citys:{},

                //数据总长度
                total_length:'',
                //当前长度
                current_length:'',
                //当前页码
                current_page: 1
            }
        },
        mounted () {

            var self = this;


            self.citys = window.citys;
            if (localStorage.city) {
                self.selectCityName = localStorage.city;
            }
            $("#city-picker").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">商家所在地</h1>\
                </header>'
            });
            self.getlist(1,self.selectCityName); 
            self.getShopTypeList();
        },
        methods:{
            initSwiper: function () {

                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination'
                });
            },
            getlis_search: function (condition) {
                this.getlist(1, this.selectCityName, condition);
            },
            // 页码，店铺名称，城市，类型
            getlist: function(page, city,  condition, type) {
                var data = {
                    "page": page,
                    "cityname": city
                }

                if (type) {
                    data.cateid = type;
                }

                if (condition) {
                    data.shopname = condition;
                }

                var self = this;
                myFn.ajax('get', data, apiAddress.shop.shoplist, function(res){
                    if(page == 1 ){
                        self.list = res.data;
                    }else {
                        self.list = self.list.concat(res.data.data);
                        self.total_length = res.data.total;
                        self.current_length = self.list.length;
                    }
                });
            },
            getShopTypeList: function () {
                var self = this;
                myFn.ajax('get', {}, apiAddress.shop.shopTypeList, function(res){
                    if (res.data != '') {
                        for (var i = 0;  i < res.data.length; i++) {
                            if (i%3 == 3 || i%3 == 0) {
                                self.shopTypeList.push([]);
                            }
                            self.shopTypeList[parseInt(i/4)].push(res.data[i]);
                            console.log(self.shopTypeList)
                        }
                    }
                    setTimeout(function(){
                        self.initSwiper();
                    },500)
                });  
            },
            selectShopType: function (id) {
                this.getlist(1, this.selectCityName, '', id);
            },
            toggleCityPopup: function () {
                $('.cityPopup').css('left','0%');
            },
            openCity: function (e) {
                $(e.target).nextAll('div').toggle();
            },
            selectCity: function (name) {
                this.selectCityName = name;
                localStorage.city = name;
                $('.cityPopup').css('left','100%');

                //重置城市后重新获取
                this.getlist(1,this.selectCityName)
            },
            scrollDown:function(){
                var self = this;
                var loading = false;
                // 注册'infinite'事件处理函数
                $(document).on('infinite', function() {
                    // 如果正在加载，则退出
                    if (loading) return;
                    // 设置flag
                    loading = true;
                    
                    setTimeout(function() {
                        // 重置加载flag
                        loading = false;
                        if (self.current_length >= self.total_length) {
                            // 加载完毕，则注销无限加载事件，以防不必要的加载:$.detachInfiniteScroll($('.infinite-scroll'));多个无线滚动请自行根据自己代码逻辑判断注销时机
                            // 删除加载提示符
                            $('.infinite-scroll-preloader').hide();
                            console.log('没有更多了')
                            return false;
                        }
                        //ajax加载数据
                        self.current_page ++;

                        self.getlist(self.current_page,self.selectCityName);

                        $.refreshScroller();
                    }, 1000);
                });
                $.init();
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .search-left span{
            margin: 0 3px;
        }
        .search-right {
            position: relative;
            z-index: 5
        }
        .city {
            display: inline-block;
            position: relative;
            z-index: 2;
            width: 40px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: top;
        }
        .seller{
            width: 100%;
            height: 120px;
            padding-top: 25px;
        }
        .seller > div{
            width: 25%;
            height: 100%;
            float: left;    
            text-align: center; 
            font-size: 16px;
            color: #5f646e;
        }
        .seller > div img{
            width: 40px;
            height: 40px;
        }
        .list-block .item-text{
            margin-top: 10px;
        }
        .list-block .item-after{
            font-size: 16px;
            line-height: 28px;
        }
        .list-block .item-after img{
            width: 14px;
            height: 14px;
            vertical-align: ;
            display: inline-block;
            margin-top: 5px;
            margin-right: 3px;
        }
        .list-block ul{
            background: none;
        }
        .list-block ul li{
            background: #fff;
            margin-top: 7px;
            padding: 5px 0;
        }
        .swiper-slide img{
            display: inline-block;
        }
        .swiper-container{
            padding-bottom: 0;
        }
        .swiper-container-horizontal>.swiper-pagination-bullets{
            bottom: 0;
        }
        .swiper-pagination-bullet-active{
            background: #f08200;
        }
        .cityPopup {
            width: 100%;
            height: 100%;
            background: #fff;
            position: fixed;
            top: 0px;
            left: 100%;
            z-index: 15;
            overflow-x: auto;
            transition:left .5s ease-in;
        }
        .cityPopup ul{
            margin:0px;
            padding:10px 15px;
            list-style: none;
        }
        .cityPopup ul li {
            border-bottom: 1px #ccc solid;
            line-height: 45px;
            position: relative;
        }
        .cityPopup ul li div {
            display: none;
            /* display: inline-block; */
        }
        .cityPopup ul li div span {
            font-size: 18px;
            padding:3px 7px;
            border-radius: 3px;
            color: #EDBC82;
            border:1px #EDBC82 solid;
            margin: 7px;
            /* white-space:nowrap; */
            display: inline-block;
            height: 28px;
            line-height: 23px;
        }
        .cityPopup ul li img {
            width: 10px;
            position: absolute;
            right: 10px;
            top: 15px;
        }
</style>
