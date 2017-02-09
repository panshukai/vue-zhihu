// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible'
// import filters from './imgFDL/antiSteal.js'
// Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))
// Vue.filter("replaceUrl",function(srcUrl){
//   // return d.substring(0,10);
//   return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
// });

Vue.use(MintUI);
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  router,
  components: { App }
})
