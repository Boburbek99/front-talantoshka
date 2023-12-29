<script setup>
import NavBar from "@/components/NavBar.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { onBeforeMount } from "vue";
const authService = useAuthStore();

onBeforeMount(() => {
  authService.checkCookies();
})
</script>

<template>
  <div v-if="authService.isActiveUser">
    <NavBar />
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
