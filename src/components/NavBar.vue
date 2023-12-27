<script>
</script>
<template>
    <div class="container">
    <nav class="navbar navbar-expand-lg bg-success mt-3 ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <router-link to="/" class="nav-item nav-link text-decoration-none header-nav">
                Author
            </router-link>
            <router-link to="/login" class="nav-item nav-link text-decoration-none header-nav">
                Login
            </router-link>
            <router-link to="/" class="nav-item nav-link text-decoration-none header-nav">
                 Collection
            </router-link>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<style scoped>
.navbar{
color: aliceblue;
 }
</style>
