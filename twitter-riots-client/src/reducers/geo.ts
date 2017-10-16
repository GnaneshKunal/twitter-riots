import { CACHE_GEO } from '../actions/types';

interface IActionProps {
    type: string,
    payload: any
}

export default function(state = {}, action: IActionProps) {
    switch(action.type) {
        case CACHE_GEO:
            return { ...state, geo: action.payload };
    }
    
    return state;
}