<script setup>
import { useAuthStore } from "@/stores/authStore.js";

const authService = useAuthStore();
let userData = authService.user;

function logout() {
  if (confirm("Вы уверены что хотите выйти?")) {
    authService.logout();
  }
}
</script>
<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-success mt-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <router-link to="/" class="nav-item nav-link text-decoration-none header-nav">
              Author
            </router-link>
            <router-link to="/admin" class="nav-item nav-link text-decoration-none header-nav">
              Admin
            </router-link>
            <router-link to="/login" @click="logout" class="nav-item nav-link text-decoration-none header-nav">
              Logout
            </router-link>
          </ul>
          <div class="panelUser">{{ userData.role }}/{{ userData.login }}</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
