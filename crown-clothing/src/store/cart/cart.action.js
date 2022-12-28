import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTIONS_TYPES } from "./cart.types";

export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, isCartOpen);
export const addCartItem = (cartItem) => createAction(CART_ACTIONS_TYPES.ADD_CART_ITEM, cartItem);
export const removeCartItem = (cartItem) => createAction(CART_ACTIONS_TYPES.REMOVE_CART_ITEM, cartItem);
export const clearCartItem = (cartItem) => createAction(CART_ACTIONS_TYPES.CLEAR_CART_ITEM, cartItem);