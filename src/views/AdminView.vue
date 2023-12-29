<script setup>
import usersRequests from "@/requests/usersRequests";
import { ref, onBeforeMount } from "vue";

let responseData = ref(null);
let responseFalse = ref(null)

onBeforeMount(async () => {
    await adminUser();
});

async function adminUser() {
    const response = await usersRequests.admin();
    if (response) {
        if (response.data)
            responseData.value = response.data;
        else
            responseFalse.value = "Error 401!!"
    }
}

</script>
<template>
    <div class="title_text">
        <p v-if="responseData">{{ responseData }}</p>
        <p v-if="responseFalse">{{ responseFalse }}!</p>
    </div>
</template>
<style scoped>
.title_text {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
    color: blue;
}
</style>
