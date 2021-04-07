import { bindActionCreators } from "redux";
import * as types from "../actions/actionTypes";
import initialState from './initialState';
//Whatever is returned from a reducer becomes the new state

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.CREATE_COURSE_SUCCESS:
            // state.push(action.course); //dont do this. state is immutable
            return [...state, { ...action.course }];
        case types.UPDATE_COURSE_SUCCESS:
            return state.map(course => course.id === action.course.id ? action.course : course);
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        case types.DELETE_COURSE_OPTIMISTIC:
            return state.filter(course => course.id !== action.course.id);
        default:
            return state;
    }
}