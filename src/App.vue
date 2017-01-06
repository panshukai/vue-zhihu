<template>
  <div id="app">
    <common-header></common-header>
    <cover></cover>
    <sidebar></sidebar>

<!--     <img src="./assets/logo.png"> -->
<!--     <hello></hello> -->
    <div class="main">
        <router-view class="view"></router-view>
    </div>

  </div>
</template>

<script>
import CommonHeader from './components/Commonheader.vue'
import Sidebar from './components/sidebar.vue'
import cover from './components/cover.vue'
export default {
    name: 'app',
    components: {
        CommonHeader,
        cover,
        Sidebar
    }
}
</script>

<style>
@import 'http://at.alicdn.com/t/font_tc1lw3vul8035wmi.css';
.iconfont{color: #fff;}
/*样式重置*/
body,ul,ol,h1,h2,h3,h4,h5,h6,form,input,p,header,section,footer{padding: 0;margin: 0;font-weight: normal;}
html{font-size: 625%;}
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
