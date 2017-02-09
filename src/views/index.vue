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
      // zhihuApi:'/jiekou/news/latest',
      zhihuApi:'/phpinfo.php?a=news/latest',
      // before:'/jiekou/news/before/',
      before:'/phpinfo.php?a=news/before/',
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
        // console.log(this.body);
        for(var i=0;i<this.liNumArr.length-1;i++){
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
    showDate(time){//
        var dateStr='';
        var year=Number(time.substring(0,4));
        var month=Number(time.substring(4,6));
        var date=Number(time.substring(6,8));
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
    loadTop() {//下拉刷新
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
    loadBottom() {//上拉加载
        setTimeout(() => {
            this.$http.get(this.before+this.date).then(function(response){
                this.body.push(JSON.parse(response.body));
                // console.log(String(this.date));
                var year=Number(String(this.date).substring(0,4));
                var month=Number(String(this.date).substring(4,6));
                var date=Number(String(this.date).substring(6,8));
                var times=new Date(year,month-1,date).getTime();
                // var lastTimeYear=new Date(times - 24*60*60*1000).getFullYear();
                // var lastTimeMonth=new Date(times - 24*60*60*1000).getMonth();
                // var lastTimeDate=new Date(times - 24*60*60*1000).getDate();
                this.date=this.changeDate(new Date(times - 24*60*60*1000));
                this.liNum+=JSON.parse(response.body).stories.length;
                this.liNumArr.push(this.liNum);
                this.titleNum+=1;
                this.titleNumArr.push(this.titleNum);
              // console.log(_this.liNum);
                this.headDateArr.push(JSON.parse(response.body).date);//存入每次的date数值
                console.log(this.liNumArr);
                console.log(this.headDateArr);
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
            console.log(JSON.parse(response.body));
            _this.body.push(JSON.parse(response.body));
            _this.topList=JSON.parse(response.body).top_stories;//轮播图json
            // _this.newsList=JSON.parse(response.body).stories;
            _this.date=Number(JSON.parse(response.body).date);
            // console.log(_this.headDateArr);

            if(_this.liNumArr[0]!=JSON.parse(response.body).stories.length){//解决下拉刷新后滚动页面标题日期与页面内容日期不对应（原因：下拉刷新和mount都执行此函数）
                _this.headDateArr.push(JSON.parse(response.body).date);//存入当前日期
                _this.liNum+=JSON.parse(response.body).stories.length;//新闻列表单个新闻和
                _this.liNumArr.push(_this.liNum);//加载一次，存入当前所有的列表内容总和
                _this.titleNum+=1;
                _this.titleNumArr.push(_this.titleNum);
            }

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
  height: 6.25rem;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.mint-swipe-indicator{background-color: #666;}
.mint-swipe-indicator.is-active{background-color: #fff;}
.wrap{position: relative;width: 100%;height: 100%;}
.wrap p{position: absolute;top: 65%;left: 0;padding: 0 0.625rem;}
dt{padding: 0.25rem 0 0.25rem 0.5rem;font-size: 18px;font-weight: bold;color: #888;}
ul{width: 100%;}
li{border: 1px solid #ccc;margin: 0 0.15625rem 5px;box-shadow: 0px 2px 2px #ddd;border-radius: 4px;padding: 0.15625rem;}
.listDiv{display: flex;flex-direction: row;}
.leftInfo{flex: 4;text-align: left;color: #000;padding-right: 0.1rem;}
.leftInfo p{padding: 0.3125rem 0;font-size: 14px;}
.leftInfo button{border: 1px solid #ccc;background-color: #fff;color: #999;padding: 2px;border-radius: 2px;}
.img{flex: 1;text-align: left;position: relative;}
.img img{display: block;width: 100%;}
.img .cover{position: absolute;left: 0;bottom: 0;width: 100%;background-color: #000;opacity: .4;height: 0.5rem;}
.img p{position: absolute;right: 0.125rem;bottom: 1px;color: #fff;font-size: 12px;text-align: right;width: auto;}
</style>
