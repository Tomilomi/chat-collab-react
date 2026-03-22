import axios from 'axios';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/message`;

export const deleteMessage = (messageId, token) => {
    return axios.delete(`${API_URL}/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};