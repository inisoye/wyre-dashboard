import { combineReducers } from 'redux';
import dashboard from './dashboard/dashboard.reducer';
import billingReducers from './billing/billing.reducer';
import costTracker from './costTracker/costTracker.reducer';
import sideBar from './sidebar/sidebar.reducer'
import report from './report/report.reducer';
import setting from './setting/setting.reducer';

const rootReducer = combineReducers({
    dashboard,
    billingReducers,
    sideBar,
    costTracker,
    report,
    setting
});

const generaReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      return rootReducer(undefined, action)
    }
  
    return rootReducer(state, action)
  }

export default rootReducer;