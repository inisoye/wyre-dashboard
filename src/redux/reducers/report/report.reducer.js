import moment from 'moment';
import reportType from './reducer.types';

const INITIAL_STATE = {
  fetchReportLoading: false,
  fetchReportBaselineLoading: false,
  reportData: false,
  reportBaselineData: false,
  selectedDateType: 'monthly',
  selectedDate: moment().format('DD-MM-YYYY'),
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
    case reportType.FETCH_REPORT_BASELINE_LOADING:

      return {

        ...state,
        fetchReportBaselineLoading: action.payload,

      };

    case reportType.FETCH_REPORT_BASELINE_SUCCESS:
      return {
        ...state,
        reportBaselineData: action.payload,
      };
    case reportType.CHANGE_DATE_TYPE:
      return {
        ...state,
        selectedDateType: action.payload,
      };
    case reportType.CHANGE_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };

    default: return state;

  }

};

export default reducer;