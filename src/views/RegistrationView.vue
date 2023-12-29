<script setup>
import usersRequests from "@/requests/usersRequests";
import { useAuthStore } from '@/stores/authStore.js';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const authService = useAuthStore();
const router = useRouter();

let password = ref(null)
let login = ref(null)

async function userRegistration() {
  const userData = {
    login: login.value,
    password: password.value
  };
  let response = await usersRequests.register(userData);
  if (response) {
    router.push("/");
    alert("Вы успешно зарегистрирован!")
  }
  else {
    alert('Ругистрация не успешно!');
  }
}
</script>
<template>
  <div class="form">
    <h2 class="text-center mt-5">Registration</h2>
    <div class="form w-50 mx-auto mt-5">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="Login" v-model="login" />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" />
        <label for="floatingPassword">Password</label>
      </div>
      <button class="btn btn-primary  mt-5 " @click="userRegistration()">
        {{ authService.isActiveUser ? "Вход" : "Sign up" }}
      </button>
    </div>

  </div>
</template>
<style scoped></style>
