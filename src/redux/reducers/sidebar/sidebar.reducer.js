
import sidebarTypes from './sidebar.types';

const INITIAL_STATE = {
    fetchSideBarLoading: false,
    sideBarData: {},
    selectedSideBar: null,
};

const sideBarReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case sidebarTypes.FETCH_SIDEBAR_LOADING:

           return {

             ...state, 
             fetchSideBarLoading: action.payload,

           };

           case sidebarTypes.FETCH_SIDEBAR_SUCCESS:
           return {
              ...state, 
              sideBarData: action.payload,
           };
           case sidebarTypes.SET_SELECTED_SIDE_BAR:
           return {
              ...state, 
              selectedSideBar: action.payload,
           };

         default: return state;

    }

};

export default sideBarReducer;