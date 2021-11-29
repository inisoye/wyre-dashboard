

import reportType from "../../reducers/report/reducer.types";

export const fetchReportLoading = (payload = true) => ({
  type: reportType.FETCH_REPORT_LOADING,
  payload,
});

export const fetchReportSuccess = payload => ({
  type: reportType.FETCH_REPORT_SUCCESS,
  payload,
});
export const changeSearchDateType = payload => ({
  type: reportType.CHANGE_DATE_TYPE,
  payload,
});

export const changeSearchDate = payload => ({
  type: reportType.CHANGE_DATE,
  payload,
});
