<script setup>
/**
 * 外部组件
 */
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

/**
 * 内部自定义组件
 */
import XTabbar from '../../components/Tabbar/index.vue';
import plateWidget from './components/plateWidget.vue';
import unlockWidget from './components/unlockWidget.vue';


import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cardState = ref(0); // 记录抽牌状态   0为停留在抽牌状态; 1 为已抽排但是没有支付; 2 为已抽排已支付;
const swiperWidget = ref(null);
const isStartUnlockAnimate = ref(false);
const rqeData = ref([]);
// 根据抽牌状态来显示标题文字
const title = computed(() => {
  switch (cardState.value) {
    case 0:
      return '抽牌';
    case 1:
      return '解牌';
    case 2:
      return '解牌';
  }
})
//  点击返回按钮  需根据状态来进行操作
const clickBack = () => {
  // 如果状态为0 则返回首页
  if (cardState.value == 0) {
    router.back()
  } else if (cardState.value == 1 || cardState.value == 2) {
    cardState.value = 0;
  }
}
// 抽牌页面发送下一步请求 将title改为解牌
const changeSliderIndex = res => {
  console.log(res);
  rqeData.value = res;
  cardState.value = 1;
}
const onSwiper = (swiper) => {
  swiperWidget.value = swiper;
  // console.log(swiperWidget.value);
};
const onSlideChange = () => {
  console.log('slide change');
};
watch(cardState, (newVal, oldVal) => {
  switch (newVal) {
    case 0:
      swiperWidget.value.slidePrev();
      isStartUnlockAnimate.value = false;
      break;
    case 1:
      swiperWidget.value.slideNext();
      isStartUnlockAnimate.value = true;
      break;
    case 2:
      // swiperWidget.value.slidePrev()
      break;
    default:
      break;
  }
  // console.log(newVal, oldVal)
})
</script>

<template>
  <div class="page_bg">
    <XTabbar :title="title" backgroundColor="#242a3a">
      <template v-slot:leftIcon>
        <div class="goBack" @click="clickBack">←</div>
      </template>
    </XTabbar>
    <swiper direction='vertical' :allowTouchMove="false" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide>
        <!-- 罗盘组件 -->
        <plateWidget @nextStep="changeSliderIndex"></plateWidget>
      </swiper-slide>
      <swiper-slide>
        <!-- 解牌组件 -->
        <unlockWidget :startAnimate="isStartUnlockAnimate" :reqDataList="rqeData"></unlockWidget>
      </swiper-slide>
    </swiper>

  </div>
</template>

<style scoped>
.page_bg {
  width: 100vw;
  height: 100vh;
  background-color: #242a3a;
  position: relative;
  display: flex;
  justify-content: space-evenly;
}

.goBack {
  font-family: 'DLT';
  color: #FDE2A1;
  font-size: 1.3125rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  overflow-y:scroll;
}
</style>

