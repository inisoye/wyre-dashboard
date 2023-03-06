import { combineReducers } from 'redux';
import dashboard from './dashboard/dashboard.reducer';
import billing from './billing/billing.reducer';
import costTracker from './costTracker/costTracker.reducer';
import sideBar from './sidebar/sidebar.reducer'
import report from './report/report.reducer';
import setting from './setting/setting.reducer';
import powerFactor from './powerFactor/powerFactor.reducer';

const appReducer = combineReducers({
    dashboard,
    billing,
    sideBar,
    costTracker,
    report,
    setting,
    powerFactor,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

export default rootReducer;