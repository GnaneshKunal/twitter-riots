import * as redux from 'redux';
import searchReducer from './search';

const rootReducer: redux.Reducer<any> = redux.combineReducers({
  search: searchReducer
});

export default rootReducer;
