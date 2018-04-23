<template>
    <div class="feddback">
        <div class="list-block" style="background:#fff;">
            <ul class="input_box" style="border:none;">
                <!-- Text inputs -->
                <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">按分类：</div>
                            <div class="item-input">
                                <input type="text" id="picker" placeholder="请选择分类" v-model="pick" @change="select()">
                            </div>
                            <label for="city-picker2" class="icon icon-down"></label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-block" style="background:#fff;">
            <ul class="input_box" style="border:none;">
                <li style="margin-top:10px;">
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-comment"></i></div>
                        <div class="item-inner">
                            <textarea placeholder="请输入反馈内容" style="font-size:16px;" v-model="textarea"></textarea>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="row" style="width:90%;margin:auto">
            <div class="col-100" style="margin-top:3.5rem">
                <p class="button button-big" style="background:#f08200;color:#fff;" @click="submit">提交</p>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'feddback',
        data () {
            return {
                pick:'',
                textarea:'',
                type:'',
                orderId:''
            }
        },
        mounted(){

            this.orderId = this.$route.query.orderId;

            $("#picker").picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">确定</button>\
              <h1 class="title">请选择</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: ['联系人调整', '联系电话调整', '配送时间调整', '配送地址调整', '退单通知']
                }
              ]
            });

           /* alert(1)*/
        },
        methods:{
            select: function(){
                var self = this;
                self.pick = $("#picker").val();
                console.log(self.pick)
            },
            submit:function(){
                var self = this;

                switch(self.pick){
                    case '联系人调整':
                        self.type = 1;
                        break;
                    case '联系电话调整':
                        self.type = 2;
                        break;
                    case '配送时间调整':
                        self.type = 3;
                        break;
                    case '配送地址调整':
                        self.type = 4;
                        break;
                    case '退单通知':
                        self.type = 5;
                        break;                
                }
                var data = {
                    orderId:self.orderId,
                    type:self.type,
                    message: self.textarea
                }

                myFn.ajax('post', data, apiAddress.queryOrder.feddBack, function(res){
                    alert(res.msg);
                    self.$router.push({name:'search'});
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list-block{
        margin: 0;
        margin-top: 10px;
    }
    .list-block .item-media + .item-inner{
        margin-left: 0;
    }
    .list-block .item-title.label{
        font-size: 16px;
        width: 20%;
    }
    #picker{
        font-size: 16px;
    }
    .button{
        border:none;
    }
    .row .col-100{
        width: 100%;
        margin-left: 0;
    }
</style>
