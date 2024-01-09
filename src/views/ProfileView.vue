<script setup>
import usersRequests from "@/requests/usersRequests.js";
import { ref, onBeforeMount } from "vue";

import Modal from '@/components/Modal.vue';
import Text from '../components/Form/Text.vue';

let requestItem = ref({});
let createOrAddModalShow = ref(false)

let responseData = ref({});
let reqUpdata = ref({})


onBeforeMount(async () => {
    await userByData();
});

async function userByData() {
    const response = await usersRequests.userByData();
    responseData.value = response.data;
}

async function updateUser(id) {
    const updatedUser = reqUpdata.value
    const response = await usersRequests.updateUserData(id, updatedUser)
    console.log(response, 'response')
}
// ==============Modal=================

function editData() {
    createOrAddModalShow.value = true
    requestItem.value = {}

}

</script>
<template>
    <div class="container">
        <Modal v-model="createOrAddModalShow" buttonText="Добавить запись" title="Add collection" class="d-none">
            <Text v-model="requestItem.password" label="Namae"></Text>
            <Text v-model="requestItem.login" label="Description"></Text>
            <Text v-model="requestItem.email" label="Old price"></Text>
            <Text v-model="requestItem.newPrice" label="New Price"></Text>
        </Modal>
        <input type="text" v-model="reqUpdata.password" placeholder="password">
        <input type="text" v-model="reqUpdata.login" placeholder="login">
        <button class="btn btn-primary mt-5 mb-5" @click=" updateUser(responseData._id)">Сохранить</button>
        <div class="profile_main">
            <div class="row ">
                <h2>Ваш профиль</h2>
                <div class="card mt-5" style="width: 37.7rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div id="formFile">Ваши логин: {{ responseData.login }}</div>
                        </li>
                        <li class="list-group-item">
                            <div> Ваши почта: {{ responseData.email }}</div>
                        </li>
                    </ul>
                </div>

            </div>
            <button class="btn btn-primary mt-5 mb-5" @click="editData">Редактировать профиль</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin-left: 10px;
}

.profile_main {
    border-radius: 5%;
    margin: auto;
    max-width: 600px;
    height: 400px;
    font-family: Riffic;
    background-color: #348666;
}

h2 {
    text-align: center;
    color: white;
}

.btn {
    font-size: 18px;
    background-color: #FFA500;
    color: #fff;
}
</style>