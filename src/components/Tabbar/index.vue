<script setup>
import { defineProps } from 'vue';

defineProps({
  //  标题文字
  title: {
    type: String,
    default: '',
  },
  // tabbar背景色
  backgroundColor: {
    type: String,
    default: '',
  },
  // 标题字体颜色
  color: {
    type: String,
    default: '#FDE2A1'
  },
  // 标题字体大小
  fontSize: {
    type: Number,
    default: 20,
  }
})
</script>

<template>
  <div class="tabbar" :style="{ backgroundColor: backgroundColor }">
    <div class="left_icon">
      <slot name="leftIcon"></slot>
    </div>
    <div class="title" :style="{ fontSize: `${fontSize / 16}rem`, color: color }">{{ title }}</div>
    <div class="right_icon">
      <slot name="rightIocn"></slot>
    </div>
  </div>
</template>

<style>
.tabbar {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;
}

.title {
  flex: 1;
  height: 100%;
  text-align: center;
  font-family: 'DLT';
}

.left_icon,
.right_icon {
  width: 2.8125rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
