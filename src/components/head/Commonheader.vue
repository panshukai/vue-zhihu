<template>
  <header class="header" :style="{opacity:opacity}">
    <div class="header-icon"><i class="iconfont" @click="hidebar()">&#xe628;</i></div>
    <div class="header-cont"><h2>{{title}}</h2></div>
    <div class="header-icon"><i class="iconfont">&#xe622;</i></div>
    <div class="header-icon"><i class="iconfont">&#xe7b3;</i></div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'common-header',
  props:['isInfo'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title:'首页',
      opacity:1,
    }
  },
  computed: {
    ...mapGetters(['isHideBar'])
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
    hidebar(){
      this.$store.commit('hideBar',!this.isHideBar);
    }
  },
  watch:{
    '$route' (to,from) {
      var toPathTit=to.path;
      switch(toPathTit){
        case '/index':
          this.title='首页';
          break;
        case '/exp':
          this.title='精华';
          break;
        case '/share':
          this.title='分享';
          break;
        case '/topic':
          this.title='主题';
          break;
      }
    }
  }
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
    text-align: center;
    line-height: 0.5rem;
    color: #ffffff;
    font-size:0.25rem;
  }

</style>
