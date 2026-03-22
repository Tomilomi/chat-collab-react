import axios from 'axios';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/picture`;

export const getPictures = (token) => {
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
};