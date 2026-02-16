

import reportType from "../../reducers/setting/setting.types";

export const loadReportPage = (payload = true) => ({
  type: reportType.LOAD_REPORT_PAGE,
  payload,
});
