import { combineReducers } from 'redux';
import dashboard from './dashboard/dashboard.reducer';
import sidebar from './sidebar/sidebar.reducer'

const rootReducer = combineReducers({
    dashboard,
    sidebar
});

export default rootReducer;