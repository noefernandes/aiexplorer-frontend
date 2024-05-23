import axios from 'axios';

const api = axios.create({
    baseURL: 'https://aiexplorer-go.onrender.com',
    //baseURL: 'http://localhost:9000',
})


export default api;