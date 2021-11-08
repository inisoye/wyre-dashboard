

import reportType from "../../reducers/report/report.types";

export const fetchReportLoading = (payload = true) => ({
  type: reportType.FETCH_REPORT_LOADING,
  payload,
});

export const fetchReportSuccess = payload => ({
  type: reportType.FETCH_REPORT_SUCCESS,
  payload,
});
