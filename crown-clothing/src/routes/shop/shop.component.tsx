import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import './shop.style.scss';
class Shop extends Component{
    render(){
        return (
            <Routes>
                <Route index element = {<CategoriesPreview/>}/>
                <Route path=":category" element= {<Category/>}/>
            </Routes>
        );
    }
   
}

export default Shop;