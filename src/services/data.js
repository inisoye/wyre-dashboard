import axios from 'axios';
const baseUrl = 'http://localhost:3001/authenticatedData';

const getAuthenticated = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAuthenticated };
