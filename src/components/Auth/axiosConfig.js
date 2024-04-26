import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://academics.newtonschool.co/api/v1/reddit',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.projectId = 't0v7xsdvt1j1'; // Your project ID
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
