import axios from 'axios';

console.log('API base URL:', process.env.REACT_APP_API_BASE_URL);

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTasks = () => API.get('tasks/allTasks');
export const createTask = (task) => API.post('tasks/newTask', task);
export const updateTask = (id, task) => API.put(`tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`tasks/${id}`);
