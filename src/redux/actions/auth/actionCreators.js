


import authTypes from "../../reducers/auth/auth.types";

export const logoutUser = (payload = true) => ({
    type: authTypes.LOGOUT_USER,
    payload,
  });
  
  