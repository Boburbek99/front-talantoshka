<script setup>
import authorsRequests from "@/requests/authorsRequests";
import { onBeforeMount, ref } from "vue";
import { useRouter } from 'vue-router';

import Modal from '@/components/Modal.vue';
import Text from '../components/Form/Text.vue';

let authors = ref([])

let createOrAddModalShow = ref(false)
let createOrUpdateModalShow = ref(false)
let requestItem = ref({});

onBeforeMount(async () => {
  getAllAuthors()
});

async function getAllAuthors() {
  let response = await authorsRequests.getAllAuthors();
  if (response && response.data) {
    authors.value = response.data;
  }
}
function update(ID) {
  createOrAddModalShow.value = true
  const foundAuthor = authors.value.find((author) => author._id === ID);
  if (foundAuthor) {
    requestItem.value = { ...foundAuthor };
  }
}
async function save() {
  let newAuthor = requestItem.value
  let newUpdateInfo = requestItem.value

  const updateData = {
    ...newUpdateInfo
  };

  if (requestItem.value._id) {
    try {
      const response = await authorsRequests.updateAuthor(requestItem.value._id, updateData);
      getAllAuthors()
    } catch (error) {
      console.error("Error updating author:", error);
    }
  }
  else {
    const authorData = {
      ...newAuthor,
    };
    let response = await authorsRequests.addAuthor(authorData);
    getAllAuthors()

  }
  createOrAddModalShow.value = false;

}

async function removeAuthor(ID) {
  let response = await authorsRequests.remove(ID);
  getAllAuthors()
}
const router = useRouter();

function authorDeteil(id) {
  router.push({ name: 'AuthorInfo', params: { id: id } })
}

//===============Modal================

function open() {
  createOrAddModalShow.value = true
  requestItem.value = {}
}
</script>
<template>
  <div class="container">
    <h1>Page Auhtors</h1>
    <Modal v-model="createOrAddModalShow" title="Add author" class="d-none">
      <Text v-model="requestItem.name" label="Namae"></Text>
      <Text v-model="requestItem.surname" label="Description"></Text>
      <Text v-model="requestItem.age" label="Old price"></Text>
      <Text v-model="requestItem.year" label="New Price"></Text>
      <Text v-model="requestItem.email" label="New Price"></Text>
      <button type="button" class="btn btn-primary" @click="save">Save</button><br>
    </Modal>
    <button class="btn btn-primary mt-5 mb-5" @click="open">Add author</button>
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
                  <th>Surname</th>
                  <th>Age</th>
                  <th>Year</th>
                  <th>Email</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="author in authors" :key="author._id">
                  <td>
                    <ul class="action-list">
                      <li>
                        <button class="btn  btn-danger" @click="removeAuthor(author._id)">delete</button>
                      </li>
                    </ul>
                  </td>
                  <td scope="row">{{ author._id }}</td>
                  <td>{{ author.name }}</td>
                  <td>{{ author.surname }}</td>
                  <td>{{ author.age }}</td>
                  <td>{{ author.year }}</td>
                  <td>{{ author.email }}</td>
                  <td>
                    <button class="btn btn-primary" @click="authorDeteil(author._id)">Views</button>
                  </td>
                  <td> <button class="btn btn-primary mt-5 mb-5" @click=" update(author._id)">Update</button>
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
