import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/', // Adjust if your backend uses a different path
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);