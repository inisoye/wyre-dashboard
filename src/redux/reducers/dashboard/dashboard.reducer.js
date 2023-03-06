
import dashBoardType from './dashboard.types';

const INITIAL_STATE = {
   fetchDashBoardLoading: false,
   dashBoardData: false,
   fetchDemandLoading: false,
   demandData: false,
   billingDataLoading: false,
   billingData: false,
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
            dashBoardData: action.payload,
         };
      case dashBoardType.FETCH_DEMAND_SUCCESS:
         return {
            ...state,
            demandData: action.payload,
         };
      case dashBoardType.FETCH_DEMAND_LOADING:
         return {
            ...state,
            fetchDemandLoading: action.payload,
         };
      case dashBoardType.FETCH_BILLING_LOADING:
         return {
            ...state,
            billingDataLoading: action.payload,

         };

      case dashBoardType.FETCH_BILLING_SUCCESS:
         return {
            ...state,
            billingData: action.payload,
         };

      default: return state;

   }

};

export default reducer;