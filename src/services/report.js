import axios from 'axios';
const baseUrl = 'http://localhost:3006/reportData';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// eslint-disable-next-line
export default {
  getAll,
};
