
<!-- 
	allpage属性设置分页长度
	togglePage自定义事件调取父组件方法
	ref属性设置子组件名称方便调取子组件方法
	
	例：<myel-page ref="page" allpage="10" @togglePage="set_page"></myel-page>
		this.$refs.page.resetCurrent();
 -->

<template>
    <!-- PAGE -->
	<ul class="pagination" v-show="allpage>1">
        <li v-show="current != 1" @click="current-- && goto(current--)" ><a>上一页</a></li>
        <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
          	<a>{{index}}</a>
        </li>
        <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a>下一页</a></li>
    </ul>
	<!-- END PAGE -->
</template>

<script>
export default {
	name: 'pagination',
		data () {
			return {
				current:1,
            	showItem:10
			}
		},
		computed:{
          	pages:function(){
                var pag = [];
                //如果当前的激活的项 小于要显示的条数
                if( this.current < this.showItem ){ 
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem,this.allpage);
                    while(i){
                       pag.unshift(i--);
                    }
                }else{ //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                       i = this.showItem;
                    if( middle >  (this.allpage - this.showItem)  ){
                       middle = (this.allpage - this.showItem) + 1
                    } 
                    while(i--){
                       pag.push( middle++ );
                    }
            	}
                return pag;
            }
     	},
        methods: {
        	goto: function (index) {
        		if(index == this.current) return;
	            this.current = index;
	            // 点击时向父组件发送当前点击的值
	            this.$emit('togglePage', this.current);
        	},
        	resetCurrent: function () {
        		this.current = 1;
        	}
        },
        props:['allpage']
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	 /* 分页 */
    .pagination {
        position: relative;
        width: 100%;
        text-align: center;
        margin: 0px 0px;
    }
    .pagination li{
        display: inline-block;
        margin:0 5px;
    }
    .pagination li a{
        padding:.5rem 1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;
        color:#0E90D2;
    }
    .pagination li a:hover{
        background:#eee;
    }
    .pagination li.active a{
        background:#0E90D2;
        color:#fff;
    }
</style>
