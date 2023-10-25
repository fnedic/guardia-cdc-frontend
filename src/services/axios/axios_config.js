import axios from "axios";
import { setAuthHeader } from "./axios_helper";

axios.defaults.baseURL = "https://guardiacdc-backend.zeabur.app"; // URL backend

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 500) {
      setAuthHeader(null);
      alert("Tu sesión ha caducado. Por favor, inicia sesión nuevamente.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
