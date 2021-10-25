import { getDashBoardRefinedData } from '../../../helpers/organizationDataHelpers';
import dashBoardType from './dashboard.types';

const INITIAL_STATE = {
    fetchDashBoardLoading: false,
    dashBoardData: {},
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case dashBoardType.FETCH_DASHBOARD_LOADING:

           return {

             ...state, 
             fetchDashBoardLoading: action.payload,

           };

           case dashBoardType.FETCH_DASHBOARD_SUCCESS:
           return {
              ...state, 
              dashBoardData: getDashBoardRefinedData(action.payload),
           };

         default: return state;

    }

};

export default reducer;