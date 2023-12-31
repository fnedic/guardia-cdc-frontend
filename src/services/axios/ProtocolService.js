import axios from "./axios_config";
import { getAuthToken } from "../axios/axios_helper.js";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const USER_API_BASE_URL = baseURL+"/protocol";
const VIDEO_API_BASE_URL = baseURL+"/video";
const PROCEDURE_API_BASE_URL = baseURL+"/procedure";
const NOTICE_API_BASE_URL = baseURL+"/notice";

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
    return axios.get(VIDEO_API_BASE_URL + "/get", config);
  }

  getVideoById(id) {
    return axios.get(VIDEO_API_BASE_URL + "/update/" + id, config);
  }

  updateVideo(id, video) {
    return axios.put(VIDEO_API_BASE_URL + "/update/" + id, video, config);
  }

  deleteVideo(id) {
    return axios.delete(VIDEO_API_BASE_URL + "/delete/" + id, config);
  }

  procedureList() {
    return axios.get(PROCEDURE_API_BASE_URL + "/list", config);
  }

  deleteProcedure(id) {
    return axios.get(PROCEDURE_API_BASE_URL + "/delete/" + id, config);
  }
  createNotice(notice) {
    return axios
      .post(NOTICE_API_BASE_URL + "/create", notice, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getNotice() {
    return axios.get(NOTICE_API_BASE_URL + "/get/", config);
  }
}

const instance = new ProtocolService();
export default instance;
