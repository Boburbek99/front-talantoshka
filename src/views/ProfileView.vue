<script setup>
import usersRequests from "@/requests/usersRequests.js";
import { ref, onBeforeMount } from "vue";

let responseData = ref(null);
let responseFalse = ref(null)

const login = ref({})


onBeforeMount(async () => {
    await adminUser();
});

async function adminUser() {
    const response = await usersRequests.admin();
    responseData.value = response.data;
}

</script>
<template>
    {{ responseData._id }}
</template>

<style scoped></style>