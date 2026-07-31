import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3004/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token || localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['x-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (error.response?.data?.msg?.toLowerCase().includes('token') || 
          error.response?.data?.msg?.toLowerCase().includes('privilegios')) {
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
