
import powerFactorTypes from "../../reducers/powerFactor/powerFactor.type";

export const fetchPowerFactorLoading = (payload = true) => ({
    type: powerFactorTypes.FETCH_POWER_FACTOR_LOADING,
    payload,
  });
  
  export const fetchPowerFactorSuccess = payload => ({
    type: powerFactorTypes.FETCH_POWER_FACTOR_SUCCESS,
    payload,
  });
  