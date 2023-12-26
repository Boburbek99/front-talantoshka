<script setup>
  import authorsRequests from "@/requests/authorsRequests";
  import { onBeforeMount, ref } from "vue";

  let authors=ref([])
  let authorInfo=ref({})
  
  onBeforeMount(async () => {
    getAllAuthors()
  });

  async function getAllAuthors() {
    let response = await authorsRequests.getAllAuthors();
    if (response && response.data) {
      authors.value = response.data;
    }
  }


  async function addAutor() {
    const authorAdd = authorInfo.value;
    const authorData = {
      ...authorAdd,
    };
    let response = await authorsRequests.addAutor(authorData);
    getAllAuthors()
  }
  
</script>
<template>
  <div class="container">
    <h1>Page Auhtors</h1>
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
          <input type="text"   class="form-control form-control-lg"   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  v-model="authorInfo.name"  />
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Surname</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="authorInfo.surname"
          />
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Age</span>
          <input  type="text"   class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="authorInfo.age" />
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Year</span>
          <input type="text" class="form-control" aria-label="Sizing example input"     aria-describedby="inputGroup-sizing-sm" v-model="authorInfo.year" />
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
          <input type="Email" class="form-control"  aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-sm" v-model="authorInfo.email" />
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="addAuthor">Add</button><br>

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
                        <button class="btn  btn-danger" >delete</button>
                      </li>
                    </ul>
                   </td>         
                    <th scope="row">{{ author._id }}</th>
                    <td>{{ author.name }}</td>
                    <td>{{ author.surname }}</td>
                    <td>{{ author.age }}</td>
                    <td>{{ author.year }}</td>
                    <td>{{ author.email }}</td>
                    <td>
                      <button class="btn btn-primary">Views</button> 
                  </td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-4">
        <select class="form-select form-select-sm" aria-label="Small select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
      </div>
    
    
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
          <input type="text"   class="form-control form-control-lg"   aria-label="Sizing example input" aria-describedby="inputGroup-sizing"  />
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Surname</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
    
   
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Age</span>
          <input  type="text"   class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
    </div>
   
    <div class="row mb-3">
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Year</span>
          <input type="text" class="form-control" aria-label="Sizing example input"     aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
   
      <div class="col-sm-4">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
          <input type="Email" class="form-control"  aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary">Update</button><br>

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
