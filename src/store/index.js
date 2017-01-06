import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store=new Vuex.Store({
	state:{
		isHideBar:true,
		isInfo:false,
		backgroundColor:'#00A2EA',
	},
	getters:{
		isHideBar:state=>state.isHideBar,
		isInfo:state=>state.isInfo,
		backgroundColor:state=>state.backgroundColor,
		title:state=>state.title,
	},
	mutations:{
		hideBar:(state,flag)=>{
			state.isHideBar=flag;
		},
		isInfoPage:(state,flag)=>{
			state.isInfo=flag;
		},
		changeColor:(state,color)=>{
			state.backgroundColor=color;
		}
	}
});
export default store