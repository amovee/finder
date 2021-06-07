import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Finder from '../views/Finder.vue'
import Results from '../views/Results.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Fragestrecke',
    component: Finder
  },
  {
    path: '/results',
    name: 'Resultate',
    component: Results
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
