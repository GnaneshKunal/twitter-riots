import * as redux from 'redux';
import searchReducer from './search';
import tweetReducer from './tweet';

const rootReducer: redux.Reducer<any> = redux.combineReducers({
  search: searchReducer,
  tweet: tweetReducer
});

export default rootReducer;
