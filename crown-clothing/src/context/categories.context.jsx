import { useEffect, useState } from "react";
import { createContext } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider =  ({children}) => {
    
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