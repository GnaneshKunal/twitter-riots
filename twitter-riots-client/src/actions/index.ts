import axios from 'axios';

import {
    SEARCH_TRUE, SEARCH_FALSE,
    SEARCH_ERROR, LOCATION_TRENDS,
    TRENDING_TWEETS, CACHE_GEO
} from './types';

interface ISearchError {
    type: string,
    payload: string
}

const ROOT_URL: string = 'http://localhost:8080';

export type geo = { lat: Number, long: Number, woeid: Number }

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
                console.log(err)
            })
    }
}

export function getTrendingTweets(hash: string) {
    return function (dispatch: any) {
        return axios.get(`${ROOT_URL}/getTweets/${hash}`)
            .then(response => {
                dispatch({
                    type: TRENDING_TWEETS,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function cacheGeo(geo: geo) {
    return function (dispatch: any) {
        return dispatch({
            type: CACHE_GEO,
            payload: geo
        });
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