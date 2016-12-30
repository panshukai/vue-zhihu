<template>
  <div class="sidebar" :class="{'hide':isHideBar}" @click="hidebar()">
    <div class="cover"></div>
    <transition name="fade">
      <div class="sidebarMain">
        <div class="textCenter portrait">
          <img src="../assets/portrait.jpg" height="60%" width="60%" alt="头像">
        </div>
        <h1 class="textCenter">{{name}}</h1>
        <h4 class="textCenter">{{slogan}}</h4>
        <ul>
          <router-link class="textCenter" :to="{ path: '/index'}" tag="li">
            <a>热点</a>
          </router-link>  
          <router-link class="textCenter" :to="{ path: '/exp'}" tag="li">
            <a>过往</a>
          </router-link>      
          <router-link class="textCenter" :to="{ path: '/share'}" tag="li">
            <a>日报</a>
          </router-link>
          <router-link class="textCenter" :to="{ path: '/topic'}" tag="li">
            <a>话题</a>
          </router-link>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar',
  data () {
    return {
      name: 'PSK',
      slogan:'1111',
      kinds:[{
        name:'全部',
        link:'index'
      },{
        name:'精华',
        link:'exp'
      },{
        name:'分享',
        link:'share'
      },{
        name:'话题',
        link:'topic'
      }],
      currentPath:''
    }
  },
  computed: {
    ...mapGetters(['isHideBar'])
  },
  methods:{
    hidebar(){
      this.$store.commit('hideBar',!this.isHideBar);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar{width: 100%;position: fixed;left: 0;top: 0;height: 100%;z-index: 5;}
.cover{position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: #999;opacity: 0.8;}
.sidebarMain{width: 20%;position: absolute;left:0;top:0;background-color: #00A2EA;height: 100%;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.portrait{padding-top: 8px;}
img{border-radius: 50%;}
h1{color: #fff;line-height: 0.5rem;font-size: 20px;}
h4{padding-top: 10px;color: #fff;}
ul{padding: 10px 0;}
li{line-height: 26px;}
a{color: #fff;}
li.router-link-active{background-color: #fff;}
li.router-link-active a {color: #00A2EA;}

</style>
