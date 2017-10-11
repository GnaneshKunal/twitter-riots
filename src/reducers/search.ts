import { SEARCH_TRUE, SEARCH_FALSE, SEARCH_ERROR, LOCATION_TRENDS } from '../actions/types';

interface IActionProps {
    type: string,
    payload: any
}

export default function(state = {}, action: IActionProps) {
    switch(action.type) {
        case SEARCH_TRUE:
            return { ...state, search: true, data: action.payload };
        case SEARCH_FALSE:
            return { ...state, search: false, data: 'Please Search something' };
        case SEARCH_ERROR:
            return { ...state, search: false, data: action.payload };
        case LOCATION_TRENDS:
            return { ...state, search: false, searchData: action.payload };
    }
    
    return state;
}