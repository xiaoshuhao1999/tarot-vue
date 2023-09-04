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