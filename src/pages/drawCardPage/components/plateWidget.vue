<!--
 * @Author: xiaoshuhao1999
 * @Date: 2023-09-01 09:09:14
 * @LastEditors: xiaoshuhao1999 247695042@qq.com
 * @LastEditTime: 2023-09-04 16:38:29
 * @FilePath: /tarot/src/pages/drawCardPage/components/plateWidget.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by 247695042@qq.com, All Rights Reserved. 
-->

<script setup>
import { ref, watch, onMounted, defineEmits } from 'vue';
import {selectCard} from '../../../service/selectCard.js';

const tarotLength = ref(78); // 定义塔罗牌张数
const angleList = ref([]); // 定义塔罗牌每张牌的角度
const plateRotateAngle = ref(180); // 圆盘初始默认角度
var timer = null; // 定义一个定时器
const clickTaroIndexList = ref([]); // 点击的塔罗牌序号   最大只能三张
const downAnimateFlag = ref(false); // 是否开启动画
// 监听手指触碰以及移动时的坐标
const touchCoordinates = ref({ startX: 0, startY: 0, moveX: 0, moveY: 0 });
// 定义移动状态
const touchMoveState = ref('stop'); // 有三种类型 left right stop
const copyBoxDom = ref(null); // 需要复制的dom卡片  用来当做动画
const domList = ref([]);
const tarot_id = ref([]); // 底部显示的塔罗牌id
const showTarotList = ref(false); // 显示牌组
const is_have = ref(''); // 记录已抽的卡片id
// 存放一些其他的参数
const otherOption = ref({
  isAllowClick: true, // 是否允许点击  默认是允许的  当用户点击是  变为false 在动画没有结束的时候 再次改为true
  requestData:[]
})
const tarotList = ref([
  { text: "情感", index: 1 ,type:1},
  { text: "財富", index: 2 ,type:2},
  { text: "事業", index: 3 ,type:3},
])
const moveCoordinates = ref({
  b_pageX: 0, // dom原来到y轴的距离
  b_pageY: 0, // dom原来到x轴的距离
  pageX: 0, // 需要移动到x轴的距离
  pageY: 0, // 需要移动到y轴的距离
})
const moveStartXY = ref({
  x: 0,
  y: 0
})


const emit = defineEmits(['nextStep'])
// console.log(1)
// 设置塔罗牌角度
function setAngleList() {
  for (let i = 0; i < tarotLength.value; i++) {
    angleList.value.push({ angle: 360 / tarotLength.value * i, isEmpty: false }); // isEmpty 是否为空 默认为false 当为true时，则不能点击 因为以及加入到塔罗牌序号中
  }
}

// 监听手指移动反向
function listenTouchmove(e) {
  // console.log(e.touches[0])
  touchCoordinates.value.moveX = e.touches[0].pageX;
  touchCoordinates.value.moveY = e.touches[0].pageY;
  e.preventDefault();
  /**
   * 如果移动的x坐标减去刚触摸时的x坐标大于0则为向右移动
   * 如果移动的x坐标减去刚触摸时的x坐标小于0则为向坐移动
   * 防止误触 所以将条件置于[-1,1]之间
   */
  // console.log(touchCoordinates.value.moveX - touchCoordinates.value.startX)
  if ((touchCoordinates.value.moveX - touchCoordinates.value.startX) > 1) {
    touchMoveState.value = 'right';
  } else if ((touchCoordinates.value.moveX - touchCoordinates.value.startX) < -1) {
    touchMoveState.value = 'left';
  } else {
    touchMoveState.value = 'stop';
  }
}
// 监听手指刚触碰的位置
function listenTouchstart(e) {
  // console.log(e)
  touchCoordinates.value.startX = e.touches[0].pageX;
  touchCoordinates.value.startY = e.touches[0].pageY;
}
// 监听手指结束的位置
function listenTouchend(e) {
  touchMoveState.value = 'stop';
}
// console.log(touchMoveState.value)
watch(touchMoveState, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  switch (newVal) {
    case 'left':
      clearInterval(timer);
      timer = setInterval(() => {
        plateRotateAngle.value--;
        // console.log(plateRotateAngle.value);
      }, 100);
      break;
    case 'right':
      clearInterval(timer);
      timer = setInterval(() => {
        plateRotateAngle.value++;
        // console.log(plateRotateAngle.value);
      }, 100);
      break;
    case 'stop':
      clearInterval(timer);
      break;
    default:
      break;
  }
})

function clickCard(index) {
  if (!otherOption.value.isAllowClick) return; // 如果为false 则说明动画还未结束
  if (clickTaroIndexList.value.length >= 3) return; // 只能选择三张牌  超过三张则不做操作
  if (angleList.value[index].isEmpty) return; // 选择的卡片是否被选择过 选择过则不做操作
  downAnimateFlag.value = true; // 显示卡片动画
  otherOption.value.isAllowClick = false; // 不允许点击 等动画结束 再变为true
  clickTaroIndexList.value.push(index); // 将点击的值放入点击的塔罗牌数组中
  angleList.value[index].isEmpty = true; // 将点击下标的塔罗牌标记为空
  let __index = clickTaroIndexList.value.length - 1; // 判断当前点击卡牌中的长度 根据长度值来判断牌数量 
  // console.log(__index)
  moveCoordinates.value.pageX = moveCoordinates.value.b_pageX - domList.value[__index].getBoundingClientRect().x; // 获取到dom到x轴的距离
  moveCoordinates.value.pageY = moveCoordinates.value.b_pageY - domList.value[__index].getBoundingClientRect().y; // 获取到dom到y轴的距离
  selectCard(tarotList.value[__index].type,is_have.value).then((res)=>{
    otherOption.value.requestData.push(res.data)
  })
  is_have.value += ','+index;
  animateHandle(moveCoordinates.value);

  // downAnimateFlag.value = false;
}

// 动画处理函数
function animateHandle(moveCoordinates) {
  setTimeout(() => {
    moveStartXY.value.x = -moveCoordinates.pageX;
    moveStartXY.value.y = -moveCoordinates.pageY;
    // downAnimateFlag.value = false;
  }, 2100);
  setTimeout(() => {
    tarot_id.value.push(clickTaroIndexList.value.length);
    moveStartXY.value.x = 0;
    moveStartXY.value.y = 0;
    downAnimateFlag.value = false;
    otherOption.value.isAllowClick = true; // 允许点击
  }, 2500);
}
const nextStep = ()=>{
  // 只有抽满三张才可以进行下一步
  if(clickTaroIndexList.value.length==3){
    emit('nextStep',otherOption.value.requestData); 
  }else{
    console.log('参数错误或者少于三张牌');
  }
};
onMounted(() => {
  setAngleList();
  moveCoordinates.value.b_pageX = copyBoxDom.value.getBoundingClientRect().x; // 获取需要动画dom到x轴的距离
  moveCoordinates.value.b_pageY = copyBoxDom.value.getBoundingClientRect().y; // 获取需要动画dom到y轴的距离
  setTimeout(()=>{
    showTarotList.value = true;
  },1000)
})
</script>

<template>
  <div class="card_plate" @touchmove="listenTouchmove" @touchstart="listenTouchstart" @touchend="listenTouchend"
    :style="{ transform: `translateX(-50%) rotateZ(${plateRotateAngle}deg)` }">
    <div class="card" v-for="(item, index) in angleList" :key="index" @click="clickCard(index)"
      :style="{ bottom: `${showTarotList?'-7.625rem':'-20.625rem'}`, transform: `translate(-50%) rotateZ(${item.angle}deg)`, transition: `all ${item.angle / 200}s ease-in-out` }"
      :class="{ 'animate__animated animate__fadeOutUp': item.isEmpty }">
      <div class="card_box" :style="{ boxShadow: 'none' }">
        <div class="card_front" :class="{ 'card_front_isClick': item.isEmpty }"></div>
        <div class="card_back"></div>
      </div>
    </div>
  </div>
  <div class="copy_box" :style="{ transform: `translate(${moveStartXY.x}px,${moveStartXY.y}px)` }">
    <div class="card_copy" ref="copyBoxDom" :class="{ 'fadeInDown_animate': downAnimateFlag }"
      :style="{ opacity: (downAnimateFlag ? 1 : 0) }">
      <div class="card_box">
        <div class="card_front"></div>
        <div class="card_back"></div>
      </div>
    </div>
  </div>
  <div class="tit_text animate__animated animate__fadeInLeft">請憑感覺抽選出三張牌放置於下方 （牌組可左右滑動）</div>
  <div class="tarot_select_list animate__animated animate__fadeInRight">
    <div class="tarot_select_item" v-for="(item, index) in tarotList" :key="index" ref="domList"
      :style="tarot_id[index] == item.index ? 'filter: brightness(100%);' : 'filter: brightness(72%);'">
      <div class="tarot_select_bg"
        :style="tarot_id[index] == item.index ? 'box-shadow: 0 0 14px #f5d382;' : 'box-shadow: none;'">
        <span class="tarot_select_text">{{ item.text }}</span>
      </div>
      <!-- 覆盖物 -->
      <div class="card_overlay" :style="tarot_id[index] == item.index ? 'display: block;' : 'display: none;'">
        <div class="card_box" :class="clickTaroIndexList.length>=index ? `rotateCard`:''">
          <div class="card_front"></div>
          <div class="card_back" :style="otherOption.requestData[index] ? `background:url(http://taluo.liuzhankj.com/${otherOption.requestData[index].image}) no-repeat;background-size: 100% 100%;`: ``"></div>
        </div>
      </div>
      <div class="bot_line" v-if="tarot_id[index] == item.index">
        {{ otherOption.requestData[index]?.name }}·{{ otherOption.requestData[index]?.direction }}
      </div>
    </div>
  </div>
  <div class="confirmBtn btn_style animate__animated animate__fadeInLeft" @click="nextStep">確定</div>
</template>

<style src="../public/plate.css"></style>
