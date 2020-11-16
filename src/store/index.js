// javascript for vue-test
// create by zongx at 2020/11/6 14:38
// VueX 的使用
// 状态管理工具

import Vue from 'vue'
import Vuex from 'vuex'

//挂载VueX
Vue.use(Vuex);

const store = new Vuex.Store({
    //数据存放的状态
    state: {

    },
    //用来操作state中数据的方法合集
    //方法默认有两个参数，state：指state对象，payload：用户可选择传递的对象数据
    //调用方法：this.$store.commit('edit','该对象可传可不传')
    mutations: {

    }
});

export default store