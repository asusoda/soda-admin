import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Your Flask API base URL
});

// Attach token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
