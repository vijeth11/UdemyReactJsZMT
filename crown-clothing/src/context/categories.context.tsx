import { FC, useEffect, useState } from "react";
import { createContext } from "react";
import { CategoryItem } from "../store/cart/cart.types";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import {gql, useQuery} from '@apollo/client';

export const CategoriesContext = createContext<{categoriesMap:{[title: string]: CategoryItem[]}, loading:boolean}>({
    categoriesMap:{},
    loading:false
});

const COLLECTIONS = gql`
query {
    collections {
        id
        title
        items {
            id
            name
            price
            imageUrl
        }
    }
}
`

export const CategoriesProvider:FC =  ({children}) => {   
    const [categoriesMap, setCategoriesMap] = useState({categoriesMap:{}});

    // getting data using GraphQL
    
    // const {loading, error, data} = useQuery(COLLECTIONS);
    // console.log(data);

    // useEffect(() => {
    //     if(data){
    //         const {collections} = data;
    //         const collectionMap:{[title: string]: CategoryItem[]} = collections.reduce((acc:{[key:string]:CategoryItem[]}, collection:{id:string, title:string, items:CategoryItem[]}) => {
    //             const {title, items}  = collection;
    //             acc[title.toLowerCase()] = items;
    //             return acc;
    //         },{});
    //         setCategoriesMap({categoriesMap:collectionMap});
    //     }
    // }, [data]);
    
    // code to get data from Firebase
    let loading = false;
    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap({categoriesMap});
        }
        getCategoriesMap();
    },[]);
    const value = {...categoriesMap, loading};
    return <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
}