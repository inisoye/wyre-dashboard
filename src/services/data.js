import axios from 'axios';
const baseUrl = 'https://dtekluva.github.io/weather_app/authenticatedData.json';

const getAuthenticated = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.authenticatedData);
};

export default { getAuthenticated };
