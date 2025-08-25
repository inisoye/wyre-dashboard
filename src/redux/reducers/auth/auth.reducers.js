import authTypes from "./auth.types";

const INITIAL_STATE = {
    fetchBillingLoading: false,
    billingData: {},
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case authTypes.LOGOUT_USER:

            return {

                ...state,
                fetchBillingLoading: action.payload,

            };

        default: return state;

    }

};

export default reducer;