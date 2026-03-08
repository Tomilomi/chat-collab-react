import axios from 'axios';

const BASE_URL = 'http://localhost:5135/api/auth';

export const register = (username, password) => {
    return axios.post(`${BASE_URL}/register`, { username, password });
};

export const login = (username, password) => {
    return axios.post(`${BASE_URL}/login`, { username, password });
};