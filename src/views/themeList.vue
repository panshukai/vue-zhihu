<template>
<div id="newsList">
  <div class="wrap">
    <img width="100%" :src="replaceUrl(background)" alt="">
    <p>{{description}}</p>
  </div>
  <div class="editor clearfix">
    <h5>主编</h5>
    <ul>
      <li v-for="item in editors">
        <img :src="replaceUrl(item.avatar)" :title="item.bio" :alt="item.name">
      </li>
    </ul>
  </div>
  <ul class="contentList">
    <router-link v-for="item in contentList" :to="{name:'detail',params:{detailId:item.id}}" tag='li'>
      <a class="listDiv">
        <div class="leftInfo">
          <p>{{item.title}}</p>        
        </div>
        <div class="img" v-if="item.images">
            <img :src="replaceUrl(item.images[0])" alt="">
            <span class="cover" v-show="item.multipic"></span>
            <p v-show="item.multipic">多图</p>
        </div>
      </a>
    </router-link>
  </ul>
</div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
      body:null,
      background:null,
      description:null,
      editors:null,
      contentList:[],
      // themeApi:'/jiekou/theme/',
      themeApi:'/phpinfo.php?a=theme/',
    }
  },
  watch:{
    '$route' (to,from) {
      console.log(to);
      if(to.name=='theme'){
        this.getList(); 
      }
    }
  },
  mounted(){
    Indicator.open();
    this.getList();
  },
  methods:{
      replaceUrl(src){
        if(src){//如果不判断，默认src为null
          return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      getList(){
        this.$http.get(this.themeApi+this.$route.params.id).then(function(response){
          this.body=JSON.parse(response.body);
          this.background=JSON.parse(response.body).background;
          this.description=JSON.parse(response.body).description;
          this.editors=JSON.parse(response.body).editors;
          this.contentList=JSON.parse(response.body).stories;
          Indicator.close();
        },
        function(response){
          console.log(response);
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{position: relative;width: 100%;height: 200px;overflow-y: hidden;}
.wrap p{position: absolute;bottom: 0;left: 0;padding: 0 0.625rem;  color: #fff;font-size: 18px;font-weight: bold;text-align: center;}
.editor{padding-top: 0.3125rem;}
.editor h5{font-size: 18px;float: left;padding:0 0.3125rem;line-height: 1rem;}
.editor ul{display: flex; flex-wrap: nowrap;}
.editor ul li{width: 1rem;height: 1rem;float: left;;padding: 0 0.15625rem;}
.editor ul li img{width: 100%;border-radius: 50%;display: block; }
.contentList{width: 100%;}
.contentList li{border: 1px solid #ccc;margin: 0.15625rem;box-shadow: 0px 0.0625rem 0.0625rem #ddd;border-radius: 4px;padding: 0.15625rem;}
.listDiv{display: flex;flex-direction: row;}
.leftInfo{flex: 4;text-align: left;color: #000;padding-right: 0.3125rem;}
.leftInfo p{padding-bottom: 0.15625rem;padding-top: 0.3125rem;font-size: 14px;}
.leftInfo button{border: 1px solid #ccc;background-color: #fff;color: #999;padding: 0.0625rem;border-radius: 2px;}
.img{flex: 1;text-align: left;position: relative;}
.img img{display: block;width: 100%;}
.img .cover{position: absolute;left: 0;bottom: 0;width: 100%;background-color: #000;opacity: .4;height: 0.5rem;}
.img p{position: absolute;right: 0.125rem;bottom: 0.0625rem;color: #fff;font-size: 12px;text-align: right;width: auto;}
</style>
