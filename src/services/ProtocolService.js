import axios from "axios";
import { getAuthToken } from "../helpers/axios_helper";

const USER_API_BASE_URL = "http://localhost:8080/protocol";
const VIDEO_API_BASE_URL = "http://localhost:8080/video";

const token = getAuthToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

class ProtocolService {
  createProtocol(protocol) {
    return axios
      .post(USER_API_BASE_URL + "/upload", protocol, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getProtocol(id) {
    return axios
      .get(USER_API_BASE_URL + "/view/" + id, config)
      .then((response) => {
        // console.log("Exito!", response.data);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        console.error("Error obteniendo protocolo!", err);
      });
  }

  protocolList() {
    return axios.get(USER_API_BASE_URL + "/list", config);
  }

  mostViewedProtocol() {
    return axios.get(USER_API_BASE_URL + "/mostviewed", config);
  }

  improveViews(id) {
    return axios.get(USER_API_BASE_URL + "/mostviewed/" + id, config);
  }

  deleteProtocol(id) {
    return axios.get(USER_API_BASE_URL + "/delete/" + id, config);
  }

  createVideo(video) {
    return axios
      .post(VIDEO_API_BASE_URL + "/register", video, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  videoList() {
    return axios.get(VIDEO_API_BASE_URL+"/get", config);
  }

  deleteVideo(id) {
    return axios.post(VIDEO_API_BASE_URL+"/delete/" + id, config);
  }
}

const instance = new ProtocolService();
export default instance;
