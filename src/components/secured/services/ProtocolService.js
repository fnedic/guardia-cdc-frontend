import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/protocol/upload";

class ProtocolService {
  createUser(protocol) {
    return axios.post(USER_API_BASE_URL, protocol)
      .then(response => {
        // Procesar la respuesta exitosa aquí si lo deseas
        console.log('Respuesta exitosa:', response.data);
        return response.data; // Puedes retornar la respuesta si es necesario
      })
      .catch(error => {
        // Manejar el error aquí
        console.error('Error en la solicitud:', error);

        // Puedes obtener más información sobre el error
        // Accediendo a las propiedades del objeto error
        console.log('Código de estado:', error.response?.status);
        console.log('Mensaje de error:', error.message);

        // Lanza el error nuevamente para que pueda ser manejado en el componente que llama a esta función
        throw error;
      });
  }
}

const instance = new ProtocolService();
export default instance;
