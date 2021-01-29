import axios from 'axios';
const baseUrl = 'https://wyreng.xyz/api/v1/auth/';
// let baseUrl = `http://localhost:8000/api/v1/auth/`;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

// eslint-disable-next-line
export default { login };
