
import costTrackerType from './costTracker.types';

const INITIAL_STATE = {
  fetchCostTrackerLoading: false,
  costTrackerData: false,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case costTrackerType.FETCH_COSTTRACKER_LOADING:

      return {

        ...state,
        fetchCostTrackerLoading: action.payload,

      };

    case costTrackerType.FETCH_COSTTRACKER_SUCCESS:
      return {
        ...state,
        costTrackerData: action.payload,
      };

    default: return state;

  }

};

export default reducer;