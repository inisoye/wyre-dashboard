import axios from 'axios';
const baseUrl = 'http://localhost:3004';

const getAll = (dataType) => {
  const request = axios.get(`${baseUrl}/${dataType}`);
  return request.then((response) => response.data);
};

const add = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  add,
  del,
  update,
};
