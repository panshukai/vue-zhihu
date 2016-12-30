<template>
<div id="expDetail" v-show="isInfo">
	<link rel="stylesheet" :href="cssLink" />
	<header class="hotHeader" :style="{opacity:opacity}">
		<div class="header-icon goBack"><router-link class="iconfont" tag='i' :to="'/index'">&#xe678;</router-link></div>
		<div class="header-icon"><i class="iconfont">&#xe654;</i></div>		
		<div class="header-icon"><i class="iconfont">&#xe610;</i></div>
		<div class="header-icon"><i class="iconfont">&#xe66d;</i>&nbsp;{{comments}}</div>
		<div class="header-icon"><i class="iconfont">&#xe649;</i>&nbsp;{{popularity}}</div>
	</header>
	<div class="detail" v-html='detailHtml'></div>
</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				zhihuApi:'/jiekou/news/',
				commentApi:'/jiekou/story-extra/',
				expDetailPage:'',
				detailHtml:null,
				cssLink:null,
				opacity:1,
				popularity:null,
				comments:null
			}
		},
		computed: {
			...mapGetters(['isInfo'])
		},
	    beforeRouteEnter (to, from, next) {
	      next(vm => {
	        vm.$store.commit('isInfoPage', true);
    		if(window.pageYOffset<=200){
    			vm.opacity=1-window.pageYOffset/200;	    			
    		}else{
	    		vm.opacity=0;
    		}
	      })
	    },
	    beforeRouteLeave(to, from, next){
	      this.$store.commit('isInfoPage', false);
	      next();
	    },
	    created(){
	    	this.getContext();
	    	this.getExtra();
	    },
	    mounted(){
	    	window.onscroll=()=>{
	    		if(window.pageYOffset<=200){
	    			this.opacity=1-window.pageYOffset/200;	    			
	    		}else{
		    		this.opacity=0;
	    		}
	    	}
	    },
		methods:{
			getContext(){
				this.$http.get(this.zhihuApi+this.$route.params.id).then(function(response){
					var headImg=response.body.image;
					var headImgSource=response.body.image_source;					
					var html=response.body.body;
					var aa=html.split('"img-place-holder">');
					var str='<img src="'+headImg+'">'+'<div class="cover"></div>'+'<h3>'+response.body.title+'</h3>'+'<span>'+response.body.image_source+'</span>';
					var aa2=str+aa[1];
					var newStr=aa[0]+'"img-place-holder">'+aa2;
					// console.log(newStr);
					this.detailHtml=newStr;
					this.cssLink=response.body.css;
					// console.log(response);
				})
			},
			getExtra(){
				/*this.$http.get(this.commentApi+this.$route.params.id).then(function(response){*/
				this.$http.get(this.commentApi+this.$route.params.id).then(function(response){
					console.log(response);
					this.popularity=response.body.popularity;
					this.comments=response.body.comments;
				})
			}
		}
	}
</script>
<style>
.hotHeader{position: fixed;top: 0;left: 0;z-index: 4;height: 0.5rem;width: 100%;background: #00A2EA;display: flex;flex-direction: row;}
.header-icon{flex:2;text-align: center;cursor: pointer;color: #fff;}
.header-icon.goBack{flex: 4;text-align: left;padding-left: 0.1rem;}
.header-icon i{font-size: 0.2rem;line-height: 0.5rem;}
.header-cont {flex: 6;padding-left: 10px;}
.header-cont h2{text-align: center;line-height: 0.5rem;color: #ffffff;font-size:0.25rem;}
.headline .img-place-holder{overflow: hidden;width: 100%;position: relative;}
.cover{width: 100%;position: absolute;left:0;bottom:0;width: 100%;height: 50%;
    background: -webkit-linear-gradient(bottom, rgba(0,0,0,0.2), rgba(255,255,255,0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to top, rgba(0,0,0,0.2), rgba(255,255,255,0)); /* 标准的语法（必须放在最后） */
    }
.headline .img-place-holder h3{position: absolute;bottom: 20px;left:0;text-align: left;font-size: 0.2rem;color: #fff;padding: 0 0.1rem;}
.headline .img-place-holder span{position: absolute;bottom: 0;right: 0;padding: 0 0.1rem;color: #eee;font-size: 12px;line-height: 18px;}
.detail{}
</style>