import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://172.28.26.146:7070",
})
export default Axios