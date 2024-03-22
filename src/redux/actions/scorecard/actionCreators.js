

import scoreCardType from "../../reducers/scorecard/scorecard.types";

export const fetchScoreCardLoading = (payload = true) => ({
    type: scoreCardType.FETCH_SCORECARD_LOADING,
    payload,
  });
  
  export const fetchScoreCardSuccess = payload => ({
    type: scoreCardType.FETCH_SCORECARD_SUCCESS,
    payload,
  });


  