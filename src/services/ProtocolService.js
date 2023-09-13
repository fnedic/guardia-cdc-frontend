import axios from "axios";
import { getAuthToken } from "../helpers/axios_helper";

const USER_API_BASE_URL = "http://localhost:8080/protocol/";

const token = getAuthToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

class ProtocolService {
  createProtocol(protocol) {
    return axios
      .post(USER_API_BASE_URL + "upload", protocol, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        console.log("Código de estado:", error.response?.status);
        console.log("Mensaje de error:", error.message);
        throw error;
      });
  }

  getProtocol(id) {
    return axios
      .get(USER_API_BASE_URL + "view/" + id, config)
      .then((response) => {
        // console.log("Exito!", response.data);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        console.error("Error obteniendo protocolo!", err);
      });
  }

  protocolList() {
    return axios.get(USER_API_BASE_URL + "list", config);
  }

  mostViewedProtocol() {
    return axios.get(USER_API_BASE_URL + "mostviewed", config);
  }

  improveViews(id) {
    return axios.get(USER_API_BASE_URL + "mostviewed/" + id, config);
  }

  deleteProtocol(id) {
    return axios.get(USER_API_BASE_URL + "delete/" + id, config);
  }
}

const instance = new ProtocolService();
export default instance;
