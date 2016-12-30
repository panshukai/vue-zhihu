<template>
<div id="index">
  <swipe class="my-swipe">
    <swipe-item v-for='item in topList' class='topStories' :speed="200" :auto="5000" :show-indicators="true" :prevent="true">
      <div class="wrap" @click="getInfo(item.id)">
        <img width="100%" :src="item.image" alt="">
        <p>{{item.title}}</p>
      </div>
    </swipe-item>
  </swipe>
  <h4 class="textLeft">{{msg}}</h4>
  <ul>
    <router-link v-for="item in movieList" :to="{name:'indexInfo',params:{id:item.id}}" tag='li'>
      <a class="listDiv">
        <div class="leftInfo">
          <p>{{item.title}}</p>        
        </div>
        <div class="img">
            <img :src="item.images[0]" alt="">
            <span class="cover" v-show="item.multipic"></span>
            <p v-show="item.multipic">多图</p>
        </div>
      </a>
    </router-link>
  </ul>
</div>/:id
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import 'vue-swipe/dist/vue-swipe.css';
export default {
  data () {
    return {
      movieList:[],
      topList:[],
      msg: '今日热闻',
      zhihuApi:'/jiekou/news/latest'
    }
  },
  created(){
    this.getList();
  },
  methods:{
      getInfo(id){
        this.$router.push({name:'indexInfo',params:{id:id}});
      },
      getList(){
        this.$http.get(this.zhihuApi).then(function(response){
          this.topList=response.body.top_stories;
          this.movieList=response.body.stories;
          console.log(response.body.stories);
          // console.log(this.$route.params);
        },
        function(response){
          console.log(response);
        })
      }
  },
  components:{
    Swipe,
    SwipeItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 0.2rem;
  font-weight: bold;
  text-align: center;
}
.mint-swipe-indicator{background-color: #666;}
.mint-swipe-indicator.is-active{background-color: #fff;}
.wrap{position: relative;width: 100%;height: 100%;}
.wrap p{position: absolute;top: 70%;left: 0;padding: 0 0.2rem;}
  h4{padding: 5px 0 0 15px;font-size: 0.18rem;line-height: 0.28rem;font-weight: bold;color: #888;}
  ul{width: 100%;}
  li{border: 1px solid #ccc;margin: 5px;box-shadow: 0px 2px 2px #ddd;border-radius: 4px;padding: 5px;}
  .listDiv{display: flex;flex-direction: row;}
  .leftInfo{flex: 4;text-align: left;color: #000;padding-right: 0.1rem;}
  .leftInfo p{padding-bottom: 0.05rem;padding-top: 0.1rem;}
  .leftInfo button{border: 1px solid #ccc;background-color: #fff;color: #999;padding: 2px;border-radius: 2px;}
  .img{flex: 1;text-align: left;position: relative;}
  .img img{display: block;width: 100%;}
  .img .cover{position: absolute;left: 0;bottom: 0;width: 100%;background-color: #000;opacity: .4;height: 16px;}
  .img p{position: absolute;right: 4px;bottom: 1px;color: #fff;font-size: 12px;text-align: right;width: auto;line-height: 14px;}
</style>
