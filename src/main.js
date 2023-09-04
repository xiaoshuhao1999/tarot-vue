/*
 * @Author: xiaoshuhao1999
 * @Date: 2023-08-31 20:27:36
 * @LastEditors: xiaoshuhao1999 247695042@qq.com
 * @LastEditTime: 2023-09-04 16:41:06
 * @FilePath: /tarot/src/main.js
 * @Description: 
 * 
 * Copyright (c) 2023 by 247695042@qq.com, All Rights Reserved. 
 */

import { createApp } from 'vue';
import './style.css';
import './assets/css/animate.min.css';
// import 'amfe-flexible/index.js'
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
