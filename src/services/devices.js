import axios from 'axios';
const baseUrl = 'http://localhost:3001/authenticatedData';
const baseUrlNew =
  'https://wyre22.pythonanywhere.com/api/v1/dashboard/2/01-12-2020%2000:00/20-12-2020%2000:00';

let token = undefined;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAuthenticated = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getAllData = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrlNew, config);
  return response.data.authenticatedData;
};

export default { getAuthenticated, getAllData, setToken };
