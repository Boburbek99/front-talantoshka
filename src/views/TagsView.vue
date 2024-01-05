<script setup>
import tagsRequests from "@/requests/tagsRequests.js"
import { onBeforeMount, ref } from "vue";


const tags = ref({});
let editTag = ref([])


onBeforeMount(async () => {
    await getAllTags()

});

async function getAllTags() {

    const response = await tagsRequests.getAllTags()
    tags.value = response.data;
}
async function addTag() {
    const tagData = { ...tags.value }
    const response = await tagsRequests.addTag(tagData)
    getAllTags()
}
async function deleteTag(tagById) {
    const response = await tagsRequests.removeTag(tagById)
    getAllTags()
}
async function updateTag(id) {
    let update = editTag.value
    const updateData = {
        ...update
    }
    const response = await tagsRequests.updateTag(id, updateData)
    getAllTags()
}

</script>

<template>
    <div class="row mb-3 mt-5 mx-auto">
        <div class="col-sm-4">
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm" v-model="tags.name" />
            </div>
            <div class="btn-tags">
                <button type="button" class="btn btn-primary" @click="addTag">Add</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <div class="panel">
                    <div class="panel-body table-responsive">
                        <table class="table">

                            <thead>
                                <th>Tags</th>
                            </thead>
                            <tbody>
                                <tr v-for="tag in tags" :key="tag._id">
                                    <td>{{ tag.name }}</td>
                                    <td><button type="button" class="btn btn-danger"
                                            @click="deleteTag(tag._id)">Delete</button></td>
                                    <td><button type="button" class="btn btn-success"
                                            @click="updateTag(tag._id)">Update</button>

                                    </td>
                                </tr>
                                <td> <input type="text" v-model="editTag.name"></td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-tags {
    display: flex;
    align-items: baseline;
}

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