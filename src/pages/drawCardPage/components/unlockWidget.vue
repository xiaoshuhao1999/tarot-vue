<!--
 * @Author: xiaoshuhao1999
 * @Date: 2023-09-02 16:39:23
 * @LastEditors: xiaoshuhao1999 247695042@qq.com
 * @LastEditTime: 2023-09-04 17:21:31
 * @FilePath: /tarot/src/pages/drawCardPage/components/unlockWidget.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 247695042@qq.com, All Rights Reserved. 
-->

<script setup>

import { ref, onMounted, defineProps } from 'vue';
const canvasTriangle = ref(null); // 获取canvas DOM
defineProps({
  startAnimate: {
    type: Boolean,
    default: false
  },
  reqDataList:{
    type:Array,
    default:[],
  }
})
const unlockCardsData = ref([
  {
    type: 0, // 卡片类型
    card_bg: '', // 卡片背景
    bottom_text: '聖杯騎士·正位',
    title: "情感",
    class: "emotion",
    animate: "animate__zoomInDown",
  },
  {
    type: 1, // 卡片类型
    card_bg: '', // 卡片背景
    bottom_text: '聖杯騎士·正位',
    title: "財富",
    class: "cause",
    animate: "animate__zoomInLeft",
  },
  {
    type: 2, // 卡片类型
    card_bg: '', // 卡片背景
    bottom_text: '聖杯騎士·正位',
    title: "事業",
    animate: "animate__zoomInRight",
    class: "riches",
  }
]);
const tabData = ref([{
  type: 0,
  title: "情感",
}, {
  type: 1,
  title: "財富",
}, {
  type: 2,
  title: "事業",
}])
// 定义一个默认选择的卡片类型  0 情感
const cardTypeIndex = ref(0);
const domList = ref([]); // 定义需要旋转卡牌的dom

// 绘制三角图形
const paintTriangle = () => {
  const ctx = canvasTriangle.value.getContext('2d');  // 创建一个2d画布
  canvasTriangle.value.width = window.innerWidth * 0.79; // 定义画布的宽度
  canvasTriangle.value.height = window.innerHeight * 0.31; // 定义画布的高度
  ctx.lineWidth = 2;//线的边框为10像素  
  ctx.strokeStyle = '#FFD989'; // 画笔颜色
  ctx.beginPath(); // 开始绘制
  ctx.moveTo(canvasTriangle.value.width / 2, 0);
  ctx.lineTo(0, canvasTriangle.value.height);
  ctx.lineTo(canvasTriangle.value.width, canvasTriangle.value.height);
  ctx.closePath();//闭合路径

  // ctx.beginPath(); // 开始绘制
  ctx.moveTo(canvasTriangle.value.width / 2, 36);
  ctx.lineTo(28, canvasTriangle.value.height - 16);
  ctx.lineTo(canvasTriangle.value.width - 28, canvasTriangle.value.height - 16);
  ctx.closePath();//闭合路径

  ctx.stroke();//绘制定义的图形
}
//  改变tab栏的index
const changeTabIndex = index => {
  if (cardTypeIndex.value == index) return; // 如果点击的tab索引与cardTypeIndex.value相同 则不做操作
  cardTypeIndex.value = index;
}
onMounted(() => {
  paintTriangle();
})
</script>

<template>
  <div class="unlock_content">
    <div style="width: 100%;height: calc(100vh * 0.56);">
      <canvas ref="canvasTriangle" class="canvasStyle"></canvas>
      <div class="card_connect">
        <div class="card_cnec_style animate__animated" ref="domList" :class="[item.class, startAnimate ? item.animate : '']"
          v-for="(item, index) in unlockCardsData" :key="index">
          <div class="card_type">{{ item.title }}</div>
          <div class="card_cnec_bg" :style="reqDataList[index] ? `background:url(http://taluo.liuzhankj.com/${reqDataList[index].image}) no-repeat;background-size: 100% 100%;`: ``"></div>
          <div class="card_bot">{{ reqDataList[index]?.name }}·{{ reqDataList[index]?.direction }}</div>
        </div>
      </div>
    </div>
    <div style="min-height: 44vh; display: flex;flex-direction: column;align-items: center;">
      <div class="tabList">
        <div class="tabItem" @click="changeTabIndex(index)" :class="{ tab_active: cardTypeIndex == index }"
          v-for="(item, index) in tabData" :key="index">{{ item.title }}</div>
      </div>
      <div class="unlock_box">
        <div class="unlock_title">聖杯騎士·正位</div>
        <div class="unlock_text" style="filter: blur(.25rem);">想逃离的苦难和哀伤 背对想逃离的苦难和哀伤
          背对恐惧、女人的情绪、不愿意承认、对自己的武装保护、不愿意流露自己的情感、变化的情绪 让自己难受 对自己的武装保护</div>
      </div>
      <div class="confirmBtn unlockBtn">支付後查看解牌內容</div>
    </div>
  </div>
</template>

<style scoped src="../public/unlock.css">
</style>
