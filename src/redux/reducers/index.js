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


export default rootReducer;