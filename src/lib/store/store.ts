import {combineReducers, configureStore} from "@reduxjs/toolkit";
import servicesListReducer from './slices/services-list.slice';
import userReducer from './slices/user.slice';

const reducer = combineReducers({
    servicesList: servicesListReducer,
    user: userReducer
})

const store = configureStore({
    reducer,
})

export default store;