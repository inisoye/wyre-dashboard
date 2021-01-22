import axios from 'axios';
const baseUrl = 'http://localhost:3003';

const getAll = (dataType) => {
  const request = axios.get(`${baseUrl}/${dataType}`);
  return request.then((response) => response.data);
};

const add = (newObject, dataType) => {
  const request = axios.post(`${baseUrl}/${dataType}`, newObject);
  return request.then((response) => response.data);
};

const del = (dataType, id) => {
  const request = axios.delete(`${baseUrl}/${dataType}/${id}`);
  return request.then((response) => response);
};

const update = (newObject, dataType, id) => {
  const request = axios.put(`${baseUrl}/${dataType}/${id}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line
export default {
  getAll,
  add,
  del,
  update,
};
