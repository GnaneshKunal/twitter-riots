import axios from 'axios';

import {
    SEARCH_TRUE, SEARCH_FALSE,
    SEARCH_ERROR, LOCATION_TRENDS
} from './types';

interface ISearchError {
    type: string,
    payload: string
}

const ROOT_URL: string = 'http://localhost:8080';

export function locationTrends(search: {search: string }) {
    return function(dispatch: any) {
        let searchLocation = encodeURIComponent(search.search).replace(/%20/g,'+');
        return axios.get(`${ROOT_URL}/getTrends/${searchLocation}`)
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

export function trends(search: string) {
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

export function shout(error: string) {
    alert(error);
}

export function searchError(error: string): ISearchError {
    return {
        type: SEARCH_ERROR,
        payload: error
    }
}