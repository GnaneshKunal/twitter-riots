import { TRENDING_TWEETS } from '../actions/types';

interface IActionProps {
    type: string,
    payload: any
}

export default function(state = {}, action: IActionProps) {
    switch(action.type) {
        case TRENDING_TWEETS:
            return { ...state, search: true, tweetData: action.payload };
    }
    
    return state;
}