import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/',
      name:'authors',
      component: () => import("@/views/AuthorsView.vue"),
    },
    {
      path:'/login',
      name:'login',
      component: () => import("@/views/LoginView.vue"),
    }
  ]
})
export default router
