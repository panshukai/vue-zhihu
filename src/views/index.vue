<template>
    <div id="index">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded">
            <mt-swipe class="my-swipe">
                <mt-swipe-item v-for='item in topList' class='topStories' :speed="200" :auto="5000" :show-indicators="true" :prevent="true">
                    <div class="wrap" @click="getInfo(item.id)">
                        <img width="100%" :src="replaceUrl(item.image)" alt="">
                        <p>{{item.title}}</p>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
            <dl v-for="one in body">
                <dt class="textLeft">{{one.date==changeDate(new Date())?msg:showDate(one.date)}}</dt>
                <dd>
                    <ul>
                        <router-link v-for="item in one.stories" :to="{name:'indexInfo',params:{detailId:item.id}}" tag='li'>
              <!-- <li v-for="item in one.stories"> -->
                            <a class="listDiv">
                                <div class="leftInfo">
                                    <p>{{item.title}}</p>        
                                </div>
                                <div class="img">
                                  <img :src="replaceUrl(item.images[0])" alt="">
                                  <span class="cover" v-show="item.multipic"></span>
                                  <p v-show="item.multipic">多图</p>
                                </div>
                            </a>
          <!-- </li> -->
                        </router-link>
                    </ul>
                </dd>
            </dl>
            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                    <mt-spinner type="snake"></mt-spinner>
                </span>
            </div>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">
                    <mt-spinner type="snake"></mt-spinner>
                </span>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
  // import { Swipe, SwipeItem } from 'mint-ui';
  import { Indicator } from 'mint-ui';
// import { InfiniteScroll } from 'mint-ui';
export default {
  data () {
    return {
      body:[],
      topList:[],
      msg: '今日热闻',
      zhihuApi:'/jiekou/news/latest',
      before:'/jiekou/news/before/',
      allLoaded: false,
      topStatus: '',
      bottomStatus: '',
      date:'',
      liNum:0,
      liNumArr:[],//页面上每次加载后的li总额数据  
      titleNum:0,
      titleNumArr:[],
      headDateArr:[]
  }
},
  // created(){
  //   this.getList();
  // },
  mounted(){
    this.getList();
    window.addEventListener('scroll',this.scrollPage);
},
methods:{
    scrollPage(){
        var topDistance=window.pageYOffset;
        // console.log(window.pageYOffset);
        // console.log(this.titleNum);
        // console.log(topDistance);
        for(var i=0;i<this.liNumArr.length;i++){
            if(topDistance<=200+this.titleNumArr[0]*44+this.liNumArr[0]*75){
                this.$store.commit('changeHeadDate', '首页');
            }else if(topDistance>=200+this.titleNumArr[i]*44+this.liNumArr[i]*75){
                // console.log(this.showDate(this.headDateArr[i]));
                // console.log(this.titleNumArr);
                this.$store.commit('changeHeadDate', this.showDate(this.headDateArr[i+1]));
            }
        }
    },
    replaceUrl(src){
        if(src){//如果不判断，默认src为null
          return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
    },
    changeDate(time){
        var dateStr='';
        var year=time.getFullYear();
        var month=time.getMonth()+1>9?time.getMonth()+1:'0'+(time.getMonth()+1);
        var date=time.getDate()>9?time.getDate():'0'+time.getDate();
        dateStr=year+''+month+''+date;
        return dateStr;
    },
    showDate(time){
        var dateStr='';
        var year=time.substring(0,4);
        var month=time.substring(4,6);
        var date=time.substring(6,8);
        var day=new Date(year,month-1,date).getDay();
        switch(day){
            case 0:day='日';
            break;
            case 1:day='一';
            break;
            case 2:day='二';
            break;
            case 3:day='三';
            break;
            case 4:day='四';
            break;
            case 5:day='五';
            break;
            case 6:day='六';
            break;
        }
        dateStr=year+'年'+month+'月'+date+'日 星期'+day;
        return dateStr;
    },
    handleTopChange(status) {
        console.log(status);
        this.topStatus = status;
    },
    loadTop() {
        setTimeout(() => {
          this.body=[];
          this.getList();
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
    },
    handleBottomChange(status) {
        console.log(status);
        this.bottomStatus = status;
    },
    loadBottom() {
        setTimeout(() => {
            let _this=this;
            this.$http.get(_this.before+_this.date).then(function(response){
                _this.body.push(response.body);
                _this.date--;
                _this.liNum+=response.body.stories.length;
                _this.liNumArr.push(_this.liNum);
                _this.titleNum+=1;
                _this.titleNumArr.push(_this.titleNum);
              // console.log(_this.liNum);
                _this.headDateArr.push(response.body.date);//存入每次的date数值
            });
            this.$refs.loadmore.onBottomLoaded();
        }, 1500);
    },
    getInfo(id){
        this.$router.push({name:'indexInfo',params:{detailId:id}});
    },
    getList(){
        let _this=this;
        this.$http.get(_this.zhihuApi).then(function(response){
            console.log(response)
            _this.body.push(response.body);
            console.log(_this.body);
              _this.topList=response.body.top_stories;//轮播图json
              // _this.newsList=response.body.stories;
              _this.date=Number(response.body.date);
              _this.headDateArr.push(response.body.date);//存入当前日期
              // console.log(this.$route.params);
              _this.liNum+=response.body.stories.length;
              _this.liNumArr.push(_this.liNum);//加载一次，存入当前所有的列表内容总和
              _this.titleNum+=1;
              _this.titleNumArr.push(_this.titleNum);
          },
          function(response){
              console.log(response);
          })
        }
    }
}
</script>

<style scoped>

.mint-loadmore-top span,.mint-loadmore-bottom span {
  display: inline-block;
  transition: .2s linear;
}
.rotate {
  transform: rotate(180deg);
}
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 0.2rem;
  font-weight: bold;
  text-align: center;
}
.mint-swipe-indicator{background-color: #666;}
.mint-swipe-indicator.is-active{background-color: #fff;}
.wrap{position: relative;width: 100%;height: 100%;}
.wrap p{position: absolute;top: 65%;left: 0;padding: 0 0.2rem;}
dt{padding: 8px 0 8px 15px;font-size: 0.18rem;line-height: 0.28rem;font-weight: bold;color: #888;}
ul{width: 100%;}
li{border: 1px solid #ccc;margin: 0 5px 5px;box-shadow: 0px 2px 2px #ddd;border-radius: 4px;padding: 5px;}
.listDiv{display: flex;flex-direction: row;}
.leftInfo{flex: 4;text-align: left;color: #000;padding-right: 0.1rem;}
.leftInfo p{padding: 0.1rem 0;}
.leftInfo button{border: 1px solid #ccc;background-color: #fff;color: #999;padding: 2px;border-radius: 2px;}
.img{flex: 1;text-align: left;position: relative;}
.img img{display: block;width: 100%;}
.img .cover{position: absolute;left: 0;bottom: 0;width: 100%;background-color: #000;opacity: .4;height: 16px;}
.img p{position: absolute;right: 4px;bottom: 1px;color: #fff;font-size: 12px;text-align: right;width: auto;line-height: 14px;}
</style>
