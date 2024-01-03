<script setup>
import authorsRequests from "@/requests/authorsRequests";
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const currentAuthor = ref([]);
const collections = ref([]);

const route = useRoute();

onBeforeMount(async () => {
    try {
        await getAuthorById();
        await getCollection();
    } catch (error) {
        console.error("Error during beforeMount:", error);
    }
});

async function getCollection() {
    const id = route.params.id;
    let response = await authorsRequests.getCollection(id);
    if (!response || !response.data || response.data.length === 0) {
        alert("У автора нет сборников");
    } else {
        collections.value = response.data;
    }
}
async function getAuthorById() {
    try {
        const id = route.params.id;
        let response = await authorsRequests.getAuthorById(id);

        if (response && response.data) {
            currentAuthor.value = response.data;
            console.log(response, "responsertert");
        } else {
            // Handle the case where response or response.data is undefined
            console.error("Error fetching author data. Response:", response);
        }
    } catch (error) {
        // Handle any errors that occurred during the API call
        console.error("Error fetching author data:", error);
    }
}


</script>


<template>
    <div class="container">
        <h1>Page Auhtors</h1>

        <!-- Rest of your code... -->

        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <div class="panel">
                    <div class="panel-body table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Age</th>
                                    <th>Year</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{{ currentAuthor._id }}</th>
                                    <td>{{ currentAuthor.name }}</td>
                                    <td>{{ currentAuthor.surname }}</td>
                                    <td>{{ currentAuthor.age }}</td>
                                    <td>{{ currentAuthor.year }}</td>
                                    <td>{{ currentAuthor.email }}</td>
                                </tr>

                            </tbody>
                            <h2>Collection</h2>

                            <thead class="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Новая цена</th>
                                    <th>Старая цена</th>
                                    <th>Автор</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="collection in collections" :key="collection._id">
                                    <th scope="row">{{ collection._id }}</th>
                                    <td>{{ collection.name }}</td>
                                    <td>{{ collection.description }}</td>
                                    <td>{{ collection.newPrice }}</td>
                                    <td>{{ collection.oldPrice }}</td>
                                    <td>{{ collection.author }}</td>
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
