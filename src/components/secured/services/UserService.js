import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8080/cdc/user";

class UserService {


    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

}

const instance = new UserService();
export default instance;