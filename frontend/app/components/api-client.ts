import axios from "axios";
import useUserStore from "./useUserStore";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://16.171.173.72:8000/api';

const apiClient = axios.create({
    baseURL: 'http://16.171.16.29:8000/api'
});
// baseURL: 'http://13.48.78.236:8000/api'
// baseURL: 'http://localhost:8000/api'

// Authenticated client
const authApiClient = axios.create({
    baseURL: 'http://16.171.16.29:8000/api',
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
