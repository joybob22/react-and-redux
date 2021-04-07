import * as types from "./actionTypes";
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

//using thunk middleware
//always return a function
//dispatch will be given as a paramter
export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(err => {
            dispatch(apiCallError(err));
            throw err;
        })
    }
}