
import sidebarTypes from './sidebarTypes';

const INITIAL_STATE = {
    fetchSideBarLoading: false,
    sideBarData: {},
};

const reducer = (state = INITIAL_STATE, action) => {

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

         default: return state;

    }

};

export default reducer;