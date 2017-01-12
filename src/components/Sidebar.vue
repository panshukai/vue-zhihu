<template>
  <div class="sidebar" :class="{'showSideBar':!isHideBar}" @click="hidebar()" :style="{backgroundColor:backgroundColor}">
    <div class="portrait">
      <img src="../assets/portrait.jpg" height="100%" alt="头像">我的学名叫帕斯卡
    </div>
    <router-link :to="{ name:'index'}" tag="h4" :style="{color:backgroundColor}"><i class="iconfont icon-7" :style="{color:backgroundColor}"></i>首页</router-link>
    <ul :style="{height:navHeight(items.length*46)+'px'}">
      <router-link class="themeLi" v-for="item in items" :to="{ name:'theme',params:{id:item.id}}" tag="li">
        <a>{{item.name}}</a>
        <span class="textCenter">+</span>
      </router-link>  
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar',
  data () {
    return {
      name: 'PSK',
      themeApi:'/jiekou/themes',
      items:[],
    }
  },
  computed: {
    ...mapGetters(['isHideBar','backgroundColor']),
  },
  methods:{
    navHeight:function(val){
      var ulHeight=window.screen.height-90>val?val:window.screen.height-90;
      return ulHeight;
    },
    hidebar(){
      this.$store.commit('hideBar',!this.isHideBar);
    },
    getThemes(){
      let _this=this;
      this.$http.get(this.themeApi).then(function(response){
        _this.items=response.body.others;
      })
    }
  },
  mounted(){
    this.getThemes();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar{width: 250px;height:100%;position: fixed;left: -250px;top: 0;z-index: 5;transition: all 0.3s ease;overflow: hidden;}
.sidebar.showSideBar{left:0px;}
.portrait{padding: 10px;vertical-align: center;color: #fff;font-size: 18px;height: 0.3rem;}
img{border-radius: 50%;}
h1{color: #fff;line-height: 0.5rem;font-size: 20px;}
.iconfont{color: #00A2EA;font-size: 16px;}
h4{padding: 10px;background-color: #fff;font-size: 16px;line-height: 20px;font-weight: bold;}
h4.router-link-active{background-color: #ddd;}
.sidebar ul{padding-left: 0;overflow-y: scroll;}
li{line-height: 26px;}

.themeLi{padding: 10px;color: #000;display: flex;background-color: #fff;}
.themeLi a{flex: 6;color: #000;}
.themeLi span{flex: 1;color: #999;font-size: 18px;}
li.router-link-active{background-color: #ddd;}

</style>
