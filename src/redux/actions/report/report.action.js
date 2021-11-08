
import EnvData from "../../../config/EnvData";
import { fetchReportLoading, fetchReportSuccess } from "./actionCreators";
import { APIService } from "../../../config/api/apiConfig";


export const fetchReportData = () => async (dispatch) => {
  dispatch(fetchReportLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    userId = user.data.id;
  }
  const requestUrl = `${EnvData.REACT_APP_API_URL}get_reports/${userId}/`;
  try {
    const response = await APIService.get(requestUrl);
    dispatch(fetchReportSuccess(response.data.data));
    dispatch(fetchReportLoading(false));
  } catch (error) {
    dispatch(fetchReportLoading(false));
  }
};