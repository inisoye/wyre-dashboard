
// const dashBoardType 

import dashBoardType from "../../reducers/dashboard/dashboard.types";

export const fetchDashBoardLoading = (payload = true) => ({
    type: dashBoardType.FETCH_DASHBOARD_LOADING,
    payload,
  });
  
  export const fetchDashBoardSuccess = payload => ({
    type: dashBoardType.FETCH_DASHBOARD_SUCCESS,
    payload,
  });
  