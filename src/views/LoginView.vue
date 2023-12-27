<script>
import user from "@/requests/userRequests.js";

</script>
<template>
    <h2 class="text-center mt-5">Log in</h2>
    <div class="form w-50 mx-auto mt-5">
  <div class="form-floating mb-3   ">
    <input type="email"  class="form-control" id="floatingInput"  placeholder="name@example.com"/>
    <label for="floatingInput">Email address</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  />
    <label for="floatingPassword">Password</label>
  </div>
  <button type="button" class="btn btn-success mt-5">Log in</button>
</div>
</template>

<style></style>
