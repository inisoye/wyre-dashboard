
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

export const fetchDemandLoading = (payload = true) => ({
    type: dashBoardType.FETCH_DEMAND_LOADING,
    payload,
  });
  
export const fetchDemandSuccess = payload => ({
    type: dashBoardType.FETCH_DEMAND_SUCCESS,
    payload,
  });

export const fetchBlendedCostEnergyLoading = (payload = true) => ({
    type: dashBoardType.FETCH_BLENDEDCOST_ENERGY_LOADING,
    payload,
  });
  
export const fetchBlendedCostEnergySuccess = payload => ({
    type: dashBoardType.FETCH_BLENDEDCOST_ENERGY_SUCCESS,
    payload,
  });
  