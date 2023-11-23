
import breakersType from './breakers.type';

const INITIAL_STATE = {
   fetchBreakerLoading: false,
   breakersData: false,
};

const reducer = (state = INITIAL_STATE, action) => {

   switch (action.type) {

      case breakersType.FETCH_BREAKER_LOADING:
         return {
            ...state,
            fetchBreakerLoading: action.payload,

         };

      case breakersType.FETCH_BREAKER_SUCCESS:
         return {
            ...state,
            breakersData: action.payload,
         };
      case breakersType.TOGGLE_BREAKER_LOADING:
         return {
            ...state,
            toggleBreakerLoading: action.payload,

         };

      case breakersType.TOGGLE_BREAKER_SUCCESS:
         return {
            ...state,
            toggleBreakerSuccess: action.payload,
         };

      default: return state;

   }

};

export default reducer;