import axios from "@/services/axios.js";
export default {
async login(user) {
  try {
    const response = await axios().post("/login",user);
    return response;
  } catch (error) {
    console.log("Ошибка", error);
  }
},
async registration(user){
  try{
      const response=await axios().post('/registration',user);
      return response;
  }catch(error){
      console.log("Ошибка",error)
  }
}
}