
// const dashBoardType 

import costTrackerType from "../../reducers/costTracker/costTracker.types";

export const fetchCostTrackerLoading = (payload = true) => ({
  type: costTrackerType.FETCH_COSTTRACKER_LOADING,
  payload,
});

export const fetchCostTrackerSuccess = payload => ({
  type: costTrackerType.FETCH_COSTTRACKER_SUCCESS,
  payload,
});


export const fetchFuelDataLoading = (payload = true) => ({
  type: costTrackerType.FETCH_FUEL_CONSUMPTION_DATA_LOADING,
  payload,
});

export const fetchFuelDataSuccess = payload => ({
  type: costTrackerType.FETCH_FUEL_CONSUMPTION_DATA_SUCCESS,
  payload,
});

export const addFuelDataLoading = (payload = true) => ({
  type: costTrackerType.ADD_FUEL_CONSUMPTION_DATA_LOADING,
  payload,
});

export const addFuelDataSuccess = payload => ({
  type: costTrackerType.ADD_FUEL_CONSUMPTION_DATA_SUCCESS,
  payload,
});
