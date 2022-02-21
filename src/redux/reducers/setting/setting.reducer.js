import settingTypes from './setting.types';

const INITIAL_STATE = {
  reportPageLoaded: false,
  // not in use yet, may be used latter
  // currently using uiSettings in context
  uiSettings: {
    primaryColor: '#5c3592'
  }
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case settingTypes.LOAD_REPORT_PAGE:

      return {

        ...state,
        reportPageLoaded: action.payload,
      };

    default: return state;

  }

};

export default reducer;