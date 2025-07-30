// api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
  
    if (token) {
      config.headers.Authorization = token;
    }

    // Handle FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    // Log headers for debugging
    console.log('Request Headers:', config.headers);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const API = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url)
};

export default API;