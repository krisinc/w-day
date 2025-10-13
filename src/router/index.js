import * as home from '@api/home'
import i18n from '@i18n/index.js'
import { ToLobby } from '@interface/games'
import { userStore } from '@store/user'
import { ShowDialog } from '@web/plugins/ShowDialog'
import { nextTick } from 'vue'
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
  createRouter,
  createWebHistory
} from 'vue-router'

const dialogBeforeEnter = (to, from, next) => {
  // console.log(from.matched, to.matched)
  if (!from.meta.dialog && from.matched.length && to.meta.dialog) {
    const idx = 1
    to.matched[idx].components.default = from.matched[idx].components.default
  }
  next()
}

const beforeVipRouteEnter = async(to, from, next) => {
  const user = userStore()
     await home.getSiteInfo().then(({ data }) => {
    user.siteInfoData = data.data
  })
  if (!user.siteInfoData.vipFrontDisplay) {
    next('/')
  }
  if (!from.meta.dialog && from.matched.length && to.meta.dialog) {
    const idx = 1
    to.matched[idx].components.default = from.matched[idx].components.default
  }
  next()
}

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    meta: {
      hideBack: true
    },
    component: () => import('../views/home/index.vue'),
    children: []
  },
  {
    path: '/',
    meta: { menuAction: 'home' },
    component: () => import('../components/layout/DefaultLayout.vue'),
    // beforeEnter: dialogBeforeEnter,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue')
        // beforeEnter:((to, from,next) => {
        //   if(to.query.code === from.query.code){
        //     next()
        //   }else{
        //     next({...to,query:from.query})
        //   }
        // })
      },
    ]
  }
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
    const scrollContainer = document.querySelector('.cp-main-layout-views')
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
