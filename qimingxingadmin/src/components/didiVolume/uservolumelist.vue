<template>
    <div class="didiCode">
        <!--  PAPER WRAP -->
        <div class="wrap-fluid" id="roleManagement">
            <div class="container-fluid paper-wrap bevel tlbr">
                <!-- CONTENT -->
                <div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon icon-tag"></span>
                                <span class="public-page-name">用户滴滴券列表</span>
                            </h2>
                        </div>
                    </div>
                </div>
                   <!-- table-content -->
                    <div class="content-wrap" >
                        <div class="row">

                            <div class="col-sm-12">

                                <div class="nest" id="FootableClose">
                                    <!-- <div class="title-alt">
                                        <h6>权限管理</h6>
                                    </div> -->

                                    <div class="body-nest" id="Footable">
                                        <div class="row" style="margin-bottom:13px">
                                        </div>
                                        <table class="table-striped footable-res footable metro-blue" data-page-size="6">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">
                                                        序号
                                                    </th>
                                                    <th>
                                                        类型
                                                    </th>
                                                    <th>
                                                        手机号码
                                                    </th>
                                                    <th>
                                                        花费服务费
                                                    </th> 
                                                    <th>
                                                        使用状态
                                                    </th>
                                                    <th>
                                                        使用时间
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in orderlist">
                                                    <td v-html="index+((current-1)*10)+1" style="text-align: center;"></td>
                                                    <td v-html="codeTypelist[item.ticket_type_id]"></td>
                                                    <td v-html="item.mobile"></td>
                                                    <td v-html="item.volume"></td>
                                                    <td v-html="item.status"></td>
                                                    <td v-html="item.use_time"></td>
                                                </tr>
                                                <tr v-if="orderlist.length == 0">
                                                    <td colspan="6" style="text-align:center;color:#888">暂无数据</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <myel-page ref="page" :allpage="allpage" @togglePage="set_page"></myel-page>

                                    </div>
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

import myelPage from "../tools/page" 

export default {
    name: 'didiCode',
        data () {
            return {
                current:1,
                orderlist:[],
                allpage:1,
                query:{
                    code: '',
                    name: ''
                },
                // 查询条件
                orderCondition:{},
                codeTypelist: []
            }
        },
        mounted (){
            // 获取第一页数据
            this.getData(1);
            this.getCodeType();
        },
        methods: {
            // 获取页码并携带查询条件获取数据
            set_page: function (page) {
                this.getData(page, this.orderCondition);
            },
            // 获取券类型
            getCodeType: function () {
                myFn.ajax('get', {}, apiAddress.didi.volumelist, (res) => {
                    this.codeTypelist = res.data;
                })
            },
            getData: function(index, data){
                var self = this;
                var data = data || {};
                data.page = index;

                myFn.ajax('get', data, apiAddress.didi.uservolumelist, function(res){
                    self.orderlist = res.data.data;
                    self.allpage = res.data.last_page;
                });
            },
        },
        components: {
            myelPage
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .queryInput{
        width: 150px;
    }
</style>
