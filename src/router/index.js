// import * as home from '@api/home'
import { nextTick } from 'vue'
import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    meta: {
      hideBack: true
    },
    component: () => import('../pages/SlotMachine/index.vue'),
    children: []
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home/index.vue')
    // beforeEnter:((to, from,next) => {
    //   if(to.query.code === from.query.code){
    //     next()
    //   }else{
    //     next({...to,query:from.query})
    //   }
    // })
  },
  {
    path: '/slotMachine',
    name: 'slotMachine',
    component: () => import('../pages/SlotMachine/index.vue')
  },
  {
    path: '/quest',
    name: 'quest',
    component: () => import('../pages/Quest/index.vue')
  },
  // {
  //   path: '/',
  //   meta: { menuAction: 'home' },
  //   component: () => import('../components/layout/DefaultLayout.vue'),
  //   // beforeEnter: dialogBeforeEnter,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'home',
  //       component: () => import('../pages/SlotMachine/index.vue')
  //       // beforeEnter:((to, from,next) => {
  //       //   if(to.query.code === from.query.code){
  //       //     next()
  //       //   }else{
  //       //     next({...to,query:from.query})
  //       //   }
  //       // })
  //     },
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const container = document.getElementById('router-view-container')
    container?.scrollTo(0, 0)
    return { top: 0, behavior: 'smooth' }
  }
})

// 登入後進到這些頁面要跳轉回首頁
const redirectToHomePages = ['/register', '/forget', '/login', 'checkin']

router.afterEach(() => {
  nextTick(() => {
    const scrollContainer = document.querySelector('.cp-main-layout-pages')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  })
})

router.beforeEach(
  (to, from, next) => {

    next()
  }
)

export default router
