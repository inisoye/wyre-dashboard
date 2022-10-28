
import {
  fetchCostTrackerLoading, fetchCostTrackerSuccess, addFuelDataSuccess,
  fetchFuelDataLoading, fetchFuelDataSuccess, addFuelDataLoading
} from "./actionCreators";
import { APIService } from "../../../config/api/apiConfig";
import jwtDecode from "jwt-decode";


export const fetchCostTrackerData = () => async (dispatch) => {
  dispatch(fetchCostTrackerLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  if (loggedUserJSON) {
    const userToken = JSON.parse(loggedUserJSON);
    const user = jwtDecode(userToken.access)
    userId = user.id;
  }
  const requestUrl = `cost_tracker_overview/${userId}`;
  try {
    const response = await APIService.get(requestUrl);
    dispatch(fetchCostTrackerSuccess(response.data.data));
    dispatch(fetchCostTrackerLoading(false))
  } catch (error) {
    dispatch(fetchCostTrackerLoading(false));
  }
};


export const fetchFuelConsumptionDataOLd = (queryString) => async (dispatch) => {
  dispatch(fetchFuelDataLoading());
  const requestUrl = `fuel_entry?${queryString}`;
  try {
    const response = await APIService.get(requestUrl);
    dispatch(fetchFuelDataSuccess(response.data.data));
    dispatch(fetchFuelDataLoading(false))
    return {
      fullfilled: true,
      data: response.data
    }
  } catch (error) {
    dispatch(fetchFuelDataLoading(false));
  }
};
export const fetchFuelConsumptionData = (queryString) => async (dispatch) => {
  console.log('calling the first end point ==========>>>>>>>', )
  dispatch(fetchFuelDataLoading());
  const requestUrl = `diesel_tracker_overview/${queryString}`;
  try {
    const response = await APIService.get(requestUrl);
    dispatch(fetchFuelDataSuccess(response.data.data));
    dispatch(fetchFuelDataLoading(false))
    return {
      fullfilled: true,
      data: response.data.data
    }
  } catch (error) {
    dispatch(fetchFuelDataLoading(false));
  }
};

export const addFuelConsumptionData = (parameters) => async (dispatch) => {
  dispatch(addFuelDataLoading());
  const requestUrl = `fuel_entry`;
  try {
    const response = await APIService.post(requestUrl, parameters);
    dispatch(addFuelDataSuccess(response.data.data));
    dispatch(addFuelDataLoading(false))
    return { fullfilled: true, message: response.data.detail }
  } catch (error) {
    dispatch(addFuelDataLoading(false));
    console.log('this is the response data on errorerrorerror', error.response);
    return { fullfilled: false, message: error.response.detail }
  }
};