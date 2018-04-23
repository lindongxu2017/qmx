<template>
	<div class="buildType_add">
		<!--  PAPER WRAP -->
		<div class="wrap-fluid" id="roleManagement">
			<div class="container-fluid paper-wrap bevel tlbr">
				<!-- CONTENT -->
				<div class="row">
                    <div id="paper-top">
                        <div class="col-sm-12">
                            <h2 class="tittle-content-header">
                                <span class="icon-plus"></span>
                                <span class="public-page-name" v-show="id == undefined">添加商家类型</span>
                                <span class="public-page-name" v-show="id != undefined">编辑商家类型</span>
                            </h2>
                        </div>
                    </div>
                </div>

				<!-- table-content -->
                <div class="content-wrap" style="margin-top:10px;">
                    <div class="row">

                        <div class="col-sm-12">

                            <div class="nest" id="FootableClose">

                                <div class="body-nest">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">类型图片</label>
                                            <div class="col-sm-3">
                                                <img :src="imgUrl" style="margin-right: 20px;width: 50px;height: 50px;" />
                                                <input type="file" id="typeImg" style="display: inline-block;margin-top: 5px;" @change="changeImg">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-5 control-label"></label>
                                            <progress style="width: 200px;margin-left: 15px;" :value="Number(progressLength)" max="100" v-show="controlProgress"></progress>
                                        </div> 

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">商家类型</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" style="color:#333" v-model="shopTypeName">
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
                                                <button type="button" class="btn btn-primary" @click="submit">保存</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'buildType_add',
		data () {
			return {
                id:'',
                shopTypeName:'',
                progressLength:0,
                controlProgress: false,
                imgUrl:''
			}
		},
        mounted (){

            this.id = this.$route.query.id;
            if (this.id != undefined) {
                var self = this;
                myFn.ajax('get', {id:this.id}, apiAddress.shop.getTypeVal, function(res){
                    self.imgUrl = res.data.real_icon;
                    self.shopTypeName = res.data.name;
                });
            }

        },
        methods: {
            changeImg: function() {
                this.imgUrl = window.URL.createObjectURL(document.getElementById('typeImg').files[0]);
            },
            submit: function(){

                var form = new FormData();

                if (this.id) {
                    form.append('id', this.id);
                }

                form.append('icon', document.getElementById('typeImg').files[0]);
                form.append('name', this.shopTypeName);
                var self = this;

                myFn.uploadFile(form, apiAddress.shop.editOrAddType, function(res){
                    document.getElementById('typeImg').value = '';
                    self.imgUrl = false;
                    self.shopTypeName = '';
                    // alert('保存成功');
                    self.$router.push('/index/shop_buildType');
                },self);
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
