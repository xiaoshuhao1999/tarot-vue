/*
 * @Author: xiaoshuhao1999
 * @Date: 2023-08-31 20:35:26
 * @LastEditors: xiaoshuhao1999 247695042@qq.com
 * @LastEditTime: 2023-09-04 16:40:36
 * @FilePath: /tarot/src/router/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by 247695042@qq.com, All Rights Reserved. 
 */

import {createRouter,createWebHistory} from 'vue-router';
import homePage from '../pages/homePage/index.vue'
import drawCard from '../pages/drawCardPage/index.vue'

const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/index',
    name:'index',
    component:homePage
  },{
    path:'/drawCard',
    name:"drawCard",
    component:drawCard
  }
]
const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router;