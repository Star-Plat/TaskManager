// src/services/api.js

const API_URL = process.env.REACT_APP_API_BASE_URL;

const request = async (endpoint, method = 'GET', data = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API request failed');
  }

  return await response.json();
};

export default request;