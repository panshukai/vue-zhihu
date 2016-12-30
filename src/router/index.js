import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/*组件*/
import index from '../components/mains/index.vue'
import exp from '../components/mains/exp.vue'
import indexDetail from '../components/mains/indexDetail'
import share from '../components/mains/share.vue'
import topic from '../components/mains/topic.vue'

const router = new VueRouter({
	routes:[{
		name:'index',
		path:'/index',
		component:index
	},{
		path:'/index/info/:id',
		name:'indexInfo',
		component:indexDetail
	},{
		path:'/exp',
		component:exp
	},{
		path:'/share',
		component:share
	},{
		path:'/topic',
		component:topic
	},{
    	path:'*',
    	redirect:'/index'
  	}]
});
export default router