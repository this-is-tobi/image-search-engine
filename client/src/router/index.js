import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchEngine from '../views/SearchEngine.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'SearchEngine',
    component: SearchEngine,
  },
  {
    path: '/indexing',
    name: 'Indexing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Indexing.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
