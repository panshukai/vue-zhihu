<template>
    <div class="cover" v-if="!isHideBar" @click='hidebar'></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isHideBar'])
  },
  methods:{
    hidebar(){
      this.$store.commit('hideBar',!this.isHideBar);
    },
  }
}
</script>
<style scoped>
	.cover{position: fixed;left: 0;top: 0;bottom:0;right:0;width: 100%;height: 100%;background-color: #999;opacity: 0.8;z-index: 5;}
	.hide{display:none;}
</style>