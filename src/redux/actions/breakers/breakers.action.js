
import EnvData from "../../../config/EnvData";
import {
  fetchBreakerLoading,
  fetchBreakerSuccess,
  toggleBreakerLoading,
  toggleBreakerSuccess,
} from "./actionCreators";
import { APIService } from "../../../config/api/apiConfig";



export const fetchBranhBreakers = (branchId) => async (dispatch) => {
  dispatch(fetchBreakerLoading());

  try {

    const response = await APIService.get(`${EnvData.REACT_APP_API_URL}all_acb/${branchId}/`);
    dispatch(fetchBreakerSuccess(response.data));
    dispatch(fetchBreakerLoading(false))
  } catch (error) {
    dispatch(fetchBreakerLoading(error));
  }
};

export const toggleBreaker = (body) => async (dispatch) => {
  dispatch(toggleBreakerLoading());

  try {

    const response = await APIService.post(`${EnvData.REACT_APP_API_URL}toggle_acb/`, body);
    dispatch(toggleBreakerSuccess(response.data));
    dispatch(toggleBreakerLoading(false))
  } catch (error) {
    dispatch(toggleBreakerLoading(error));
  }
};