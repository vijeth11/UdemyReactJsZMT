import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.util";
import { CART_ACTIONS_TYPES, CategoryItem } from "./cart.types";

export type SetIsCartOpen = ActionWithPayload<CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean>;
export type AddCartItem = ActionWithPayload<CART_ACTIONS_TYPES.ADD_CART_ITEM, CategoryItem>;
export type RemoveCartItem = ActionWithPayload<CART_ACTIONS_TYPES.REMOVE_CART_ITEM, CategoryItem>;
export type ClearCartItem = ActionWithPayload<CART_ACTIONS_TYPES.CLEAR_CART_ITEM, CategoryItem>;

export const setIsCartOpen = withMatcher((isCartOpen:boolean):SetIsCartOpen => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, isCartOpen));
export const addCartItem = withMatcher((cartItem:CategoryItem):AddCartItem => createAction(CART_ACTIONS_TYPES.ADD_CART_ITEM, cartItem));
export const removeCartItem = withMatcher((cartItem:CategoryItem):RemoveCartItem => createAction(CART_ACTIONS_TYPES.REMOVE_CART_ITEM, cartItem));
export const clearCartItem = withMatcher((cartItem:CategoryItem):ClearCartItem => createAction(CART_ACTIONS_TYPES.CLEAR_CART_ITEM, cartItem));