import axios from 'axios';

const BASE_URL = 'http://localhost:5135/api/user';

export const getMe = (token) => {
    return axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getProfiles = (token) => {
    return axios.get(`${BASE_URL}/profiles`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const banUser = (userId, token) => {
    return axios.post(`${BASE_URL}/${userId}/ban`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateMe = (data, token) => {
    return axios.patch(`${BASE_URL}/me`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};