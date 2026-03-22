import axios from 'axios';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/auth`;

export const register = (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};