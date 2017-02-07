<template>
<div id="comment" v-show="isInfo">
	<header class="commentHeader" :style="{backgroundColor:backgroundColor}">
		<div class="header-icon goBack" @click="goBack"><i class="iconfont">&#xe678;</i></div>
		<div class="comment">{{comments}}条点评</div>		
		<div class="header-icon"><i class="iconfont">&#xe623;</i></div>
	</header>
	<div class="mainComment">
		<p class="longCommentP">{{longs}}条长评</p>
		<ul>
			<li v-for="item in longComments">
				<div class="singleLongComment">
					<div class="img">
						<img class="img-responsive" :src="replaceUrl(item.avatar)" alt="">
					</div>
					<h3>{{item.author}}</h3>
					<div class="header-icon likes"><i class="iconfont">&#xe649;</i>{{item.likes}}</div>
				</div>
				<div class="commentContent">
					<p>{{item.content}}</p>
					<p class="date">{{changeDate(new Date(item.time*1000))}}</p>
				</div>
			</li>
		</ul>
		<div class="shortComment">
			<p>{{shorts}}条短评</p>
			<i class="iconfont icon-xia" v-show="!shortShow" @click="getShortComment"></i>
			<i class="iconfont icon-shang" v-show="shortShow" @click="hideShortComment"></i>
		</div>
		<ul>
			<li v-for="item in shortComments" v-show="shortShow">
				<div class="singleLongComment">
					<div class="img">
						<img class="img-responsive" :src="replaceUrl(item.avatar)" alt="">
					</div>
					<h3>{{item.author}}</h3>
					<div class="header-icon likes"><i class="iconfont">&#xe649;</i>{{item.likes}}</div>
				</div>
				<div class="commentContent">
					<p>{{item.content}}</p>
					<p class="date">{{changeDate(new Date(item.time*1000))}}</p>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				// commentApi:'/jiekou/story-extra/',
				commentApi:'/phpinfo.php?a=story-extra/',
				comments:null,
				// longCommentApi:'jiekou/story/',
				longCommentApi:'/phpinfo.php?a=story/',
				longs:null,
				shorts:null,
				longComments:null,
				shortComments:null,
				items:[],
				shortShow:false
			}
		},
		computed: {
			...mapGetters(['isInfo','backgroundColor'])
		},
	    beforeRouteEnter (to, from, next) {
	      next(vm => {
	        vm.$store.commit('isInfoPage', true);
	      })
	    },
	    beforeRouteLeave(to, from, next){
	      this.$store.commit('isInfoPage', false);
	      next();
	    },
	    mounted(){
	    	this.getComments();
	    },
        watch:{
	    	'$route' (to,from) {
	    		if(to.name=='indexInfoCom'){
	    			this.getComments();
	    		}
	    		this.hideShortComment();
	    	}
	    },
		methods:{
	        replaceUrl(src){
		        if(src){//如果不判断，默认src为null
		          return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
		        }
		    },
			changeDate(time){
				var dateStr='';
				var month=time.getMonth()+1>9?time.getMonth()+1:'0'+(time.getMonth()+1);
				var day=time.getDate()>9?time.getDate():'0'+time.getDate();
				var hour=time.getHours()>9?time.getHours():'0'+time.getHours();
				var minute=time.getMinutes()>9?time.getMinutes():'0'+time.getMinutes();
				dateStr=month+'-'+day+' '+hour+':'+minute;
				return dateStr;
			},
			getComments(){
				let _this=this;
				this.$http.get(this.commentApi+this.$route.params.detailId).then(function(response){//获取评论的条数，包括长评短评等
					// console.log(response);
					_this.longs=JSON.parse(response.body).long_comments;
					_this.shorts=JSON.parse(response.body).short_comments;
					_this.comments=JSON.parse(response.body).comments;
				});
				this.$http.get(this.longCommentApi+this.$route.params.detailId+'/long-comments').then(function(response){//获取长评论内容
					// console.log(response);

					_this.longComments=JSON.parse(response.body).comments;
				})
			},
			goBack(){
				this.$router.go(-1);
			},
			getShortComment(){
				let _this=this;
				this.$http.get(this.longCommentApi+this.$route.params.detailId+'/short-comments').then(function(response){
					console.log(response);
					_this.shortComments=JSON.parse(response.body).comments;
					_this.shortShow=true;
				})
			},
			hideShortComment(){
				this.shortShow=false;
			}
		}
	}
</script>
<style scoped>
.commentHeader{position: fixed;top: 0;left: 0;z-index: 4;height: 0.5rem;width: 100%;display: flex;flex-direction: row;}
.comment{flex: 4;text-align: left;color: #fff;font-size: 0.2rem;line-height: 0.5rem;}
.header-icon{flex:1;text-align: center;cursor: pointer;color: #fff;}
.header-icon.goBack{flex: 1;text-align: left;padding-left: 0.1rem;}
.header-icon i{font-size: 0.2rem;line-height: 0.5rem;}
.mainComment{width: 100%;}
.mainComment li{border-bottom: 1px #ccc solid;padding-bottom: 0.1rem;}
.longCommentP{border-bottom: 1px #ccc solid;line-height: 0.54rem;padding-left: 0.1rem;}
.singleLongComment{display: flex;align-items: center;padding: 0 0.1rem;}
.singleLongComment .img{flex: 1;}
.singleLongComment h3{flex: 8;line-height: 0.5rem;font-size: 20px;padding-left: 0.05rem;font-weight: bold;font-size: 18px;}
.likes{flex: 1;color: #999;}
.likes .iconfont{color: #999;}
.img-responsive{width: 100%;border-radius: 50%;}
.commentContent{margin-left: 10%;margin-right: 6%;overflow-x: hidden;font-size: 14px;line-height: 20px;}
.date{padding-top: 0.08rem;color: #aaa;font-size: 12px;}
.shortComment{display: flex;border-bottom: 1px #ccc solid;line-height: 0.54rem;padding-left: 0.1rem;}
.shortComment P{flex: 5;}
.shortComment i{flex: 1;color: #ccc;text-align: center;}
</style>