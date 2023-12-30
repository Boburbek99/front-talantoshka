<script setup>
import authorsRequests from "@/requests/authorsRequests";
import collectionsRequest from "@/requests/collectionsRequests";
import { onBeforeMount, ref } from "vue";

let newCollection = ref({})
let updateInfo = ref({})

let authors = ref([]);
let collections = ref([]);
let collectionID = ref(null);
let selectedUpdate = ref(null);


onBeforeMount(async () => {
    await getAllCollections();
    await getAllAuthors();
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

async function addCollection() {
    let newObJect = newCollection.value;
    let response = await collectionsRequest.addCollection(newObJect);
    await getAllCollections();
}
async function deletedCollection(collectionID) {
    let response = await collectionsRequest.removeCollection(collectionID);
    await getAllCollections();
}
function selectCollection() {
    const foundCollection = collections.value.find((collection) => collection._id == collectionID.value);
    if (foundCollection) {
        updateInfo.value = { ...foundCollection };
        selectedUpdate.value = foundCollection;
    }
}
async function updateCollection() {
    if (!selectedUpdate.value) {
        alert("No author selected.");
        return;
    }
    let newUpdate = updateInfo.value;
    const updatedData = {
        ...newUpdate
    };

    try {
        const response = await collectionsRequest.updateCollection(selectedUpdate.value._id, updatedData);
        await getAllCollections()
        await getAllAuthors();
    } catch (error) {
        console.error("Error updating author:", error);
    }
}

</script>

<template>
    <div class="container">
        <h1>Page Auhtors</h1>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
                    <input type="text" class="form-control form-control-lg" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="newCollection.name" />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Description</span>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="newCollection.description" />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Old Price</span>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="newCollection.newPrice" />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">New Price</span>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="newCollection.oldPrice" />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Author</span>
                    <select @change="getAllAuthors" v-model="newCollection.author" id="authors">
                        <option v-for="author in authors" :key="author._id" :value="author._id">{{ author.name }}</option>
                    </select>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="addCollection">Add</button><br>


        <!-- Rest of your code... -->

        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <div class="panel">
                    <div class="panel-body table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Delete</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>New Price</th>
                                    <th>Old Price</th>
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
                                    <td>{{ authors.find(a => a._id == collection.author)?.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Collections</span>
                    <select class="form-select form-select-sm" aria-label="Small select example" @change="selectCollection"
                        v-model="collectionID">
                        <option v-for="update in collections" :key="update._id" :value="update._id">{{ update.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
                    <input type="text" class="form-control form-control-lg" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing" v-model="updateInfo.name" />
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Description</span>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="updateInfo.description" />
                </div>
            </div>


            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">New Price</span>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="updateInfo.newPrice" />
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Old Price</span>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm" v-model="updateInfo.oldPrice" />
                </div>
            </div>

            <div class="col-sm-4">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Author</span>
                    <select @change="getAllAuthors" v-model="updateInfo.author" id="authors">
                        <option v-for="author in authors" :key="author._id" :value="author._id">{{ author.name }}</option>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-primary" @click="updateCollection">Update collection</button><br>
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