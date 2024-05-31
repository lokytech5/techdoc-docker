import axios from "axios";
import useUserStore from "./useUserStore";

const url = process.env.URL_FRONTEND

const apiClient = axios.create({
    baseURL: url
});
// baseURL: 'http://13.48.78.236:8000/api'
// baseURL: 'http://localhost:8000/api'

// Authenticated client
const authApiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
      }
});

authApiClient.interceptors.request.use((config) => {
    const { token } =  useUserStore.getState();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { apiClient, authApiClient };
