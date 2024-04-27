import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://academics.newtonschool.co/api/v1/reddit',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.projectId = 't0v7xsdvt1j1'; // Your project ID

    // Check if the data is FormData (you can implement your own logic here)
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
