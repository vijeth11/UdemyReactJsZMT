import { CART_ACTIONS_TYPES } from "./cart.types";

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

const addCartItems = (cartItems, item) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === item.id ? 
        {...cartItem, quantity:cartItem.quantity+1}: cartItem);
    }
    return [...cartItems, {...item,quantity:1}];
}

const removeCartItem = (cartItems, item) => {
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

const clearCartItem = (cartItems, item) => [...cartItems.filter((cartItem)=> cartItem.id !== item.id)]

export const cartReducer = (state= INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
            return {...state,isCartOpen:payload};
        case CART_ACTIONS_TYPES.ADD_CART_ITEM:
            return {...state, cartItems: addCartItems(state.cartItems,payload)};
        case CART_ACTIONS_TYPES.REMOVE_CART_ITEM:
            return {...state, cartItems: removeCartItem(state.cartItems,payload)};
        case CART_ACTIONS_TYPES.CLEAR_CART_ITEM:
            return {...state, cartItems : clearCartItem(state.cartItems, payload)};
        default:
            return state;
    }
}