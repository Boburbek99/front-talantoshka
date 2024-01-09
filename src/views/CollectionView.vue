<script setup>
import authorsRequests from "@/requests/authorsRequests";
import collectionsRequest from "@/requests/collectionsRequests";
import tagsRequests from "@/requests/tagsRequests.js"
import '@vueform/multiselect/themes/default.scss'

import Multiselect from '@vueform/multiselect'
import { onBeforeMount, ref } from "vue";
import Modal from '@/components/Modal.vue';
import Text from '../components/Form/Text.vue';

let tags = ref([]);

let requestItem = ref({});
let createOrAddModalShow = ref(false)

let authors = ref([]);
let collections = ref([]);



onBeforeMount(async () => {
    await getAllCollections();
    await getAllAuthors();
    await getAllTags()
});

async function getAllAuthors() {
    let response = await authorsRequests.getAllAuthors();
    if (response?.data) {
        authors.value = response.data;
    }
}

async function getAllCollections() {
    let response = await collectionsRequest.getAllCollections();
    if (response?.data) {
        collections.value = response.data;
    }
}

async function deletedCollection(collectionID) {
    let response = await collectionsRequest.removeCollection(collectionID);
    await getAllCollections();
}

async function update(id) {
    createOrAddModalShow.value = true
    const foundCollection = collections.value.find((collection) => collection._id == id);
    if (foundCollection) {
        requestItem.value = { ...foundCollection };

    }
}

async function save() {

    let newCollect = requestItem.value;
    let newUpdate = requestItem.value;

    const updatedData = {
        ...newUpdate
    };
    if (requestItem.value._id) {
        try {
            const response = await collectionsRequest.updateCollection(requestItem.value._id, updatedData);
            await getAllCollections()
            await getAllAuthors();
        } catch (error) {
            console.error("Error updating author:", error);
        }
    }
    else {
        let response = await collectionsRequest.addCollection(newCollect);
        await getAllCollections();
    }
    createOrAddModalShow.value = false;
}

function addOpen() {
    createOrAddModalShow.value = true
    requestItem.value = {}

}


// ============tags===============

async function getAllTags() {

    const response = await tagsRequests.getAllTags()
    tags.value = response.data?.map(tag => { return { label: tag.name, value: tag._id } })
}

</script>

<template>
    <div class="container">

        <h1>Page Collections</h1>
        <Modal v-model="createOrAddModalShow" buttonText="Добавить запись" title="Add collection" class="d-none">
            <Text v-model="requestItem.name" label="Namae"></Text>
            <Text v-model="requestItem.description" label="Description"></Text>
            <Text v-model="requestItem.oldPrice" label="Old price"></Text>
            <Text v-model="requestItem.newPrice" label="New Price"></Text>

            <div class="row mb-3">
                <div class="col-sm-4">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Author</span>
                        <select @change="getAllAuthors" v-model="requestItem.author" id="authors">
                            <option v-for="author in authors" :key="author._id" :value="author._id">{{ author.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <div class="input-group input-group-sm mb-3">
                        <Multiselect v-model="requestItem.tag" mode="tags" :close-on-select="false" :searchable="true"
                            :options="tags">
                        </Multiselect>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="input-group mb-3">
                    <input type="file" class="form-control" id="inputGroupFile02">
                    <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
            </div>
            <button type="button" class="btn btn-primary" @click="save">Save</button><br>
        </Modal>

        <button class="btn btn-primary mt-5 mb-5" @click="addOpen">Add Collection</button>

        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <div class="panel">
                    <div class="panel-body ">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Delete</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>New Price</th>
                                    <th>Old Price</th>
                                    <th>Tags</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="collection in collections" :key="collection._id">
                                    <td>
                                        <ul class="action-list">
                                            <li>
                                                <button class="btn  btn-danger "
                                                    @click="deletedCollection(collection._id)">delete</button>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>{{ collection._id }}</td>
                                    <td>{{ collection.name }}</td>
                                    <td>{{ collection.description }}</td>
                                    <td>{{ collection.newPrice }}</td>
                                    <td>{{ collection.oldPrice }}</td>
                                    <td> <span v-for="(tag, index) in collection.tag" :key="index">
                                            {{ tags.find(t => t.value === tag)?.label }}
                                            <!-- Assuming tags is an array of objects with label and value properties -->
                                        </span></td>
                                    <td>{{ authors.find(a => a._id == collection.author)?.name }}</td>
                                    <td> <button class="btn btn-primary mt-5 mb-5"
                                            @click=" update(collection._id)">Update</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel {
    font-family: "Raleway", sans-serif;
    padding: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}

.panel .panel-heading {
    background: #535353;
    padding: 15px;
    border-radius: 0;
}

.panel .panel-heading .btn {
    color: #fff;
    background-color: #000;
    font-size: 14px;
    font-weight: 600;
    padding: 7px 15px;
    border: none;
    border-radius: 0;
    transition: all 0.3s ease 0s;
}

.panel .panel-heading .btn:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.panel .panel-heading .form-horizontal .form-group {
    margin: 0;
}

.panel .panel-heading .form-horizontal label {
    color: #fff;
    margin-right: 10px;
}

.panel .panel-heading .form-horizontal .form-control {
    display: inline-block;
    width: 80px;
    border: none;
    border-radius: 0;
}

.panel .panel-heading .form-horizontal .form-control:focus {
    box-shadow: none;
    border: none;
}

.panel .panel-body {
    padding: 0;
    border-radius: 0;
}

.panel .panel-body .table thead tr th {
    color: #fff;
    background: #8d8d8d;
    font-size: 17px;
    font-weight: 700;
    padding: 12px;
    border-bottom: none;
}

.panel .panel-body .table thead tr th:nth-of-type(1) {
    width: 10px;
}

.panel .panel-body .table thead tr th:nth-of-type(3) {
    width: 0%;
}

.panel .panel-body .table tbody tr td {
    color: #555;
    background: #fff;
    font-size: 15px;
    font-weight: 500;
    padding: 13px;
    vertical-align: middle;
    border-color: #e7e7e7;
}

.panel .panel-body .table tbody tr:nth-child(odd) td {
    background: #f5f5f5;
}

.panel .panel-body .table tbody .action-list {
    padding: 0;
    margin: 0;
    list-style: none;
}

.panel .panel-body .table tbody .action-list li {
    display: inline-block;
}

.panel .panel-body .table tbody .action-list li a {
    color: #fff;
    font-size: 13px;
    line-height: 28px;
    height: 28px;
    width: 33px;
    padding: 0;
    border-radius: 0;
    transition: all 0.3s ease 0s;
}

.panel .panel-body .table tbody .action-list li a:hover {
    box-shadow: 0 0 5px #ddd;
}

.panel .panel-footer {
    color: #fff;
    background: #535353;
    font-size: 16px;
    line-height: 33px;
    padding: 25px 15px;
    border-radius: 0;
}

.pagination {
    margin: 0;
}

.pagination li a {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 15px;
    font-weight: 700;
    margin: 0 2px;
    border: none;
    border-radius: 0;
    transition: all 0.3s ease 0s;
}

.pagination li a:hover,
.pagination li a:focus,
.pagination li.active a {
    color: #fff;
    background-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
</style>