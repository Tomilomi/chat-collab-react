import axios from 'axios';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/user`;

export const getMe = (token) => axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });
export const getProfiles = (token) => axios.get(`${API_URL}/profiles`, { headers: { Authorization: `Bearer ${token}` } });
export const banUser = (userId, token) => axios.post(`${API_URL}/${userId}/ban`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const updateMe = (data, token) => axios.patch(`${API_URL}/me`, data, { headers: { Authorization: `Bearer ${token}` } });