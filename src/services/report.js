import axios from 'axios';
import deviceHttp from './devices';


const baseUrl = process.env.REACT_APP_API_URL;

const getAll = (userId, token, dateRange) => {
  const dateData = dateRange.length > 0 ? deviceHttp.convertDateRangeToEndpointFormat(dateRange) : deviceHttp.endpointDateRange
  const request = axios.get(`${baseUrl}get_reports/${userId}/${dateData}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }
  );
  return request.then((response) => response.data.data);
};

// eslint-disable-next-line
export default {
  getAll,
};
