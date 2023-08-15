import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8080/cdc/user";

class UserService {

    getUser() {
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }
    getUserById(userId){
        return axios.get(USER_API_BASE_URL +'/' + userId);
    }

    updateUser(userId, user) {
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }
}
const instance = new UserService();
export default instance;