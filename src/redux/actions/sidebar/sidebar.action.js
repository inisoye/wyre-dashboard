
import axios from "axios";
import EnvData from "../../../config/EnvData";
import { fetchSideBarLoading, fetchSideBarSuccess } from "./actionCreators";


export const fetchSideBar = () => async (dispatch) => {
  dispatch(fetchSideBarLoading());

  const loggedUserJSON = localStorage.getItem('loggedWyreUser');
  let userId;
  let token;
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    userId = user.data.id;
    token = user.data.id;
  }
  try {
    const response = await axios.get(
      `${EnvData.REACT_APP_API_URL}side_bar_data/${userId}`, {
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    );
    dispatch(fetchSideBarSuccess(response.data.authenticatedData));
    dispatch(fetchSideBarLoading(false))
  } catch (error) {
    dispatch(fetchSideBarLoading(error));
  }
};