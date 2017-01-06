import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/*组件*/
import index from '../views/index.vue'
import exp from '../components/mains/exp.vue'
import indexDetail from '../views/indexDetail.vue'
import indexComment from '../views/comment.vue'
import share from '../components/mains/share.vue'
import topic from '../components/mains/topic.vue'
import themeList from '../views/themeList.vue'
import themeDetail from '../views/themeDetail.vue'
const router = new VueRouter({
	routes:[{
		name:'theme',
		path:'/theme/:id',
		component:themeList
	},{
		name:'detail',
		path:'/theme/:id/detail/:detailId',
		component:themeDetail
	},{
		name:'index',
		path:'/index',
		component:index
	},{
		name:'indexInfo',
		path:'/index/info/:detailId',
		component:indexDetail
	},{
		name:'indexInfoCom',
		path:'/index/info/:detailId/comment',
		component:indexComment		
	},{
    	path:'*',
    	redirect:'/index'
  	}]
});
export default router