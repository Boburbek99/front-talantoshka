import axios from "@/services/axios.js";
export default {
    async getAllCollections() {
      try {
        const response = await axios().get("/collection");
        return response;
      } catch (error) {
        console.log("Ошибка", error);
      }
    },
   
    async getCollectionById(id) {
      try {
        const response = await axios().get(`/collection/${id}`);
        return response;
      } catch (error) {
        console.log("Ошибка", error);
      }
    },
    async addCollection(collection) {
      try {
        const response = await axios().post("/collection", collection);
        return response;
      } catch (error) {
        console.log("Ошибка", error);
      }
    },
    async removeCollection(id) {
      try {
        const response = await axios().delete(`/collection/${id}`);
        return response;
      } catch (error) {
        console.log("Ошибка", error);
      }
    },
    async updateCollection(id, updateData) {
      try {
        const response = await axios().put(`/collection/${id}`, updateData);
        return response;
       console.log("Ошибка", error);
     }catch (error) {
        console.log("Ошибка", error);
      }
     }
}
  