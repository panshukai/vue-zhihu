<template>
<div id="indexDetail" v-show="isInfo">
	<link rel="stylesheet" :href="cssLink" />
	<header class="hotHeader" :style="{opacity:opacity,backgroundColor:backgroundColor}">
		<div class="header-icon goBack"><i class="iconfont" @click='returnTheme'>&#xe678;</i></div>
		<div class="header-icon"><i class="iconfont">&#xe654;</i></div>		
		<div class="header-icon"><i class="iconfont">&#xe610;</i></div>
		<div class="header-icon" @click="goComment()"><i class="iconfont">&#xe66d;</i>&nbsp;{{comments}}</div>
		<div class="header-icon"><i class="iconfont">&#xe649;</i>&nbsp;{{popularity}}</div>
	</header>
  <div class="recommenders clearfix" v-show="recommenders">
    <h5>推荐者</h5>
    <ul>
      <li v-for="item in recommenders">
        <img :src="replaceUrl(item.avatar)">
      </li>
    </ul>
  </div>
	<div class="detail" v-html='detailHtml'></div>
</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { Indicator } from 'mint-ui';
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
				comments:null,
				recommenders:null
			}
		},
		computed: {
			...mapGetters(['isInfo','backgroundColor'])
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
	    mounted(){
	    	Indicator.open();
	    	this.getContext();
	    	this.getExtra();
	    	window.onscroll=()=>{
	    		if(window.pageYOffset<=200){
	    			this.opacity=1-window.pageYOffset/200;	    			
	    		}else{
		    		this.opacity=0;
	    		}
	    	}
	    },
		methods:{
			replaceUrl(src){
		        if(src){//如果不判断，默认src为null
		          return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
		        }
		    },
			getContext(){
				this.$http.get(this.zhihuApi+this.$route.params.detailId).then(function(response){
					this.detailHtml=response.body.body;
					this.cssLink=response.body.css;
					this.recommenders=response.body.recommenders;
					Indicator.close();
				})
			},
			getExtra(){
				this.$http.get(this.commentApi+this.$route.params.detailId).then(function(response){
					this.popularity=response.body.popularity;
					this.comments=response.body.comments;
				})
			},
			goComment(){
				this.$router.push({name:'indexInfoCom',params:{detailId:this.$route.params.detailId}});
			},
			returnTheme(){
				this.$router.push({name:'theme',params:{id:this.$route.params.id}});
			}
		}
	}
</script>
<style>
.hotHeader{position: fixed;top: 0;left: 0;z-index: 4;height: 0.5rem;width: 100%;background: #00A2EA;display: flex;flex-direction: row;margin-right: 10px;}
.header-icon{flex:2;text-align: center;cursor: pointer;color: #fff;margin:0 2px;}
.header-icon.goBack{flex: 4;text-align: left;padding-left: 0.1rem;}
.header-icon i{font-size: 0.2rem;line-height: 0.5rem;}
.header-cont {flex: 6;padding-left: 10px;}
.header-cont h2{text-align: center;line-height: 0.5rem;color: #ffffff;font-size:0.25rem;}
/*.headline .img-place-holder{overflow: hidden;width: 100%;position: relative;}
.headline .img-place-holder h3{position: absolute;bottom: 20px;left:0;text-align: left;font-size: 0.2rem;color: #fff;padding: 0 0.1rem;}
.headline .img-place-holder span{position: absolute;bottom: 0;right: 0;padding: 0 0.1rem;color: #eee;font-size: 12px;line-height: 18px;}*/
.recommenders{padding: 0.1rem 0;background: #eee;}
.recommenders h5{font-size: 18px;float: left;padding:0 0.1rem;line-height: 0.3rem;}
.recommenders ul{display: flex; flex-wrap: nowrap;}
.recommenders ul li{width: 0.3rem;height: 0.3rem;float: left;;padding: 0 0.05rem;}
.recommenders ul li img{width: 100%;border-radius: 50%;display: block; }
.detail{}
</style>