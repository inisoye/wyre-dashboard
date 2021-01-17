import axios from 'axios';
import dayjs from 'dayjs';

const convertDateRangeToEndpointFormat = (dateObjects) =>
  dateObjects
    .map((eachDateObject) => eachDateObject.format('DD-MM-YYYY HH:mm'))
    .join('/');

const defaultEndpointDateRange = convertDateRangeToEndpointFormat([
  dayjs().subtract(1, 'months'),
  dayjs(),
]);

let baseUrl = `https://wyre22.pythonanywhere.com//api/v1/dashboard/2/${defaultEndpointDateRange}`;

let userDefinedEndpointDateRange = undefined;

const updateUserDefinedEndpointDateRange = (userInputtedDateRange) => {
  userDefinedEndpointDateRange = convertDateRangeToEndpointFormat(
    userInputtedDateRange
  );

  baseUrl = `https://wyre22.pythonanywhere.com//api/v1/dashboard/2/${userDefinedEndpointDateRange}`;
};

let token = undefined;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllData = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data.authenticatedData;
};

export default { getAllData, setToken, updateUserDefinedEndpointDateRange };
