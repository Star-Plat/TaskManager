// src/api/auth.js

import axios from 'axios';

console.log('API base URL:', process.env.REACT_APP_API_BASE_URL);

// Get the base URL from environment variables
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Auth API methods
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
