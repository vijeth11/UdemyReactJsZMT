import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";

// combineReducers is used to combine multiple child reducers
// which recives an action whenerver dispatched and it can choose to update
// its state based on the action or just return the state as it is

export const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})