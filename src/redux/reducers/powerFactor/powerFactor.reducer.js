
import powerFactor from './powerFactor.type';

const INITIAL_STATE = {
    powerFactorLoading: false,
    allPowerFactor: [],
};

const powerFactorData = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case powerFactor.FETCH_POWER_FACTOR_LOADING:

           return {

             ...state, 
             fetchSideBarLoading: action.payload,

           };

           case powerFactor.FETCH_POWER_FACTOR_SUCCESS:
           return {
              ...state, 
              allPowerFactor: action.payload,
           };

         default: return state;

    }

};

export default powerFactorData;