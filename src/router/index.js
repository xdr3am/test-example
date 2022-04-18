import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home')
  },
  {
    path: '/not-home',
    name: 'not-home',
    component: () => import('../views/not-home')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router