<template>
  <div id="app">
    <z-head></z-head>
    <sidebar></sidebar>

<!--     <img src="./assets/logo.png"> -->
<!--     <hello></hello> -->
    <div class="main">
        <transition :name="transitionName">
            <router-view class="view"></router-view>
        </transition>
    </div>

  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import ZHead from './components/head.vue'
import Sidebar from './components/sidebar.vue'



export default {
  name: 'app',
  components: {
    Hello,
    ZHead,
    Sidebar
  },
  data(){
    return {
        transitionName:'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
        var routes=this.$router.options.routes;
        var toPathIndex=null;
        var fromPathIndex=null;
        for(var i=0;i<routes.length;i++){
            if(routes[i].path==to.path){
                toPathIndex=i;
            }
            if(routes[i].path==from.path){
                fromPathIndex=i;
            }            
        }
        this.transitionName = toPathIndex < fromPathIndex ? 'slide-right' : 'slide-left';
    }
  },
}
</script>

<style>
@import 'http://at.alicdn.com/t/font_r5maj9qd5c73c8fr.css';
.iconfont{color: #fff;}
/*样式重置*/
body,ul,ol,h1,h2,h3,h4,h5,h6,form,input,p,header,section,footer{padding: 0;margin: 0;font-weight: normal;}
html{font-size: 625%;height: 100%;}
body {font-family: "\5FAE\8F6F\96C5\9ED1";font-size: 0.16rem;background-size: 100% 100%;position: relative;}
a {
    text-decoration: none;
    -webkit-focus-ring-color: rgba(0,0,0,0);
    -moz-focus-ring-color: rgba(0,0,0,0);
    focus-ring-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -moz-tap-highlight-color: rgba(0,0,0,0);
    tap-highlight-color: rgba(0,0,0,0);
}
* {-webkit-tap-highlight-color: transparent;}
li {list-style: none;}
img {vertical-align: middle;}
.fl {float: left;}
.fr {float: right;}
.clear:after {display: block;clear: both;content: ".";visibility: hidden;height: 0;}
.clearfix {*zoom: 1;}
.textLeft{text-align: left;}
.textCenter{text-align: center;}
.hide{display: none;}
p{margin: 0!important;}
/*main*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main{padding: 50px 0 0;}
.main .view{transition: all 0.5s ease;}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50%, 0);
  transform: translate(50%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
</style>
