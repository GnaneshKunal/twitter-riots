import axios from 'axios';

import {
    SEARCH_TRUE, SEARCH_FALSE,
    SEARCH_ERROR, LOCATION_TRENDS
} from './types';

interface ISearchError {
    type: String,
    payload: String
}

const ROOT_URL: String = 'http://localhost:8080';

export function locationTrends(search: {search: String }) {
    return function(dispatch: any) {
        return axios.get(`${ROOT_URL}/getTrends/${search.search}`)
            .then(response => {
                dispatch({
                    type: LOCATION_TRENDS,
                    payload: response.data
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export function trends(search: String) {
    return function(dispatch: any) {

        // if (search)
        //     return dispatch(searchError("Please enter a term"));
        
        return axios.get(`${ROOT_URL}/api/trends/place?place=${search.search}`)
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