// import { getBillingRefinedData } from '../../../helpers/organizationDataHelpers';
import billingType from './billing.types';

const INITIAL_STATE = {
    fetchBillingLoading: false,
    billingData: false,
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case billingType.FETCH_BILLING_LOADING:

           return {

             ...state, 
             fetchBillingLoading: action.payload,

           };

           case billingType.FETCH_BILLING_SUCCESS:
           return {
              ...state, 
              billingData: action.payload,
           };

         default: return state;

    }

};

export default reducer;