import axios from 'axios';
import { logoutUser } from "./actionCreators";
import EnvData from '../../../config/EnvData';


export const logoutUserFromRedux = () => async (dispatch) => {
  dispatch(logoutUser());
};
export const getNewRefreshToken = async () => {
  try {
    const requestUrl = EnvData.REACT_APP_API_BASE_URL + 'token/refresh/';
    if (localStorage.loggedWyreUser) {
      const user = JSON.parse(localStorage.loggedWyreUser);
      const response = await axios.post(requestUrl, {
        refresh: user.refresh,
      });
      const newUser = { access: response.data.accces, ...user, }
      localStorage.setItem('loggedWyreUser',JSON.stringify(newUser));
    }
  } catch (error) {
    localStorage.clear();
    window.href = '/'
  }

};