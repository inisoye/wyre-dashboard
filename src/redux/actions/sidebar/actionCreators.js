
import sidebarTypes from "../../reducers/sidebar/sidebar.types";

export const fetchSideBarLoading = (payload = true) => ({
    type: sidebarTypes.FETCH_SIDEBAR_LOADING,
    payload,
  });
  
  export const fetchSideBarSuccess = payload => ({
    type: sidebarTypes.FETCH_SIDEBAR_SUCCESS,
    payload,
  });
  
  export const setSelectedSideBar = payload => ({
    type: sidebarTypes.SET_SELECTED_SIDE_BAR,
    payload,
  });
  