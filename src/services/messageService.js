import axios from 'axios';

const BASE_URL = 'http://localhost:5135/api/message';

export const deleteMessage = (messageId, token) => {
    return axios.delete(`${BASE_URL}/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};