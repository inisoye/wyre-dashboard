
// const dashBoardType 

import breakerType from "../../reducers/breakers/breakers.type";

export const fetchBreakerLoading = (payload = true) => ({
    type: breakerType.FETCH_BREAKER_LOADING,
    payload,
  });
  
  export const fetchBreakerSuccess = payload => ({
    type: breakerType.FETCH_BREAKER_SUCCESS,
    payload,
  });
export const toggleBreakerLoading = (payload = true) => ({
    type: breakerType.TOGGLE_BREAKER_LOADING,
    payload,
  });
  
  export const toggleBreakerSuccess = payload => ({
    type: breakerType.TOGGLE_BREAKER_SUCCESS,
    payload,
  });

  