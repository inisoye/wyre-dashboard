
import sidebarTypes from "../../reducers/sidebar/sidebarTypes";

export const fetchSideBarLoading = (payload = true) => ({
    type: sidebarTypes.FETCH_SIDEBAR_LOADING,
    payload,
  });
  
  export const fetchSideBarSuccess = payload => ({
    type: sidebarTypes.FETCH_SIDEBAR_SUCCESS,
    payload,
  });
  