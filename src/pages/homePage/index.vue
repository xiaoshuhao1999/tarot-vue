<!--
 * @Author: xiaoshuhao1999
 * @Date: 2023-08-31 20:49:57
 * @LastEditors: xiaoshuhao1999 247695042@qq.com
 * @LastEditTime: 2023-09-04 16:39:16
 * @FilePath: /tarot/src/pages/homePage/index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 247695042@qq.com, All Rights Reserved. 
-->

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const startTarot = () => {
  router.push({
    name: 'drawCard',
    path: "/drawCard"
  })
}
</script>

<template>
  <div class="tarot_index">
    <div class="tarot_title animate__animated animate__fadeInLeft animation-delay-1">占卜塔罗</div>
    <div class="tarot_title_en animate__animated animate__fadeInRight animation-delay-2">DIVINATION TAROT</div>
    <div class="tarot_tit animate__animated animate__fadeInLeft animation-delay-3">請拋開雜念，集中你的精神，順從自己的意志 準備好了嗎？點擊開始吧</div>
    <div class="tarot_card animate__animated animate__fadeInRight animation-delay-4">
      <div class="tarot_center"></div>
    </div>
    <div class="confirmBtn animate__animated animate__fadeInLeft animation-delay-5" style="margin-top: 2rem;"
      @click="startTarot">開始</div>
  </div>
</template>

<style scoped src="./public/index.css">
</style>
