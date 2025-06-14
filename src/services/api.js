const baseURL = process.env.REACT_APP_API_BASE_URL;

const request = async (url, method = 'GET', data = null) => {
  if (!baseURL) {
    throw new Error('API base URL is not configured. Check your .env file.');
  }

  const fullUrl = `${baseURL}${url}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, options);
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }

if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
};
export default request;

/*const baseURL = process.env.REACT_APP_API_BASE_URL;

const request = async (url, method = 'GET', data = null) => {
  if (!baseURL) {
    throw new Error('API base URL is not configured. Check your .env file.');
  }

  const fullUrl = `${baseURL}${url}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, options);

  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }

  // Handle JSON or plain text response
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
};

export default request;
*/