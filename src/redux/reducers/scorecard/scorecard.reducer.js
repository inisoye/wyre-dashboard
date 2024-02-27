
import scoreCardType from './scorecard.types';

const INITIAL_STATE = {
   fetchScoreCardLoading: false,
   scoreCardData: false,
};

const reducer = (state = INITIAL_STATE, action) => {

   switch (action.type) {

      case scoreCardType.FETCH_SCORECARD_LOADING:
         return {
            ...state,
            fetchScoreCardLoading: action.payload,
         };

      case scoreCardType.FETCH_SCORECARD_SUCCESS:
         return {
            ...state,
            scoreCardData: action.payload,
         };

      default: return state;

   }

};

export default reducer;