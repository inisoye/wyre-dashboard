import axios from 'axios';
import dayjs from 'dayjs';

let endpointDateRange = [dayjs().subtract(1, 'months'), dayjs()];

const convertDateRangeToEndpointFormat = (dateObjects) => {
  const formattedDates = dateObjects.map((eachDateObject) =>
    eachDateObject.format('DD-MM-YYYY')
  );

  return formattedDates;
};
// console.log(convertDateRangeToEndpointFormat(endpointDateRange));

const updateEndpointDateRange = (userInputtedDateRange) => {
  console.log(userInputtedDateRange);
};

updateEndpointDateRange();

const baseUrl =
  'https://wyre22.pythonanywhere.com//api/v1/dashboard/2/01-12-2020%2000:00/20-12-2020%2000:00';

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

export default { getAllData, setToken, updateEndpointDateRange };
