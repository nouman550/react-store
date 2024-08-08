import { combineReducers } from 'redux';
import cartReducer from "./cartReducer"
import isLoggedReducer from "./isLoggedReducer";



const allReducers = combineReducers({
    cartReducer,
    isLoggedReducer
});

export default allReducers;