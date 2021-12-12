import React from "react";
import './search-box.component.css';

export const SearchInput = (props) => {
    return (
        <input 
        className = 'search' 
        type='search'
         placeholder={props.placeholder} 
         onChange={props.handleChange}/>
    );
}