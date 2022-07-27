
import costTrackerType from './costTracker.types';

const INITIAL_STATE = {
  fetchCostTrackerLoading: false,
  costTrackerData: false,
  
  fuelConsumptionData: false,
  fuelConsumptionDataLoading: false,

  addFuelConsumptiondata: false,
  addFuelConsumptionDataLoadin: false,
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
    case costTrackerType.FETCH_FUEL_CONSUMPTION_DATA_SUCCESS:
      return {
        ...state,
        fuelConsumptionData: action.payload,
      };
    case costTrackerType.FETCH_FUEL_CONSUMPTION_DATA_LOADING:
      return {
        ...state,
        fuelConsumptionDataLoading: action.payload,
      };
    case costTrackerType.ADD_FUEL_CONSUMPTION_DATA_LOADING:
      return {
        ...state,
        addFuelConsumptionLoadin: action.payload,
      };

    default: return state;

  }

};

export default reducer;