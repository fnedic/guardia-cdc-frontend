import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/protocol/";

class ProtocolService {
  createProtocol(protocol) {
    return axios.post(USER_API_BASE_URL+"upload", protocol)
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

  getProtocol(id) {
    return axios.get(USER_API_BASE_URL+"view/"+id)
      .then((response) => {
        // console.log("Exito!", response.data);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        console.error("Error obteniendo protocolo!", err);
      });
  }

  protocolList() {
    return axios.get(USER_API_BASE_URL+"list");
  }

  mostViewedProtocol () {
    return axios.get(USER_API_BASE_URL+"mostviewed");
  }

  improveViews (id) {
    return axios.post(USER_API_BASE_URL+"mostviewed/"+id);
  }

  deleteProtocol(id) {
    return axios.get(USER_API_BASE_URL+"delete/"+id);
  }
}

const instance = new ProtocolService();
export default instance;