<template>
  <div class="head">
    <common-header v-show="!isInfo"></common-header>
<!--     <detail-head v-show="isInfo"></detail-head> -->
  </div>
</template>
<script>
	import CommonHeader from './head/Commonheader.vue'
/*	import DetailHead from './head/detailHead.vue'*/
	import { mapGetters } from 'vuex'
	export default {
	  name: 'z-head',
	  computed: {
	    ...mapGetters(['isInfo'])
	  },
	  components:{
	  	CommonHeader
	  }
    }
</script>
<style scoped>
.head{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 4;
}
</style>