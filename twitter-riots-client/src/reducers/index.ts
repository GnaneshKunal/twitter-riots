import * as redux from 'redux';
import searchReducer from './search';
import tweetReducer from './tweet';
import geoReducer from './geo';

const rootReducer: redux.Reducer<any> = redux.combineReducers({
  search: searchReducer,
  tweet: tweetReducer,
  geo: geoReducer
});

export default rootReducer;
