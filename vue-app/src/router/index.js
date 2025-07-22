import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import Categories from '../pages/Categories.vue'
import Product from '../pages/Product.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/categories/:id',
      name: 'product',
      component: Product,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
})

export default router
