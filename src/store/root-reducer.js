import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer.js";
import { categoriesReducer } from './categories/categories.reducer';
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});