import UserService from "../services/UserService.js"

export const UseUser = async () => { // Declara la función como async
    
    try {
      const response = await UserService.getUser();
      return response.data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return "";
    }
  };