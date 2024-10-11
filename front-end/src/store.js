import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './Reducers/user.Reducer';
import filterReducer from './Reducers/fiter.reducer';


const rootReducer = combineReducers({
    userReducer: userReducer,
    filterReducer : filterReducer,
   
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;