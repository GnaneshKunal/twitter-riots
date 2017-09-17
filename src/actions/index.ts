import axios from 'axios';

import {
    SEARCH_TRUE, SEARCH_FALSE,
    SEARCH_ERROR
} from './types';

interface ISearchError {
    type: String,
    payload: String
}

const ROOT_URL: String = 'http://localhost:8080';

export function trends(search: String) {
    console.log(search.search);
    return function(dispatch: any) {

        // if (search)
        //     return dispatch(searchError("Please enter a term"));
        
        return axios.get(`${ROOT_URL}/api/trends/place`)
            .then(response => {
                dispatch({
                    type: SEARCH_TRUE,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log(error.response);
            })
    }
}

export function shout(error: String) {
    alert(error);
}

export function searchError(error: String): ISearchError {
    return {
        type: SEARCH_ERROR,
        payload: error
    }
}