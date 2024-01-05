import axios from "@/services/axios.js";
export default {
    async getAllTags() {
        try {
            const response = await axios().get("/tags");
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },

    async getTagById(id) {
        try {
            const response = await axios().get(`/tag/${id}`);
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },
    async addTag(collection) {
        try {
            const response = await axios().post("/tag", collection);
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },
    async removeTag(id) {
        try {
            const response = await axios().delete(`/tag/${id}`);
            return response;
        } catch (error) {
            console.log("Ошибка", error);
        }
    },
    async updateTag(id, updateData) {
        try {
            const response = await axios().put(`/tag/${id}`, updateData);
            return response;
            console.log("Ошибка", error);
        } catch (error) {
            console.log("Ошибка", error);
        }
    }
}