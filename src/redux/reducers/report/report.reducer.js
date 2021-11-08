
import reportType from './reducer.types';

const INITIAL_STATE = {
  fetchReportLoading: false,
  reportData: false,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case reportType.FETCH_REPORT_LOADING:

      return {

        ...state,
        fetchReportLoading: action.payload,

      };

    case reportType.FETCH_REPORT_SUCCESS:
      return {
        ...state,
        reportData: action.payload,
      };

    default: return state;

  }

};

export default reducer;