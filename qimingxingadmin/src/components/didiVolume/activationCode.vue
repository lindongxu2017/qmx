<template>
    <div class="activationCode">
        <!--  PAPER WRAP -->
        <div class="wrap-fluid" id="roleManagement">
            <div class="container-fluid paper-wrap bevel tlbr">
                <!-- CONTENT -->
                <div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="fontawesome-barcode"></span>
                                <span class="public-page-name">激活码</span>
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
                                            <div class="col-md-8 ">
                                                <label class="queryLable">激活码：</label>
                                                <input class="form-control queryInput" type="text" v-model="query.code">
                                                <button style="height: 35px;width: 90px;margin-left: 30px;vertical-align: bottom;" type="button" class="btn btn-primary" @click="query_company"><span class="entypo-search"></span>&nbsp;&nbsp;查询</button>
                                            </div>
                                            <div class="col-md-4 " style="text-align:right">
                                                <router-link to="activationCodeAdd"><button type="button" class="btn btn-info"><span class="entypo-plus"></span>&nbsp;&nbsp;添加激活码</button></router-link>
                                            </div>
                                        </div>
                                        <table class="table-striped footable-res footable metro-blue" data-page-size="6">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">
                                                        序号
                                                    </th>
                                                    <th style="width: 200px;">
                                                        过期时间
                                                    </th>
                                                    <th style="width: 300px;">
                                                        激活码
                                                    </th>
                                                    <th>
                                                        图片
                                                    </th>
                                                    <th>
                                                        状态
                                                    </th>
                                                    <th>
                                                        操作
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in codelist">
                                                    <td v-html="index+((current-1)*10)+1" style="text-align: center;"></td>
                                                    <td v-html="item.expire_time"></td>
                                                    <td v-html="item.code"></td>
                                                    <td><img :src="item.image" width="70"></td>
                                                    <td v-html="status[item.status]"></td>
                                                    <td  style="width: 200px;text-align: center;">
                                                        <button type="button" class="btn btn-primary" @click="edit(item.id)"><span class="fontawesome-edit"></span>&nbsp;&nbsp;编辑</button>
                                                        <button type="button" class="btn btn-danger" @click="del(item.id, index)"><span class="entypo-cancel-squared"></span>&nbsp;&nbsp;删除</button>
                                                    </td>
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
    name: 'activationCode',
        data () {
            return {
                current:1,
                codelist:[],
                allpage:1,
                query:{
                    code:''
                },
                // 查询条件
                orderCondition:{},
                status: {
                    1: '未使用',
                    2: '已使用',
                    3: '已过期'
                }
            }
        },
        mounted (){
            // 获取第一页数据
            this.getData(1);
        },
        methods: {
            /**
             * [query_order 添加查询条件,查询后重置页码,获取数据]
             */
            query_company: function () {
                this.orderCondition = this.set_orderCondition();
                this.$refs.page.resetCurrent();
                this.getData('', this.orderCondition);
            },

            /**
             * [set_orderCondition 添加查询条件]
             * @return {obj} [返回查询条件]
             */
            set_orderCondition: function () {
                var data = {
                    code : this.query.code,
                };
                return myFn.isEmpty(data);
            },

            // 获取页码并携带查询条件获取数据
            set_page: function (page) {
                this.getData(page, this.orderCondition);
            },

            getData: function(index, data){
                var self = this;
                var data = data || {};
                data.page = index;

                myFn.ajax('get', data, apiAddress.didi.codelist, function(res){
                    self.codelist = res.data.data;
                    self.allpage = res.data.last_page;
                });
            },
            edit: function (id) {
                this.$router.push({name: 'activationCodeAdd', params: {id: id}})
            },
            del: function (id, index) {
                myFn.ajax('post', {id: id}, apiAddress.didi.codedel, (res) => {
                    this.codelist.splice(index, 1)
                })
            }
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
