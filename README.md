# my-vue2 zhihuDaily

* a vue2版知乎日报
* 所有API均来自网络（若涉及侵权，请及时联系我删除) 
* 感谢izzyleung提供的[API](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

## 本项目所使用的的技术栈
* [vue2](https://cn.vue.org)
* [vue-router2](http://router.vuejs.org/zh-cn/)
* [vuex2](http://vuex.vuejs.org/zh-cn/)
* [vue-resource](https://github.com/pagekit/vue-resource)
* [mint-ui](https://github.com/ElemeFE/mint-ui)

###实现功能
* 首页下拉刷新，上拉加载
* 日夜模式切换
* 首页头部title切换

###解决问题
* 解决知乎api接口只能用get模式（使用代理，具体详见config/index.js）
* 知乎图片防盗链问题（使用https://images.weserv.nl 图片代理和缓存）

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
