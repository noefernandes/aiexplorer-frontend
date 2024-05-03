import axios from 'axios';

const api = axios.create({
    baseURL: 'http://aiexplorer-go.onrender.com',
})


export default api;