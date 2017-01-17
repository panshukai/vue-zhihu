import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store=new Vuex.Store({
	state:{
		isHideBar:true,
		isInfo:false,
		backgroundColor:'#00A2EA',
		headDate:'首页',
	},
	getters:{
		isHideBar:state=>state.isHideBar,
		isInfo:state=>state.isInfo,
		backgroundColor:state=>state.backgroundColor,
		title:state=>state.title,
		headDate:state=>state.headDate,
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
		},
		changeHeadDate:(state,date)=>{
			state.headDate=date
		}
	}
});
export default store