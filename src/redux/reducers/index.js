import { combineReducers } from 'redux';
import dashboard from './dashboard/dashboard.reducer';
import billingReducers from './billing/billing.reducer';
import costTracker from './costTracker/costTracker.reducer';
import sideBar from './sidebar/sidebar.reducer'
import report from './report/report.reducer';
import setting from './setting/setting.reducer';

const appReducer = combineReducers({
    dashboard,
    billingReducers,
    sideBar,
    costTracker,
    report,
    setting
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

export default rootReducer;