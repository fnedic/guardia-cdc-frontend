import axios from "axios";
import { setAuthHeader } from "./axios_helper";

const baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL = baseURL;

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
