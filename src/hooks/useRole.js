import UserService from "../services/UserService.js"

export const UseRole = async () => { // Declara la función como async
    
    try {
      const response = await UserService.getRole(); // Espera la respuesta del servicio
      return response.data; // Retorna el valor actualizado
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return ""; // En caso de error, puedes retornar un valor por defecto o manejar el error de otra manera
    }
  };