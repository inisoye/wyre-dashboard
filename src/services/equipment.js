import axios from 'axios'

const baseUrl = 'http://localhost:3002/equipment';

const getAll = (userId, token, branchId) => {
  const request = axios.get(`http://wyreng.xyz/api/v1/equipments/${userId}/`,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  });
  return request.then((response) => response);
};

const add = async (newObject, branch_id, userId, token) => {
  const request = axios.post(`http://wyreng.xyz/api/v1/branch/${branch_id}/${userId}/add_equipment/`, newObject, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  });
  const response = await request;
  return response.data;
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

const update = (id, branchId ,newObject,equipment_id) => {
  const request = axios.post(`${baseUrl}/branch/${branchId}/${id}/edit_equipment/${equipment_id}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line
export default {
  getAll,
  add,
  del,
  update,
};
