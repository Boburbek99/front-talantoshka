import axios from "@/services/axios.js";
export default {
  async login(user) {
    try {
      const response = await axios().post("/login", user);
      return response;
    } catch (error) {
      console.log("Ошибка", error);
    }
  },
  async register(user) {
    try {
      const response = await axios().post("/register", user);
      return response;
    } catch (error) {
      console.log("Ошибка", error);
    }
  },
  async admin() {
    try {
      const response = await axios().get("/admin");
      return response;
    } catch (error) {
      console.log("Ошибка", error);
    }
  },
};
