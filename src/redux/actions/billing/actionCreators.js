
import billingType from "../../reducers/billing/billing.types";

  
export const fetchBillingLoading = (payload = true) => ({
    type: billingType.FETCH_BILLING_LOADING,
    payload,
  });
  
  export const fetchBillingSuccess = payload => ({
    type: billingType.FETCH_BILLING_SUCCESS,
    payload,
  });
  