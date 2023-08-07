import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8080/protocol/upload";

class ProtocolService {


    createUser(protocol) {
        return axios.post(USER_API_BASE_URL, protocol);
    }

}

const instance = new ProtocolService();
export default instance;