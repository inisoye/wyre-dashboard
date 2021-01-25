import axios from 'axios';
const baseUrl = 'http://localhost:3005/alertsAndAlarms';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = (newObject) => {
  const request = axios.put(baseUrl, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line
export default {
  getAll,
  update,
};
