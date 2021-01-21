import axios from 'axios';
import dayjs from 'dayjs';

let parametersDataTimeInterval = 'hourly';

const updateUserDefinedParametersDataTimeInterval = (
  userDefinedParametersDataTimeInterval
) => {
  parametersDataTimeInterval = userDefinedParametersDataTimeInterval;
};

const convertDateRangeToEndpointFormat = (dateObjects) =>
  dateObjects
    .map((eachDateObject) => eachDateObject.format('DD-MM-YYYY HH:mm'))
    .join('/');

let today = dayjs()
let day_of_the_month = today.get('date')
let start_date = today.subtract(day_of_the_month, 'days')

const defaultEndpointDateRange = convertDateRangeToEndpointFormat([
  
  start_date,
  today,
]);

// let baseUrl = `https://wyre22.pythonanywhere.com//api/v1/dashboard/2/${defaultEndpointDateRange}`;
let baseUrl = `https://wyreng.xyz/api/v1/dashboard/2/${defaultEndpointDateRange}/hourly`;
// let baseUrl = `http://localhost:8000/api/v1/dashboard/2/${defaultEndpointDateRange}/hourly`;

let userDefinedEndpointDateRange = undefined;

const updateUserDefinedEndpointDateRange = (userInputtedDateRange) => {
  userDefinedEndpointDateRange = convertDateRangeToEndpointFormat(
    userInputtedDateRange
  );

  baseUrl = `https://wyreng.xyz/api/v1/dashboard/2/${userDefinedEndpointDateRange}/hourly`;
  // baseUrl = `http://localhost:8000/api/v1/dashboard/2/${userDefinedEndpointDateRange}/hourly`;
};

let token = undefined;
let userId = undefined;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const setUserId = (newUserId) => {
  userId = `${newUserId}`;
};

const getAllData = async () => {
  // Add interval to url
  // baseUrl = `${baseUrl}/${parametersDataTimeInterval}`;

  console.log(`${baseUrl}/${parametersDataTimeInterval}`);

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data.authenticatedData;
};

export default {
  getAllData,
  setToken,
  setUserId,
  updateUserDefinedEndpointDateRange,
  updateUserDefinedParametersDataTimeInterval,
};
