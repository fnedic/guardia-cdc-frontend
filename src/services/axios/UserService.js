import axios from "./axios_config";
import { getAuthToken } from "./axios_helper";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const USER_API_BASE_URL = baseURL+"/cdc/user";

const token = getAuthToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

class UserService {
  getUserList() {
    return axios.get(USER_API_BASE_URL, config);
  }

  createUser(user) {
    return axios.post(USER_API_BASE_URL, user, config);
  }
  getUserById(id) {
    return axios.get(USER_API_BASE_URL + "/" + id, config);
  }

  updateUser(id, user) {
    return axios.put(USER_API_BASE_URL + "/"+id, user, config);
  }

  deleteUser(id) {
    return axios.get(USER_API_BASE_URL + "/delete/" + id, config);
  }

  getUser() {
    return axios.get(USER_API_BASE_URL + "/role", config);
  }

  getProfile() {
    return axios.get(USER_API_BASE_URL + "/profile", config);
  }
}
const instance = new UserService();
export default instance;