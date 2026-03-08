import axios from 'axios';

const BASE_URL = 'http://localhost:5135/api/user';

export const getMe = (token) => {
    return axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};