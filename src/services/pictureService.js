import axios from 'axios';

const BASE_URL = 'http://localhost:5135/api/picture';

export const getPictures = (token) => {
    return axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
};