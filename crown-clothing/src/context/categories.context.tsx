import { FC, useEffect, useState } from "react";
import { createContext } from "react";
import { CategoryItem } from "../store/cart/cart.types";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext<{categoriesMap:{[title: string]: CategoryItem[]}}>({
    categoriesMap:{},
});

export const CategoriesProvider:FC =  ({children}) => {
    
    const [categoriesMap, setCategoriesMap] = useState({categoriesMap:{}});
    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap({categoriesMap});
        }
        getCategoriesMap();
    },[]);
    return <CategoriesContext.Provider value={categoriesMap}>{children}</CategoriesContext.Provider>
}