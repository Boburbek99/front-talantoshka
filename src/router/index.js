import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "authors",
      component: () => import("@/views/AuthorsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/collections",
      name: "collections",
      component: () => import("@/views/CollectionView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/AdminView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { requiresUnauth: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegistrationView.vue"),
      meta: { requiresUnauth: true },
    },
    {
      path: "/author/:id",
      name: "AuthorInfo",
      component: () => import("@/views/AuthorInfoView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/tag",
      name: "tags",
      component: () => import("@/views/TagsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: { requiresAuth: true },
    }

  ],
});
import { useAuthStore } from "@/stores/authStore.js";

router.beforeEach((to, from, next) => {
  const authService = useAuthStore();

  const isAuthenticated = authService.isActiveUser;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
export default router;
