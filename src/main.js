/**
 * main.js 文件为入口文件
 * 项目中，所有的页面都会加载main.js
 * main.js用于实例化Vue对象
 * 项目中的公共JS、CSS、常量数据、插件都可以放到此文件中共享
 * 常用的插件有：
 * vue-router   路由
 * vue-lazyload 图片懒加载
 * element-ui   主流UI
 * vuex         状态管理
 * vue-infinite-scroll  滚动加载
 * axios        网络请求
 */

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import store from '@/store';
import axios from 'axios'
import http from "@/assets/js/http";
import session from "@/assets/js/session";

//表面意思为Vue.配置.产品提示 = false
//如果为true，表示项目处于开发环境，此时Vue会在console中提示很多有用的警告
//但这会增加很多运行时消耗，因此可以将此参数配置为false，避免额外消耗
Vue.config.productionTip = false;

//Vue添加vue-router，element-ui组件
//组件的添加需要在Vue上添加，在别的地方引用是没有效果的
//locale 英文
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

//axios全局注册
Vue.prototype.$axios = axios;
http.init();

//ajax拦截器，设置token
axios.interceptors.request.use(
    config => {
      let token = session.getToken();
      null != token && (config.headers.Authorization = 'bearer ' + token.token);
      return config;
    }
);

//使用router配置title
router.beforeEach((to, from, next) => {
  //title设置
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

/**
 * Vue中传入的router、store
 * 原始写法：router：router， store：store
 * ES6中，当key和value同名时，可简写为一个。
 *
 * render，Vue构建虚拟DOM函数，
 * h，Vue构建虚拟DOM使用的工具，名为：createElement
 */
new Vue({
  router,
  store,
  render (h) {
    return h(App);
  }
}).$mount('#app');
