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
async addAutor(author){
  try{
      const response=await axios().post('/author',author);
      return response;
  }catch(error){
      console.log("Ошибка",error)
  }
},
async updateAuthor(id,updateData){
  try{
  const response =await axios().put(`/author/${id}`,updateData)
  return response;
  }catch(error){
      console.log('Ошибка',error)
  }
},
async getAutorById(id){
  try{
      const response=await axios().get(`/author /${id}`)
      return response
  }catch(error){
      console.log('Ошибка',error)
  }
}
};
