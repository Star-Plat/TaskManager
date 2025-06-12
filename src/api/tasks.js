import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/tasks',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTasks = () => API.get('/allTasks');
export const createTask = (task) => API.post('/newTask', task);
export const updateTask = (id, task) => API.put(`/${id}`, task);
export const deleteTask = (id) => API.delete(`/${id}`);
