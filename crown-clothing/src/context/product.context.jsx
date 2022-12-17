import { useState } from "react";
import { createContext } from "react";
import shop_data from '../shop-data.json';

export const ProductContext = createContext({
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25
});

export const ProductProvider =  ({children}) => {
    const [products, setProducts] = useState(shop_data);
    return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>
}