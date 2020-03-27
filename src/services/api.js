import axios from 'axios';

const localUrl = 'http://localhost:3333';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URI || localUrl,
});

export default api;