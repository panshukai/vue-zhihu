<template>
  <header class="header">
    <div class="header-cont"><h2>{{title}}</h2></div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'detail-head',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title:'11111',
    }
  },
  computed: {
    ...mapGetters(['isHideBar'])
  },
  methods:{
    hidebar(){
      this.$store.commit('isHideBar',!this.isHideBar);
    }
  },
}
</script>