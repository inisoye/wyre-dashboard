
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
