import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import OrderReducer from '../src/slices/OrderSlice'
import CartReducer from '../src/slices/CartSlice'


const reducer = combineReducers({
  // Your reducers go here/
  OrderState:OrderReducer,
  CartState:CartReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
