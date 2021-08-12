import axios from 'axios';
const baseUrl = 'http://wyreng.xyz/api/v1/alerts_data';

const getAll = (userId, token) => {
  let requestUrl = `${baseUrl}/${userId}/`
  const request = axios.get(requestUrl, {
    headers:{
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
    }
  });
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
