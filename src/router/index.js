// javascript for vue-test
// create by zongx at 2020/11/6 10:16

import VueRouter from "vue-router";
import Index from "@/components/Index";
import Main from "@/components/Main";
import User from "@/components/sys/User";
import Log from "@/components/sys/Log";
import Login from "@/components/Login";
import UserList from "@/components/sys/UserList";
import UserSrc from "@/components/sys/UserSrc";
import UserAdd from "@/components/sys/UserAdd";
import Manager from "@/components/manager/Manager";
import ManagerLogUpdate from "@/components/manager/ManagerLogUpdate";

/**
 * router 配置
 * 子路径前缀不为/，则拼接父路径
 * 子路径为 ''，则默认父组件加载此组件（父组件为空，只包含一个router-view）
 */
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'Main',
          component: Main,
          meta: {
            title: 'ROOT PAGE'
          }
        },{
          path: 'user',
          component: User,
          children: [
            {
              path: '',
              name: 'UserList',
              component: UserList,
              meta: {
                title: 'USER PAGE',
                keepAlive: true
              }
            },{
              path: 'src/:username',
              name: 'UserSrc',
              component: UserSrc,
              meta: {
                title: 'USER SRC'
              }
            },{
              path: 'add',
              name: 'UserAdd',
              component: UserAdd,
              meta: {
                title: 'ADD USER'
              }
            }
          ]
        },{
          path: 'log',
          name: 'Log',
          component: Log
        }
      ]
    },{
      path: '/login',
      component: Login,
      meta: {
        title: 'LOGIN PAGE'
      }
    },{
      path: '/manager',
      component: Manager,
      children: [
        {
          path: '',
          component: ManagerLogUpdate,
          meta: {
            title: 'LOG UPDATE'
          }
        }
      ]
    }
  ]
});