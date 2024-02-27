
// const dashBoardType 

import dashBoardType from "../../reducers/scorecard/scorecard.types";

export const fetchScoreCardLoading = (payload = true) => ({
    type: dashBoardType.FETCH_SCORECARD_LOADING,
    payload,
  });
  
  export const fetchScoreCardSuccess = payload => ({
    type: dashBoardType.FETCH_SCORECARD_SUCCESS,
    payload,
  });


  