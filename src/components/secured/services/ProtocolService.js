import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/protocol/upload";

class ProtocolService {
  createUser(protocol) {
    return axios.post(USER_API_BASE_URL, protocol)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        console.log('Código de estado:', error.response?.status);
        console.log('Mensaje de error:', error.message);
        throw error;
      });
  }

  getProtocol() {
    return axios.get("http://localhost:8080/protocol/view")
      .then((response) => {
        // console.log("Exito!", response.data);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        console.error("Error obteniendo protocolo!", err);
      });
  }
}

const instance = new ProtocolService();
export default instance;
