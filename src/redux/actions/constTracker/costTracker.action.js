
import EnvData from "../../../config/EnvData";
import { fetchCostTrackerLoading, fetchCostTrackerSuccess } from "./actionCreators";
import { APIService } from "../../../config/api/apiConfig";


export const fetchCostTrackerData = () => async (dispatch) => {
  dispatch(fetchCostTrackerLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    userId = user.data.id;
  }
  const requestUrl = `${EnvData.REACT_APP_API_URL}cost_tracker_overview/${userId}/`;
  try {
    const response = await APIService.get(requestUrl);
    dispatch(fetchCostTrackerSuccess(response.data.data));
    dispatch(fetchCostTrackerLoading(false))
  } catch (error) {
    dispatch(fetchCostTrackerLoading(false));
  }
};