

import {  logoutUser } from "./actionCreators";


export const logoutUserFromRedux = () => async (dispatch) => {
  dispatch(logoutUser());
};