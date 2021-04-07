import * as types from "../actions/actionTypes";
import initialState from './initialState';
//Whatever is returned from a reducer becomes the new state

export default function authorReducer(state = initialState.authors, action) {
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;
    }
}