import { combineReducers } from 'redux';
import courses from './courseReducers';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    courses: courses,
    authors: authors,
    apiCallsInProgress: apiCallsInProgress
});

export default rootReducer;