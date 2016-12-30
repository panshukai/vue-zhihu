<template>
<div id="exp">
	<swipe class="my-swipe">
	  <swipe-item class="slide1"></swipe-item>
	  <swipe-item class="slide2"></swipe-item>
	  <swipe-item class="slide3"></swipe-item>
	</swipe>
	<h4 class="textLeft">今日要闻</h4>
	<ul>
		<li v-for="item in newsList" :to='item.url'>
			<a class="listDiv" :href='item.url'>
				<div class="leftInfo">
					<p>{{item.title}}</p>
					<button>{{item.type}}</button>
					<button>{{item.realtype}}</button>						
				</div>
				<div class="img">
		  			<img :src="item.thumbnail_pic_s" alt="">
				</div>
			</a>
		</li>
	</ul>
</div>
</template>
<script>
	import { Swipe, SwipeItem } from 'vue-swipe';
	import 'vue-swipe/dist/vue-swipe.css';
	export default {
		data(){
			return{
				newsList:[],
				juheApiUrl:'/toutiao/index?type=top&key=a4c1c819ae6de99a99c4515a4b0745ca',
				zhihuApi:'/news/latest'
			}
		},
		created(){
			this.getList();
		},
		methods:{
			getList(){
				this.$http.get(this.juheApiUrl).then(function(response){
					this.newsList=response.body.result.data;
					console.log(response.body);
				},
				function(response){
					console.log(response);
				})
			}
		},
		components:{//组件注册
			Swipe,
			SwipeItem
		}
	}
</script>
<style scoped>
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
	h4{padding: 5px 0 0 15px;font-size: 0.18rem;line-height: 0.28rem;font-weight: bold;color: #888;}
	ul{width: 100%;}
	li{border: 1px solid #ccc;margin: 5px;box-shadow: 0px 2px 2px #ddd;border-radius: 4px;padding: 5px;}
	.listDiv{display: flex;flex-direction: row;}
	.leftInfo{flex: 4;text-align: left;color: #000;padding-right: 0.1rem;}
	.leftInfo p{padding-bottom: 0.05rem;}
	.leftInfo button{border: 1px solid #ccc;background-color: #fff;color: #999;padding: 2px;border-radius: 2px;}
	.img{flex: 1;text-align: left;}
	.img img{display: block;width: 100%;}
</style>