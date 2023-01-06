import { AnyAction } from "redux";
import * as CARTACTIONS from "./cart.action" ;
import { CategoryItem, CartItem } from "./cart.types";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const INITIAL_STATE:CartState = {
    isCartOpen: false,
    cartItems: [],
};

const addCartItems = (cartItems: CartItem[], item: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem:CartItem) => cartItem.id === item.id);
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === item.id ? 
        {...cartItem, quantity:cartItem.quantity+1}: cartItem);
    }
    return [...cartItems, {...item,quantity:1}];
}

const removeCartItem = (cartItems:CartItem[], item: CategoryItem):CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if(existingCartItem){
        if(existingCartItem.quantity > 1){
            return cartItems.map((cartItem) => cartItem.id === item.id ? 
            {...cartItem, quantity:cartItem.quantity-1} : cartItem);
        }else{
            return [...cartItems.filter((cartItem) => cartItem.id !== item.id)];
        }
    }else
    {
        return [...cartItems];
    }
}

const clearCartItem = (cartItems: CartItem[], item:CategoryItem):CartItem[] => [...cartItems.filter((cartItem)=> cartItem.id !== item.id)]

export const cartReducer = (state= INITIAL_STATE, action:AnyAction):CartState => {
    if(CARTACTIONS.setIsCartOpen.match(action)){
        return {...state,isCartOpen:action.payload};
    }
    if(CARTACTIONS.addCartItem.match(action)){
        return {...state, cartItems: addCartItems(state.cartItems,action.payload)};
    }
    if(CARTACTIONS.removeCartItem.match(action)){
        return {...state, cartItems : removeCartItem(state.cartItems, action.payload)};
    }
    if(CARTACTIONS.clearCartItem.match(action)){
        return {...state, cartItems : clearCartItem(state.cartItems, action.payload)};
    }
    return state;
}