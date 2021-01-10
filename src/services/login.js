import axios from 'axios';
const baseUrl = 'https://wyre22.pythonanywhere.com//api/v1/auth/';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
