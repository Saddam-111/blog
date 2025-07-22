// src/context/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Make sure it's defined in your .env
});

export default axiosInstance;
