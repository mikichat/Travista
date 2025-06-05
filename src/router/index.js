// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트 불러오기
import Home from '../pages/Home.vue'
import Trips from '../pages/Trips.vue'
import Customers from '../pages/Customers.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/trips', name: 'Trips', component: Trips },
  { path: '/customers', name: 'Customers', component: Customers },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
