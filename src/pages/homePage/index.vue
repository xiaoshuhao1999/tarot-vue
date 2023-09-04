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
