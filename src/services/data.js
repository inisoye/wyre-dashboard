import axios from 'axios';
const baseUrl = 'https://api.jsonbin.io/b/5fd7cf1dbef8b7699e5995e4';

const getAuthenticated = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.authenticatedData);
};

export default { getAuthenticated };
