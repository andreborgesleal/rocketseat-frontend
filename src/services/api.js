import axios from 'axios';
const api = axios.create({
    baseURL: "https://ohmnistack-backend.herokuapp.com"
})
export default api;