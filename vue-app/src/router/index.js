import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import Home from '../pages/Home.vue'
import Categories from '../pages/Categories.vue'
import Product from '../pages/Product.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'categories',
          name: 'categories',
          component: Categories,
        },
        {
          path: 'categories/:id',
          name: 'product',
          component: Product,
        },
      ],
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
        },
      ],
    },
  ],
})

export default router
