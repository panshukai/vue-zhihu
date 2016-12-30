import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store=new Vuex.Store({
	state:{
		isHideBar:true,
		isInfo:false
	},
	getters:{
		isHideBar:state=>state.isHideBar,
		isInfo:state=>state.isInfo
	},
	mutations:{
		hideBar:(state,flag)=>{
			state.isHideBar=flag;
		},
		isInfoPage:(state,flag)=>{
			state.isInfo=flag;
		}
	}
});
export default store