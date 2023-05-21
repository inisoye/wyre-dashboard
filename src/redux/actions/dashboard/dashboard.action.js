
import axios from "axios";
import EnvData from "../../../config/EnvData";
import {
  fetchDashBoardLoading, fetchDemandSuccess,
  fetchDashBoardSuccess, fetchDemandLoading, fetchBlendedCostEnergyLoading, fetchBlendedCostEnergySuccess
} from "./actionCreators";
import dataHttpServices from '../../../services/devices';
import moment from 'moment';
import jwtDecode from "jwt-decode";


export const fetchDashBoardData = (userDateRange) => async (dispatch) => {
  dispatch(fetchDashBoardLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  let token;
  const dateToUse = userDateRange && userDateRange.length > 0 ? `${moment(userDateRange[0]).format('DD-MM-YYYY HH:mm') + '/' + moment(userDateRange[1]).format('DD-MM-YYYY HH:mm')}` : dataHttpServices.endpointDateRange
  if (loggedUserJSON) {
    const userToken = JSON.parse(loggedUserJSON);
    const user = jwtDecode(userToken.access)
    userId = user.id;
    token = userToken.access;
  }
  try {
    const response = await axios.get(
      `${EnvData.REACT_APP_API_URL}dashboard_data/${userId}/${dateToUse}/${dataHttpServices.endpointDataTimeInterval}`, {
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    );
    dispatch(fetchDashBoardSuccess(response.data.authenticatedData));
    dispatch(fetchDashBoardLoading(false))
  } catch (error) {
    dispatch(fetchDashBoardLoading(error));
  }
};

export const fetchBlendedCostData = (userDateRange) => async (dispatch) => {
  dispatch(fetchBlendedCostEnergyLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  let token;
  const dateToUse = userDateRange && userDateRange.length > 0 ? `${moment(userDateRange[0]).format('DD-MM-YYYY HH:mm') + '/' + moment(userDateRange[1]).format('DD-MM-YYYY HH:mm')}` : dataHttpServices.endpointDateRange
  if (loggedUserJSON) {
    const userToken = JSON.parse(loggedUserJSON);
    const user = jwtDecode(userToken.access)
    userId = user.id;
    token = userToken.access;
  }
  try {
    const response = await axios.get(
      `${EnvData.REACT_APP_API_URL}blended_cost/${userId}/${dateToUse}/`, {
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    );
    dispatch(fetchBlendedCostEnergySuccess(response.data.data));
    dispatch(fetchBlendedCostEnergyLoading(false))
  } catch (error) {
    dispatch(fetchBlendedCostEnergyLoading(error));
  }
};

export const fetchPAPR = (userDateRange) => async (dispatch) => {
  dispatch(fetchDemandLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  let token;
  const dateToUse = userDateRange && userDateRange.length > 0 ? `${moment(userDateRange[0]).format('DD-MM-YYYY HH:mm') + '/' + moment(userDateRange[1]).format('DD-MM-YYYY HH:mm')}` : dataHttpServices.endpointDateRange
  if (loggedUserJSON) {
    const userToken = JSON.parse(loggedUserJSON);
    const user = jwtDecode(userToken.access)
    userId = user.id;
    token = userToken.access;
  }
  try {
    const response = await axios.get(
      `${EnvData.REACT_APP_API_URL}branch_demand/${userId}/${dateToUse}`, {
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    );
    dispatch(fetchDemandSuccess(response.data.data));
    dispatch(fetchDemandLoading(false))
  } catch (error) {
    dispatch(fetchDemandLoading(error));
  }
};