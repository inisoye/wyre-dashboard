import axios from 'axios';
import EnvData from '../config/EnvData';


const add = (newObject) => {
  const request = axios.post(`${EnvData.REACT_APP_API_URL}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line
export default {
  add
};
