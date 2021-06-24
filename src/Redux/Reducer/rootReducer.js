import { combineReducers } from 'redux';
import jobReducer from './job.reducer';
const rootReducer = combineReducers({
    jobs: jobReducer
});

export default rootReducer;