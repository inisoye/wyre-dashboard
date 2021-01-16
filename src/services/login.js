import axios from 'axios';
const baseUrl = 'https://localhost:8000/api/v1/auth/';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
