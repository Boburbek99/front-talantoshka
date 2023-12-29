<script setup>
import usersRequests from "@/requests/usersRequests.js";

import { useAuthStore } from "@/stores/authStore.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authService = useAuthStore();
const router = useRouter();

let userPassword = ref("");
let userLogin = ref("");

async function Login() {
  const dataUser = {
    login: userLogin.value,
    password: userPassword.value,
  };
  let response = await usersRequests.login(dataUser);
  if (response && response.data && response.data.token && response.data.user) {
    authService.auth(response.data.user, response.data.token);
    router.push("/");
    console.log("Удачная попытка");
  } else {
    alert("Пользователь не найден");
  }
}
</script>
<template>
  <h2 class="text-center mt-5">Log in</h2>
  <div class="form w-50 mx-auto mt-5">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="Login" v-model="userLogin" />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="userPassword" />
      <label for="floatingPassword">Password</label>
    </div>
    <button type="button" class="btn btn-success mt-5" @click="Login">Log in</button><br><br>

    <router-link to="/register" class="nav-item nav-link text-decoration-none header-nav">
      Sign up ?
    </router-link>
  </div>
</template>
<style scoped></style>
