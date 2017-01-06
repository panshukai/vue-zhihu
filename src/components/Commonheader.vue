<template>
  <header class="header" v-if="!isInfo">
    <div class="header-icon"><i class="iconfont" @click="hidebar()">&#xe628;</i></div>
    <div class="header-cont"><h2>{{title}}</h2></div>
    <div class="header-icon" v-show='isIndex'><i class="iconfont">&#xe622;</i></div>
    <div class="header-icon" v-show='isIndex'><i class="iconfont">&#xe7b3;</i></div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      title:'首页',
      opacity:1,
      isIndex:false
    }
  },
  computed: {
    ...mapGetters(['isHideBar','isInfo'])
  },
  mounted(){
    this.changeTitle(this.$route.params.id);
  },
  watch:{
    '$route' (to,from) {
        this.changeTitle(to.params.id);
    }
  },
  methods:{
    hidebar(){
      this.$store.commit('hideBar',!this.isHideBar);
    },
    changeTitle(options){
      if(options==13){
        this.title='日常心理学';
        this.isIndex=false;
      }else if(options==12){
        this.title='用户推荐日报';
        this.isIndex=false;
      }else if(options==3){
        this.title='电影日报';
        this.isIndex=false;
      }else if(options==11){
        this.title='不许无聊';
        this.isIndex=false;
      }else if(options==4){
        this.title='设计日报';
        this.isIndex=false;
      }else if(options==5){
        this.title='大公司日报';
        this.isIndex=false;
      }else if(options==6){
        this.title='财经日报';
        this.isIndex=false;
      }else if(options==10){
        this.title='互联网安全';
        this.isIndex=false;
      }else if(options==2){
        this.title='开始游戏';
        this.isIndex=false;
      }else if(options==7){
        this.title='音乐日报';
        this.isIndex=false;
      }else if(options==9){
        this.title='动漫日报';
        this.isIndex=false;
      }else if(options==8){
        this.title='体育日报';
        this.isIndex=false;
      }else{
        this.title='首页';
        this.isIndex=true;
      }
      // switch (options) {
      //   case '13':
      //     this.title='日常心理学';
      //     break;
      //   case '12':
      //     this.title='用户推荐日报';
      //     break;
      //   case '3':
      //     this.title='电影日报';
      //     break;
      //   case '11':
      //     this.title='不许无聊';
      //     break;
      //   case '4':
      //     this.title= '设计日报';
      //     break;
      //   case '5':
      //     this.title= '大公司日报';
      //     break;
      //   case '6':
      //     this.title= '财经日报';
      //     break;
      //   case '10':
      //     this.title= '互联网安全';
      //     break;
      //   case '2':
      //     this.title= '开始游戏';
      //     break;
      //   case '7':
      //     this.title= '音乐日报';
      //     break;
      //   case '9':
      //     this.title= '动漫日报';
      //     break;
      //   case '8':
      //     this.title= '体育日报';
      //     break;
      //   default:
      //     this.title= '首页';
      // }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    height: 0.5rem;
    width: 100%;
    background: #00A2EA;
    display: flex;
    flex-direction: row;
  }
  .header-icon{
    flex:1;
    text-align: center;
    cursor: pointer;
  }
  .header-icon i{
    font-size: 0.2rem;
      line-height: 0.5rem;
    }
  .header-cont {
    flex: 6;
    padding-left: 10px;
  }
  .header-cont h2{
    text-align: left;
    line-height: 0.5rem;
    color: #ffffff;
    font-size:22px;
  }

</style>
