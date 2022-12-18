import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map(
            (cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity : cartItem.quantity+1} : cartItem 
        );
    }
    return [...cartItems, {...productToAdd,quantity:1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    if(existingCartItem && existingCartItem.quantity>1){
        return cartItems.map(
            (cartItem) => cartItem.id === productToRemove.id ? 
            {...cartItem, quantity : cartItem.quantity-1} : cartItem 
        );
    }else if(existingCartItem){
        return [...cartItems.filter((item) => item.id !== productToRemove.id)]
    }
    return [...cartItems];
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return [...cartItems.filter((item) => item.id !== cartItemToClear.id)]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen:() =>{},
    cartItems: [],
    addItemToCart : () => {},
    removeItemFromCart:() => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0 
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
     const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems,productToAdd));
    }
    const removeItemFromCart = (productToRemove) => {
        setCartItem(removeCartItem(cartItems, productToRemove));
    }
    const clearItemFormCart = (productToRemove) => {
        setCartItem(clearCartItem(cartItems,productToRemove));
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems,
        addItemToCart, 
        removeItemFromCart,
        clearItemFormCart,
        cartCount,
        cartTotal};
    return <CartContext.Provider value={value}>{children} </CartContext.Provider>;
}