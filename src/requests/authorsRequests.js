import axios from "@/services/axios.js";
export default {
  async getAllAuthors() {
    try {
      const response = await axios().get("/author");
      return response;
    } catch (error) {
      console.log("Ошибка", error);
    }
  },
  async addAuthor(author) {
    try {
      const response = await axios().post('/author', author);
      return response;
    } catch (error) {
      console.log("Ошибка", error)
    }
  },
  async updateAuthor(id, updateData) {
    try {
      const response = await axios().put(`/author/${id}`, updateData)
      return response;
    } catch (error) {
      console.log('Ошибка', error)
    }
  },
  async getAuthorById(id) {
    try {
      const response = await axios().get(`/author/${id}`);
      return response;
    } catch (error) {
      console.log("Ошибка", error)
    }
  },
  async remove(id) {
    try {
      const response = await axios().delete(`/author/${id}`)
      return response
    } catch (error) {
      console.log('Ошибка', error)
    }
  },
  async getCollection(id) {
    try {
      const response = await axios().get(`/author/${id}/collection`);
      return response;
    } catch (error) {
      console.log("Ошибка", error)

    }
  }

};
