import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Finder from '../views/Finder.vue'
import Results from '../views/Results.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Finder',
    component: Finder
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
    
  },
]

const router = new VueRouter({
  routes
})

export default router
