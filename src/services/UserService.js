import axios from "axios";
import { getAuthToken } from "../helpers/axios_helper";
const USER_API_BASE_URL = "http://localhost:8080/cdc/user";

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
  getUserById(userId) {
    return axios.get(USER_API_BASE_URL + "/" + userId, config);
  }

  updateUser(userId, user) {
    return axios.put(USER_API_BASE_URL + "/" + userId, user, config);
  }

  deleteUser(id) {
    return axios.get(USER_API_BASE_URL + "/delete/" + id, config);
  }

  getRole() {
    return axios.get(USER_API_BASE_URL + "/role", config);
  }
}
const instance = new UserService();
export default instance;
