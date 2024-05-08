import axios from 'axios';

const api = axios.create({
    baseURL: 'https://aiexplorer-go.onrender.com',
})


export default api;